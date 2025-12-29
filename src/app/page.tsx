"use cache";

import RecentPlayers from "@/components/RecentPlayers";
import { getOnlinePlayerProfiles } from "@/services/online";
import { getPlayerProfiles } from "@/services/playerProfile";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import defaultMetadata from "@/app/metadata";

export const metadata: Metadata = defaultMetadata;

export default async function Home() {
  cacheLife({
    stale: 120,
    revalidate: 60,
    expire: 3600,
  });

  const onlinePlayers = await getOnlinePlayerProfiles();

  const recentPlayers =
    (await getPlayerProfiles(
      null,
      (a, b) =>
        new Date(b.lastPlayDate).getTime() - new Date(a.lastPlayDate).getTime()
    )) ?? [];

  return (
    <>
      <h1 className="text-4xl font-bold">LaniMC</h1>
      <Suspense>
        <RecentPlayers
          initialOnlinePlayers={onlinePlayers}
          initialRecentPlayers={recentPlayers ?? []}
        />
      </Suspense>
    </>
  );
}
