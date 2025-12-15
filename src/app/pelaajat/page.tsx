import ProfileLink from "@/components/ProfileLink";
import { getOnlinePlayers } from "@/services/online";
import { getPlayerProfiles } from "@/services/playerProfile";

import { Suspense } from "react";

export const metadata = {
  title: "LaniMC - pelaajat",
  description: "LaniMC pelaajat",
};

export default async function Home() {
  const playerData = await getPlayerProfiles();
  const onlinePlayers = await getOnlinePlayers();

  if (playerData === null || onlinePlayers === null) return null;

  return (
    <>
      <h1 className="text-4xl font-bold ">Pelaajat</h1>
      <Suspense fallback={<p className="w-full">Ladataan...</p>}>
        <div className="grid grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6 @3xl:grid-cols-8 @5xl:grid-cols-10 @6xl:grid-cols-12 gap-4">
          {playerData.map((player, index) => {
            const isOnline =
              onlinePlayers.find((onliner) => onliner.uuid === player.uuid) !==
              undefined;
            return (
              <ProfileLink
                key={index}
                player={player}
                flex={true}
                className={`flex flex-col items-center`}
                online={isOnline}
              >
                <p className="w-full text-sm text-center wrap-break-word">
                  {player.name}
                </p>
              </ProfileLink>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}
