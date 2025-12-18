import * as zod from "zod";
import Advancements from "@/components/Advancements";
import SkinViewer from "@/components/SkinViewer/index";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import PrintDate from "@/components/PrintDate";

import { UUID } from "@/models";

import type { Metadata } from "next";
import { getPlayerProfile } from "@/services/playerProfile";
import { getPlayer, getPlayerAdvancements } from "@/services/playerData";
import { getOnlinePlayers } from "@/services/online";
import PlayerStreak from "@/components/PlayerStreak";
import advancements from "@/components/Advancements/advancements";

type Params = Promise<{ uuid: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | null> {
  const { uuid } = await params;

  const uuidValidation = zod.string().uuid().safeParse(uuid);

  if (!uuidValidation.success) {
    return null;
  } else {
    const player = await getPlayer(uuidValidation.data as UUID);
    if (player === null) return null;
    return {
      title: `${player.name} - profiili - Työleiri.fi`,
      description: `Pelaajan ${player.name} tiedot Työleirillä`,
    };
  }
}

const getPlayerData = async (uuid: Promise<string>) => {
  const uuidValue = await uuid;
  const uuidValidation = zod.string().uuid().safeParse(uuidValue);

  if (!uuidValidation.success) {
    return notFound();
  }

  const playerProfile = await getPlayerProfile(uuidValidation.data as UUID);

  const playerAdvancements = await getPlayerAdvancements(
    uuidValidation.data as UUID
  );

  const onlinePlayers = await getOnlinePlayers();

  if (
    playerProfile === null ||
    playerAdvancements === null ||
    onlinePlayers === null
  ) {
    return notFound();
  }

  const isOnline =
    onlinePlayers.find((onliner) => onliner.uuid === playerProfile.uuid) !==
    undefined;

  return { playerProfile, playerAdvancements, isOnline };
};

async function PlayerContent({ uuid }: { uuid: Promise<string> }) {
  const { playerProfile, playerAdvancements, isOnline } = await getPlayerData(
    uuid
  );

  const advancementsStyling =
    "grid grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6 @3xl:grid-cols-8 @5xl:grid-cols-10 @6xl:grid-cols-12 gap-4 bg-linear-to-r from-tumma/35 to-tumma/40 rounded-sm py-8 px-4";

  return (
    <>
      <div className="flex flex-col @md:grid @md:grid-cols-5 gap-8 w-full">
        <SkinViewer
          type={
            "default"
            //   Object.keys(advancements).includes('minecraft:end/elytra')
            //     ? 'fly'
            //     : 'default'
          }
          skin={playerProfile.skin ?? ""}
          cape={playerProfile.cape}
          className={`col-span-2 py-4 px-4 bg-linear-to-r from-tumma/35 to-tumma/40 rounded-sm`}
          controls={true}
        />
        <div className="flex flex-col gap-4 grow @md:col-span-3">
          <h1 className="text-4xl font-bold relative w-fit mb-2">
            {playerProfile.name}
            <PlayerStreak
              player={playerProfile}
              className="absolute bottom-0 -right-8"
            />
          </h1>
          {(isOnline || playerProfile.op) && (
            <div className="flex gap-4 w-full">
              {isOnline && (
                <div
                  className={`bg-emerald-600 w-fit drop-shadow-sm rounded-full shadow-sm px-2 py-1 text-xs text-white`}
                >
                  Paikalla
                </div>
              )}
              {playerProfile.op && (
                <div
                  className={`bg-[#ffd428] w-fit drop-shadow-sm rounded-full shadow-sm px-2 py-1 text-xs text-black`}
                >
                  Ylläpitäjä
                </div>
              )}
            </div>
          )}
          <div className="@container bg-linear-to-r from-tumma/35 to-tumma/40 rounded-sm p-4 w-full grow">
            <table className="border-separate border-spacing-4">
              <tbody>
                <tr className="border-b-tumma border-b-2">
                  <td className="font-bold">Pelitunnit:</td>
                  <td>{(playerProfile.playTime / 3600).toFixed(2)} tuntia</td>
                </tr>
                <tr>
                  <td className="font-bold">Viimeksi paikalla:</td>
                  <td>
                    {isOnline ? (
                      "nyt"
                    ) : (
                      <PrintDate date={playerProfile.lastPlayDate} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Saavutuksia:</td>
                  <td>
                    {
                      Object.keys(playerAdvancements).filter(
                        (key) =>
                          Object.hasOwn(advancements, key) &&
                          playerAdvancements[key]
                      ).length
                    }
                    /{Object.keys(advancements).length}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Pisin streak:</td>
                  <td>
                    <PlayerStreak player={playerProfile} longest />
                  </td>
                </tr>
              </tbody>
            </table>
            <Advancements
              className="grid grid-cols-3 @lg:grid-cols-6 gap-4 mt-4"
              showOnlyCompleted
              hideTitle
              advancements={Object.keys(playerAdvancements)
                .filter((key) => advancements[key] !== undefined)
                .map((key) => {
                  return {
                    key: key,
                    value: new Date(playerAdvancements[key]).getTime(),
                  };
                })
                .sort((a, b) => b.value - a.value)
                .slice(0, 6)
                .reduce((acc: Record<string, string>, cur) => {
                  return { ...acc, [cur.key]: playerAdvancements[cur.key] };
                }, {})}
            />
          </div>
        </div>
      </div>

      <h2 className="text-4xl font-bold mt-4 mb-2">Tarina</h2>
      <Advancements
        className={advancementsStyling}
        filter=":story"
        advancements={playerAdvancements}
      />
      <h2 className="text-4xl font-bold mt-4 mb-2">Nether</h2>
      <Advancements
        className={advancementsStyling}
        filter=":nether"
        advancements={playerAdvancements}
      />
      <h2 className="text-4xl font-bold mt-4 mb-2">End</h2>
      <Advancements
        className={advancementsStyling}
        filter=":end"
        advancements={playerAdvancements}
      />
      <h2 className="text-4xl font-bold mt-4 mb-2">Seikkailu</h2>
      <Advancements
        className={advancementsStyling}
        filter=":adventure"
        advancements={playerAdvancements}
      />
      <h2 className="text-4xl font-bold mt-4 mb-2">Viljely</h2>
      <Advancements
        className={advancementsStyling}
        filter=":husbandry"
        advancements={playerAdvancements}
      />
    </>
  );
}

export default async function Home({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="w-full">Ladataan...</p>}>
      <PlayerContent uuid={params.then((p) => p.uuid)} />
    </Suspense>
  );
}
