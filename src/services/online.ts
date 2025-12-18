"use server";

import { Player } from "@/models";
import { getPlayerProfile } from "./playerProfile";
import { sortPlayersByName } from "@/utils/sortingFunctions";

export const getOnlinePlayers = async () => {
  try {
    const playersResponse = await fetch(
      `${process.env.API_URL}/players/online`,
      {
        headers: {
          Authorization: process.env.API_KEY ?? "",
        },
      }
    );

    if (!playersResponse.ok) {
      return [];
    }

    const players: Player[] = await playersResponse.json();

    return players;
  } catch (e) {
    console.error("getOnlinePlayers ", e);
    return [];
  }
};

export const getOnlinePlayerProfiles = async (
  limit: number | null = null,
  sortFunction: (a: Player, b: Player) => number = sortPlayersByName
) => {
  try {
    const players = await getOnlinePlayers();

    const playerProfiles = await Promise.all(
      players
        .sort(sortFunction)
        .slice(0, limit ?? players.length)
        .map(async (player: Player) => {
          return await getPlayerProfile(player.uuid);
        })
    );

    return playerProfiles.filter((profile) => profile !== null);
  } catch (e) {
    console.log("getOnlinePlayerProfiles ", e);
    return [];
  }
};
