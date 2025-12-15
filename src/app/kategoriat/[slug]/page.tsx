import PrintDate from "@/components/PrintDate";
import ProfileLink from "@/components/ProfileLink";
import SkinView from "@/components/SkinViewer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DisplaySettings, getCategory } from "../getCategory";
import PrintTime from "@/components/PrintTime";

const valueToOutputString = (
  value: number | string,
  displaySettings: DisplaySettings
) => {
  switch (displaySettings.type) {
    case "time":
      return <PrintTime duration={Number(value)} />;
    case "number":
      return `${value}`;
    case "date":
      return <PrintDate date={String(value)} />;
    case "boolean":
      return value ? "Kyllä" : "Ei";
    default:
      return `${value}`;
  }
};

const playerValue = (value: number, display: DisplaySettings) => {
  if (display.playerValue) {
    const displayValue =
      value === 1 ? display.playerValue.singular : display.playerValue.plural;

    return displayValue.replace("{value}", String(value));
  } else {
    return valueToOutputString(value, display);
  }
};

const totalValue = (value: number, display: DisplaySettings) => {
  if (display.totalValue) {
    const displayValue =
      value === 1 ? display.totalValue.singular : display.totalValue.plural;

    return displayValue.replace("{value}", String(value));
  } else {
    return valueToOutputString(value, display);
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getCategory(slug);

  if (data === null) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-bold ">{data.title}</h1>
      <Suspense fallback={<p className="w-full">Ladataan...</p>}>
        {data.values.length > 0 && (
          <>
            <div className="relative w-full grid grid-flow-row sm:gap-5 sm:grid-cols-3 sm:justify-between">
              {data.values.length > 3 &&
                data.values.slice(0, 3).map((player, index) => {
                  return (
                    <Link
                      href={`/pelaajat/${player.uuid}`}
                      title={player.name}
                      className="cursor-pointer flex flex-col items-center"
                      key={index}
                      replace
                    >
                      <SkinView
                        skin={player.skin as string}
                        cape={player.cape}
                        priority={"0"}
                      >
                        <h3 className="text-2xl font-bold ">{player.name}</h3>
                        {playerValue(player.value, data.display)}
                      </SkinView>
                    </Link>
                  );
                })}
            </div>
            {data.display.type !== "date" &&
              data.display.type !== "boolean" && (
                <div className="w-full bg-tumma/90 flex justify-center items-center py-2 px-4 rounded-sm text-white">
                  <h3 className="font-bold text-xl">
                    Yhteensä {totalValue(data.total, data.display)}
                  </h3>
                </div>
              )}
            <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 gap-4 w-full">
              {data.values.map((player, index) => {
                return (
                  <div
                    className="flex flex-col gap-4 rounded-sm py-2 px-4 bg-linear-to-r from-tumma/35 to-tumma/40 relative"
                    key={index}
                  >
                    <div className="flex gap-4 items-center">
                      <p className="font-bold text-xl">{index + 1}</p>
                    </div>
                    <div className="flex flex gap-4 justify-between w-full">
                      <ProfileLink
                        key={index}
                        player={player}
                        className="flex flex-col gap-2"
                      >
                        <p className="font-semibold">{player.name}</p>
                      </ProfileLink>
                      <div className="py-2 px-4">
                        {playerValue(player.value, data.display)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* </table> */}
          </>
        )}
      </Suspense>
    </>
  );
}
