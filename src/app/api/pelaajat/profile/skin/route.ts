import { getPlayerSkin } from "@/services/playerProfile";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const encodedUrl = request.nextUrl.searchParams.get("url");

  if (!encodedUrl) {
    return new Response("Texture URL not provided", { status: 400 });
  }

  const url = new URL(decodeURIComponent(encodedUrl));

  if (url === null) {
    return new Response("Player not found", { status: 404 });
  }

  if (url.origin !== "http://textures.minecraft.net") {
    return new Response("Bad request", { status: 400 });
  }

  const playerSkin = await getPlayerSkin(url.href);

  return new Response(playerSkin as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
