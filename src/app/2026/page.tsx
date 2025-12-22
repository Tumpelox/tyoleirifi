import Markdown from "react-markdown";
import Link from "next/link";
import { readFile } from "fs/promises";
import { join } from "path";
import { Suspense } from "react";

export const metadata = {
  title: "Simple voice chat asennus - Työleiri.fi",
  description:
    "Ohjeet Simple voice chat -modin asentamiseen servulla pelaamiseen",
};

const ShowOhjeet = async () => {
  const ohjeet = await readFile(
    join(process.cwd(), "src", "app", "2026", "ohjeet.md")
  );
  const ohjeetString = ohjeet.toString();

  return (
    <div className="prose dark:text-secondary dark:prose-headings:text-secondary dark:prose-strong:text-secondary">
      <Markdown>{ohjeetString}</Markdown>
    </div>
  );
};

export default async function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Työleiri 2026 - Simple voice chat asennus
      </h1>
      <Link
        href="https://storage.googleapis.com/nettisivusifi_testi/tyoleiri_2026.mrpack"
        className="bg-tumma text-white rounded-sm w-fit px-4 py-2"
      >
        Lataa tiedosto
      </Link>

      <Suspense>
        <ShowOhjeet />
      </Suspense>
    </>
  );
}
