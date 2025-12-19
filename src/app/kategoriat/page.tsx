import categories from "./categories";
import Image from "next/image";
import Link from "next/link";

import defaultMetadata from "@/app/metadata";

export const metadata = {
  ...defaultMetadata,
  title: "Työleiri.fi - Haastekategoriat",
  description: "Tutustu Työleirin haastekategorioihin ja niiden sisältöön.",
};

export default async function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold ">Haastekategoriat</h1>

      <div className="grid grid-flow-row @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 gap-5">
        {categories.map((category) => {
          return (
            <div className="flex gap-4 items-center" key={category.slug}>
              {category.icon !== undefined && (
                <Image
                  src={category.icon.src}
                  height={category.icon.height}
                  width={category.icon.width}
                  style={{ imageRendering: "pixelated" }}
                  alt={category.icon.alt}
                  className="w-20 h-20"
                />
              )}
              <div className="flex flex-col gap-4 h-full justify-between">
                <h3 className="text-lg font-bold">{category.title}</h3>
                <h3 className="">{category.description}</h3>
                <Link
                  href={`/kategoriat/${category.slug}`}
                  prefetch={false}
                  className="bg-current rounded-sm w-fit px-4 py-1"
                >
                  <span className=" text-white dark:text-[#141414] ">Avaa</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
