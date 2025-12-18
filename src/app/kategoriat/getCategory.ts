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
  reverse = false
) => (reverse ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortByGoals = (
  a: CombinedPlayerData,
  b: CombinedPlayerData,
  reverse = false
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
      return null;
  }
};

const calculate = (
  formula: string,
  values: PlayerData[],
  totalValues: Record<string, number>
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

export const getCategory = async (slug: string) => {
  "use cache";

  cacheLife("default");

  const time1 = Date.now();

  const category = categories.find((category) => category.slug === slug);

  if (category === undefined) {
    return null;
  }

  const data = (
    await Promise.all(category.data.map(async (data) => await getData(data)))
  )
    .flat()
    .filter((data) => data !== null);
  const time2 = Date.now();
  const totalValues = data.reduce((acc: Record<string, number>, cur) => {
    return { ...acc, [cur.key]: (acc[cur.key] ?? 0) + cur.value };
  }, {});

  const time3 = Date.now();
  const players = data
    .reduce((acc: { uuid: UUID; data: PlayerData[] }[], cur) => {
      const playerData = acc.find((player) => player.uuid === cur.uuid);

      if (playerData === undefined) {
        return acc.concat({ uuid: cur.uuid, data: [cur] });
      } else {
        return acc.map((player) =>
          player.uuid === cur.uuid
            ? { ...player, data: [...player.data, cur] }
            : player
        );
      }
    }, [])
    .filter((player) => {
      if (category.calculate !== undefined) {
        const dataTypes = player.data.map((data) => data.key);

        return category.calculate.keys.every((key) => dataTypes.includes(key));
      } else {
        return player.data.length > 0;
      }
    })
    .map((player) => {
      if (category.calculate !== undefined) {
        const value = calculate(
          category.calculate.playerValue,
          player.data,
          totalValues
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

  const time4 = Date.now();
  const playerProfiles: CombinedPlayerData[] = (
    await Promise.all(
      players.map(async (player) => {
        const playerProfile = await getPlayerProfile(player.uuid);
        if (playerProfile !== null) {
          return { ...player, ...playerProfile };
        } else return null;
      })
    )
  ).filter((player) => player !== null);

  const time5 = Date.now();
  const sortedPlayers = playerProfiles.sort((a, b) => {
    switch (category.sortFunction) {
      case "sortByName":
        return sortByName(a, b, category.sortReverse);
      case "sortByGoals":
        return sortByGoals(a, b, category.sortReverse);
      default:
        return 0;
    }
  });

  const time6 = Date.now();

  const total = () => {
    if (category.calculate !== undefined) {
      return calculate(category.calculate.totalValue, [], totalValues);
    } else {
      return Object.values(totalValues)[0];
    }
  };

  const time7 = Date.now();
  console.log("Total:", time7 - time1);
  console.log("Fetch:", time2 - time1);
  console.log("Calculate:", time4 - time3 + time6 - time5 + time7 - time6);
  console.log("Sort:", time6 - time5);
  console.log("Profiles:", time5 - time4);

  return {
    title: category.title,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    values: sortedPlayers,
    total: total(),
    display: category.display,
  };
};
