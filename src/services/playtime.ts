"use server";

import { PlayerData, PlaytimeLog, UUID } from "@/models";

export const getPlayerPlaytimeLog = async (uuid: UUID) => {
  try {
    const playtimeResponse = await fetch(
      `${process.env.API_URL}/playtime/${uuid}`,
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!playtimeResponse.ok) {
      return null;
    }

    const playtime = await playtimeResponse.json();

    return playtime as PlaytimeLog[];
  } catch (e) {
    console.error("getPlayerPlaytimeLog ", e);
    return null;
  }
};

export const getPlaytimeLog = async () => {
  try {
    const playtimeResponse = await fetch(`${process.env.API_URL}/playtime`, {
      headers: {
        Authorization: process.env.API_KEY ?? "",
      },
    });

    if (!playtimeResponse.ok) {
      return null;
    }

    const playtime = await playtimeResponse.json();

    return playtime as PlaytimeLog[];
  } catch (e) {
    console.error("getPlaytimeLog ", e);
    return null;
  }
};

export const getPlayerPlaytime = async (uuid: UUID) => {
  try {
    const playtimeLog = await getPlayerPlaytimeLog(uuid);

    if (playtimeLog === null) {
      return null;
    }

    return playtimeLog.reduce(
      (acc, log) =>
        acc +
        (new Date(log.endTime).getTime() - new Date(log.startTime).getTime()),
      0
    );
  } catch (e) {
    console.error("getPlayerPlaytime ", e);
    return null;
  }
};

export const getPlaytime = async () => {
  try {
    const playtimeLog = await getPlaytimeLog();

    if (playtimeLog === null) {
      return null;
    }

    return playtimeLog.reduce((acc: PlayerData[], log) => {
      const playerData = acc.find((data) => data.uuid === log.uuid) ?? null;
      if (playerData) {
        playerData.value +=
          new Date(log.endTime).getTime() - new Date(log.startTime).getTime();
        return acc.map((data) =>
          data.uuid === (log.uuid as UUID) ? playerData : data
        );
      } else {
        return [
          ...acc,
          {
            uuid: log.uuid as UUID,
            value:
              new Date(log.endTime).getTime() -
              new Date(log.startTime).getTime(),
            key: "playtime",
          },
        ];
      }
    }, []);
  } catch (e) {
    console.error("getPlaytime ", e);
    return null;
  }
};
