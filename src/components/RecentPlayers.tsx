"use client";

import { Suspense, useEffect, useState } from "react";
import { PlayerProfile } from "@/models";

import { getOnlinePlayerProfiles } from "@/services/online";
import { getPlayerProfiles } from "@/services/playerProfile";

import PlayerCard from "./PlayerCard";

const RecentPlayers = ({
  initialOnlinePlayers,
  initialRecentPlayers,
}: {
  initialOnlinePlayers: PlayerProfile[];
  initialRecentPlayers: PlayerProfile[];
}) => {
  const [onlinePlayers, setOnlinePlayers] =
    useState<PlayerProfile[]>(initialOnlinePlayers);

  const [recentPlayers, setRecentPlayers] =
    useState<PlayerProfile[]>(initialRecentPlayers);

  useEffect(() => {
    const fetchPlayers = async () => {
      const onlinePlayers = await getOnlinePlayerProfiles();

      setOnlinePlayers(onlinePlayers);

      const players = await getPlayerProfiles();
      if (players === null) return;

      setRecentPlayers(
        players
          .sort(
            (a, b) =>
              new Date(b.lastPlayDate).getTime() -
              new Date(a.lastPlayDate).getTime()
          )
          .filter(
            (player) => !onlinePlayers.some((p) => p.uuid === player.uuid)
          )
          .slice(0, players.length - onlinePlayers.length > 16 ? 12 : 16)
      );
    };

    const interval = setInterval(fetchPlayers, 1000 * 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-30 w-20 bg-gray-400/20 rounded-sm" />
        ))}
      >
        {onlinePlayers.length > 0 && (
          <h2 className="text-2xl font-bold">
            Paikalla nyt - {onlinePlayers.length}
          </h2>
        )}
        <div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6 @3xl:grid-cols-8 gap-4 w-full">
          {onlinePlayers.map((player, index) => {
            return <PlayerCard key={index} player={player} online />;
          })}
        </div>
      </Suspense>
      <h2 className="text-2xl font-bold">Viimeksi pelanneet</h2>{" "}
      <Suspense
        fallback={Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-30 w-20 bg-gray-400/20 rounded-sm" />
        ))}
      >
        <div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6 @3xl:grid-cols-8 gap-4 w-full">
          {recentPlayers.map((player, index) => {
            return <PlayerCard key={index} player={player} full />;
          })}
        </div>
      </Suspense>
    </>
  );
};

export default RecentPlayers;
