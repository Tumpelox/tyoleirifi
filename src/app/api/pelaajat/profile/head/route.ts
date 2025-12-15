import { getPlayerHead } from "@/services/playerProfile";
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
    return new Response("Player head not found", { status: 404 });
  }

  const playerHead = await getPlayerHead(url.href);

  if (!playerHead) {
    return new Response("Player head not found", { status: 404 });
  }

  return new Response(playerHead.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
