"use server";

import sharp from "sharp";

import { sortPlayersByName } from "@/utils/sortingFunctions";
import { Player, PlayerProfile, UUID } from "@/models";
import { getPlayer, getPlayers } from "./playerData";

export const getPlayerSkin = async (url: string) => {
  try {
    const skinResponse = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const skinBuffer = await skinResponse.arrayBuffer();

    return skinBuffer;
  } catch (e) {
    console.error("getPlayerSkin ", e);
    return null;
  }
};

export const getPlayerHead = async (url: string) => {
  try {
    const skinBuffer = await getPlayerSkin(url);

    if (!skinBuffer) {
      return null;
    }

    const headBuffer = sharp(skinBuffer)
      .extract({ left: 8, top: 8, width: 8, height: 8 })
      .png()
      .resize({ width: 72, kernel: sharp.kernel.nearest })
      .toBuffer();

    const hatBuffer = sharp(skinBuffer)
      .extract({ left: 40, top: 8, width: 8, height: 8 })
      .png()
      .resize({ width: 80, kernel: sharp.kernel.nearest })
      .toBuffer();

    const playerHeadWithHat = await sharp({
      create: {
        width: 80,
        height: 80,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .png()
      .composite([
        { input: await headBuffer, blend: "over", gravity: "center" },
        { input: await hatBuffer, blend: "over", gravity: "center" },
      ])
      .toBuffer();

    return playerHeadWithHat;
  } catch (e) {
    console.error("getPlayerHead ", e);
    return null;
  }
};

export const getPlayerProfile = async (uuid: UUID) => {
  try {
    const playerData = await getPlayer(uuid);

    if (!playerData) {
      return null;
    }

    const res = await fetch(
      `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (res.status !== 200) return null;

    const responseJson = await res.json();

    const data = JSON.parse(atob(responseJson.properties[0].value ?? ""));

    const skinUrl = data?.textures?.SKIN?.url;
    const capeUrl = data?.textures?.CAPE?.url;

    const playerProfile: PlayerProfile = {
      ...playerData,
      skin: skinUrl,
      cape: capeUrl,
    };

    return playerProfile;
  } catch (e) {
    console.error("getPlayerProfile ", e, uuid);
    return null;
  }
};

export const getPlayerProfiles = async (
  limit: number | null = null,
  sortFunction: (a: Player, b: Player) => number = sortPlayersByName
) => {
  try {
    const players = await getPlayers();

    if (!players) {
      return null;
    }

    const playerProfiles = await Promise.all(
      players
        .sort(sortFunction)
        .slice(0, limit ?? players.length)
        .map(async (player) => {
          return await getPlayerProfile(player.uuid);
        })
    );

    return playerProfiles.filter(
      (profile): profile is PlayerProfile => profile !== null
    );
  } catch (e) {
    console.error("getPlayeProfiles ", e);
    return null;
  }
};
