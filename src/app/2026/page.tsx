import Markdown from "react-markdown";
import Link from "next/link";
import { readFile } from "fs/promises";
import { join } from "path";

export const metadata = {
  title: "Simple voice chat asennus - Työleiri.fi",
  description:
    "Ohjeet Simple voice chat -modin asentamiseen servulla pelaamiseen",
};

export default async function Page() {
  const ohjeet = await readFile(
    join(process.cwd(), "src", "app", "2026", "ohjeet.md")
  );

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

      <div className="prose">
        <Markdown>{ohjeet.toString()}</Markdown>
      </div>
    </>
  );
}
