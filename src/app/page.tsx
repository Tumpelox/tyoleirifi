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
        new Date(b.lastPlayDate).getTime() - new Date(a.lastPlayDate).getTime(),
    )) ?? [];

  return (
    <>
      <h1 className="text-4xl font-bold">LaniMC</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-2 @min-xs:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @2xl:grid-cols-6 @4xl:grid-cols-8 gap-4 w-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="h-44 w-auto bg-gray-400/20 rounded-sm"
              />
            ))}
          </div>
        }
      >
        <RecentPlayers
          initialOnlinePlayers={onlinePlayers}
          initialRecentPlayers={recentPlayers ?? []}
        />
      </Suspense>
    </>
  );
}
