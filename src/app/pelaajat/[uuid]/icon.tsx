import * as zod from "zod";

import { UUID } from "@/models";
import { getPlayerHead, getPlayerProfile } from "@/services/playerProfile";
import sharp from "sharp";

export const contentType = "image/png";

export const size = {
  width: 8,
  height: 8,
};

export default async function Icon({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  const uuidValidation = zod.string().uuid().safeParse(uuid);

  if (!uuidValidation.success) {
    return new Response("Invalid UUID", { status: 400 });
  }

  const playerProfile = await getPlayerProfile(uuidValidation.data as UUID);

  if (!playerProfile || !playerProfile.skin) {
    return new Response("Not found", { status: 404 });
  }

  const playerHead = await getPlayerHead(playerProfile.skin);

  if (!playerHead) {
    return new Response("Not found", { status: 404 });
  }

  const resizedPlayerHead = await sharp(playerHead)
    .resize({ width: 32, height: 32, kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  return new Response(resizedPlayerHead.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
