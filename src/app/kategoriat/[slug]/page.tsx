import PrintDate from "@/components/PrintDate";
import ProfileLink from "@/components/ProfileLink";
import SkinView from "@/components/SkinViewer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  DisplaySettings,
  getCategoryData,
  getCategoryMetadata,
} from "../getCategory";
import PrintTime from "@/components/PrintTime";
import { Metadata } from "next";
import Image from "next/image";
import defaultMetadata from "@/app/metadata";
import Loading from "@/components/Loading";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | null> {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return null;
  } else {
    return {
      title: `${category.title} - Työleiri.fi`,
      description: category.description,
      openGraph: {
        ...defaultMetadata.openGraph,
        title: `${category.title} - Työleiri.fi`,
        description: category.description,
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: `${category.title} - Työleiri.fi`,
        description: category.description,
      },
    };
  }
}

const valueToOutputString = (
  value: number | string,
  displaySettings: DisplaySettings,
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

const getCategory = async (slug: string) => {
  const data = await getCategoryMetadata(slug);

  if (data === null) {
    return notFound();
  }

  return data;
};

const getCategoryDataValues = async (slug: string) => {
  const data = await getCategoryData(slug);

  if (data === null) {
    return notFound();
  }

  return { values: await data.values, total: await data.total };
};

const CategoryInfo = async ({ slug }: { slug: Promise<string> }) => {
  const data = await getCategory(await slug);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-lg">{data.description}</p>
    </div>
  );
};

const CategoryContent = async ({ slug }: { slug: Promise<string> }) => {
  const data = await getCategory(await slug);

  const { values, total } = await getCategoryDataValues(await slug);
  return (
    <>
      {values.length === 0 && (
        <div className="flex flex-col w-full items-center">
          <Image
            src="/snowgolem.png"
            alt="Snow Golem"
            width={300}
            height={300}
            className="mx-auto my-4 h-40 w-24"
          />
          <p>Tässä kategoriassa ei ole vielä dataa.</p>
        </div>
      )}
      {values.length > 0 && (
        <>
          <div className="relative w-full grid grid-flow-row sm:gap-5 sm:grid-cols-3 sm:justify-between">
            {values.length > 3 &&
              values.slice(0, 3).map((player, index) => {
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
          {data.display.type !== "date" && data.display.type !== "boolean" && (
            <div className="w-full bg-tumma/90 flex justify-center items-center py-2 px-4 rounded-sm text-white">
              <h3 className="font-bold text-xl">
                Yhteensä {totalValue(total, data.display)}
              </h3>
            </div>
          )}
          <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 gap-4 w-full">
            {values.map((player, index) => {
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
                      className="flex flex-col gap-2 max-w-20 w-full"
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
        </>
      )}
    </>
  );
};

export default async function Page({ params }: { params: Params }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CategoryInfo slug={params.then((p) => p.slug)} />
        <CategoryContent slug={params.then((p) => p.slug)} />
      </Suspense>
    </>
  );
}
