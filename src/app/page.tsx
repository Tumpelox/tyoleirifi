import RecentPlayers from "@/components/RecentPlayers";
import { getOnlinePlayerProfiles } from "@/services/online";
import { getPlayerProfiles } from "@/services/playerProfile";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LaniMC",
  description: "Pelataanpa sitä minee",
};

export default async function Home() {
  const onlinePlayers = await getOnlinePlayerProfiles();

  const recentPlayers = (
    (await getPlayerProfiles(
      null,
      (a, b) =>
        new Date(b.lastPlayDate).getTime() - new Date(a.lastPlayDate).getTime()
    )) ?? []
  )
    .filter((player) => !onlinePlayers.some((p) => p.uuid === player.uuid))
    .slice(0, 12);

  return (
    <>
      <h1 className="text-4xl font-bold">LaniMC</h1>
      <RecentPlayers
        initialOnlinePlayers={onlinePlayers}
        initialRecentPlayers={recentPlayers ?? []}
      />
    </>
  );
}
