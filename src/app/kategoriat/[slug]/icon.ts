import sharp from "sharp";
import { getCategory } from "../getCategory";

export const contentType = "image/png";

export const size = {
  width: 8,
  height: 8,
};

export default async function Icon({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return null;
  }

  const buffer = Buffer.from(category.icon.src.split(",")[1].trim(), "base64");

  const resizedPlayerHead = await sharp(buffer)
    .resize({ width: 32, height: 32, kernel: sharp.kernel.nearest })
    .toBuffer();

  return new Response(resizedPlayerHead.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
