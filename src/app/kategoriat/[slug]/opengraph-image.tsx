import { getCategory } from "../getCategory";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return null;
  }
  const backgroundData = await readFile(
    join(process.cwd(), "src", "static_images", "2025.png")
  );

  const backgroundLayer = sharp(backgroundData).resize(1200, 630);

  const backgroundBuffer = await backgroundLayer.png().toBuffer();

  const iconBuffer = Buffer.from(
    category.icon.src.split(",")[1].trim(),
    "base64"
  );

  const iconLayer = sharp(iconBuffer).resize({
    width: category.icon.width * 15,
    height: category.icon.height * 15,
    kernel: sharp.kernel.nearest,
  });

  const iconBufferResized = await iconLayer.png().toBuffer();

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
      { input: iconBufferResized, blend: "over", gravity: "center" },
    ])
    .png()
    .toBuffer();

  return new Response(compositeImage.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
