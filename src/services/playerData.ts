"use server";

import { Player, PlayerData, UUID } from "@/models";

export const getPlayer = async (uuid: UUID) => {
  try {
    const playerData = await fetch(`${process.env.API_URL}/players/${uuid}`, {
      headers: {
        Authorization: process.env.API_KEY ?? "",
      },
    });

    if (!playerData.ok) {
      return null;
    }

    const player: Player = await playerData.json();

    return player;
  } catch (e) {
    console.error("getPlayer ", e);
    return null;
  }
};

export const getPlayers = async () => {
  try {
    const playersData = await fetch(`${process.env.API_URL}/players`, {
      headers: {
        Authorization: process.env.API_KEY ?? "",
      },
    });

    if (!playersData.ok) {
      return null;
    }

    const player: Player[] = await playersData.json();

    return player;
  } catch (e) {
    console.error("getPlayers ", e);
    return null;
  }
};

export const getPlayerStatistics = async (uuid: UUID) => {
  try {
    const statsResponse = await fetch(
      `${process.env.API_URL}/statistics/${uuid}`,
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!statsResponse.ok) {
      return null;
    }

    const stats = await statsResponse.json();

    return stats as Record<string, number>;
  } catch (e) {
    console.error("getPlayerStatistics ", e);
    return null;
  }
};

export const getStatistic = async (stat: string) => {
  try {
    const statsResponse = await fetch(
      `${process.env.API_URL}/statistic/${encodeURIComponent(stat)}`,
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!statsResponse.ok) {
      return null;
    }

    const stats = await statsResponse.json();

    return stats as PlayerData[];
  } catch (e) {
    console.error("getStatistic ", e);
    return null;
  }
};

export const getPlayerAdvancements = async (uuid: UUID) => {
  try {
    const advancementsResponse = await fetch(
      `${process.env.API_URL}/advancements/${uuid}`,
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!advancementsResponse.ok) {
      return null;
    }

    const advancements = await advancementsResponse.json();

    return advancements as Record<string, string>;
  } catch (e) {
    console.error("getPlayerAdvancements ", e);
    return null;
  }
};

export const getAdvancement = async (advancement: string) => {
  try {
    const statsResponse = await fetch(
      new URL(
        `${process.env.API_URL}/advancement/${encodeURIComponent(advancement)}`
      ),
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!statsResponse.ok) {
      return null;
    }

    const stats = await statsResponse.json();

    return stats as PlayerData[];
  } catch (e) {
    console.error("getAdvancement ", e);
    return null;
  }
};
