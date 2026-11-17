"use server";

import { PlayerData, PlayerProfile, UUID } from "@/models";
import { getAdvancement, getStatistic } from "@/services/playerData";
import { evaluate } from "mathjs";
import categories from "./categories";
import { getPlayerProfile } from "@/services/playerProfile";
import { getPlaytime } from "@/services/playtime";
import { cacheLife } from "next/cache";

export interface Kategoria {
  slug: string;
  title: string;
  description: string;
  data: Data[];
  icon: Icon;
  calculate?: Calculate;
  display: DisplaySettings;
  sortFunction: "sortByGoals" | "sortByName";
  sortReverse: boolean;
}

export interface CombinedPlayerData extends PlayerData, PlayerProfile {}

export interface Calculate {
  keys: string[];
  playerValue: string;
  totalValue: string;
  displayPlayerValue?: DisplayValue;
  displayTotalValue?: DisplayValue;
}

export interface Data {
  type: "advancement" | "statistic" | "playtime";
  key: string;
}

export interface DisplaySettings {
  type: "time" | "number" | "date" | "boolean";
  playerValue: DisplayValue | null;
  totalValue: DisplayValue | null;
}

export interface DisplayValue {
  singular: string;
  plural: string;
}

export interface Icon {
  src: string;
  alt: string;
  height: number;
  width: number;
}

const sortByName = (
  a: CombinedPlayerData,
  b: CombinedPlayerData,
  reverse = false,
) => (reverse ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortByGoals = (
  a: CombinedPlayerData,
  b: CombinedPlayerData,
  reverse = false,
) => (reverse ? a.value - b.value : b.value - a.value);

const getData = async (data: Data) => {
  switch (data.type) {
    case "advancement":
      return await getAdvancement(data.key);
    case "statistic":
      return await getStatistic(data.key);
    case "playtime":
      return await getPlaytime();
    default:
      return [];
  }
};

const calculate = (
  formula: string,
  values: PlayerData[],
  totalValues: Record<string, number>,
) => {
  const replacedFormula = formula.replace(/\${(.*?)}/g, (_match, key) => {
    if (key.startsWith("total:")) {
      return String(totalValues[key.replace("total:", "")] ?? "1");
    } else {
      return String(values.find((value) => value.key === key)?.value ?? "1");
    }
  });

  const results = evaluate(replacedFormula) as number;

  return Math.round(results * 100) / 100;
};

export const getCategoryMetadata = async (slug: string) => {
  "use cache";

  cacheLife("default");

  const category = categories.find((category) => category.slug === slug);

  if (category === undefined) {
    return null;
  }

  return {
    title: category.title,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    display: category.display,
  };
};

export const getCategoryData = async (slug: string) => {
  "use cache";

  cacheLife("default");

  const category = categories.find((category) => category.slug === slug);

  if (category === undefined) {
    return null;
  }

  const data = new Promise<PlayerData[]>(async (resolve) =>
    resolve(
      (
        await Promise.all(
          category.data.map(async (data) => await getData(data)),
        )
      ).flat(),
    ),
  );

  const totalValues = new Promise<Record<string, number>>(async (resolve) => {
    resolve(
      (await data).reduce((acc: Record<string, number>, cur) => {
        return { ...acc, [cur.key]: (acc[cur.key] ?? 0) + cur.value };
      }, {}),
    );
  });

  const players = new Promise<
    {
      uuid: UUID;
      value: number;
      key: string;
    }[]
  >(async (resolve) => {
    const total = await totalValues;
    const totalData = (await data)
      .reduce((acc: { uuid: UUID; data: PlayerData[] }[], cur) => {
        const playerData = acc.find((player) => player.uuid === cur.uuid);

        if (playerData === undefined) {
          return acc.concat({ uuid: cur.uuid, data: [cur] });
        } else {
          return acc.map((player) =>
            player.uuid === cur.uuid
              ? { ...player, data: [...player.data, cur] }
              : player,
          );
        }
      }, [])
      .filter((player) => {
        if (category.calculate !== undefined) {
          const dataTypes = player.data.map((data) => data.key);

          return category.calculate.keys.every((key) =>
            dataTypes.includes(key),
          );
        } else {
          return player.data.length > 0;
        }
      })
      .map((player) => {
        if (category.calculate !== undefined) {
          const value = calculate(
            category.calculate.playerValue,
            player.data,
            total,
          );

          return { uuid: player.uuid, value, key: category.slug };
        } else {
          return {
            uuid: player.uuid,
            value: player.data[0].value,
            key: category.slug,
          };
        }
      });
    resolve(totalData);
  });

  const sortedPlayers = new Promise<CombinedPlayerData[]>(async (resolve) => {
    const playerList = (await players).map(async (player) => {
      const playerProfile = await getPlayerProfile(player.uuid);
      if (playerProfile !== null) {
        return { ...player, ...playerProfile };
      } else return null;
    });
    const playerProfiles = (await Promise.all(playerList)).filter(
      (player) => player !== null,
    );

    resolve(
      playerProfiles.sort((a, b) => {
        switch (category.sortFunction) {
          case "sortByName":
            return sortByName(a, b, category.sortReverse);
          case "sortByGoals":
            return sortByGoals(a, b, category.sortReverse);
          default:
            return 0;
        }
      }),
    );
  });

  const total = new Promise<number>(async (resolve) => {
    if (category.calculate !== undefined) {
      resolve(calculate(category.calculate.totalValue, [], await totalValues));
    } else {
      resolve(Object.values(totalValues)[0]);
    }
  });

  return {
    values: sortedPlayers,
    total: total,
  };
};
