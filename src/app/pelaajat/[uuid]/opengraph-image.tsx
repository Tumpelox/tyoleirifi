import { UUID } from "@/models";
import { getPlayerHead, getPlayerProfile } from "@/services/playerProfile";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

// Image metadata
export const alt = "Kategoria";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  const playerProfile = await getPlayerProfile(uuid as UUID);

  if (!playerProfile || !playerProfile.skin) {
    return new Response("Not found", { status: 404 });
  }

  const playerHead = await getPlayerHead(playerProfile.skin);

  if (!playerHead) {
    return new Response("Not found", { status: 404 });
  }

  const resizedPlayerHead = await sharp(playerHead)
    .resize({ width: 320, height: 320, kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  const backgroundData = await readFile(
    join(process.cwd(), "src", "static_images", "2025.png")
  );

  const backgroundLayer = sharp(backgroundData).resize(1200, 630).blur(8);

  const backgroundBuffer = await backgroundLayer.png().toBuffer();

  const compositeImage = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: backgroundBuffer, blend: "over" },
      { input: resizedPlayerHead, blend: "over", gravity: "center" },
    ])
    .webp()
    .toBuffer();

  return new Response(compositeImage.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
