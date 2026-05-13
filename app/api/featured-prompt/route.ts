import { NextResponse } from "next/server";
import {
  generateFeaturedPrompt,
  getKolkataDateKey,
} from "@/lib/featured-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dateKey = url.searchParams.get("date") ?? getKolkataDateKey();
  const prompt = await generateFeaturedPrompt(dateKey);

  return NextResponse.json(prompt, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
