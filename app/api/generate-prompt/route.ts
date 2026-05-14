import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-3.1-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanText(text: string) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      topic?: string;
    } | null;

    const topic = body?.topic?.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set." },
        { status: 500 },
      );
    }

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  `Generate one strong AI prompt for this request:\n` +
                  `${topic || "a useful prompt for the user's need"}\n\n` +
                  `Rules:\n` +
                  `- Return only the final prompt text\n` +
                  `- Do not explain anything\n` +
                  `- Do not use markdown\n` +
                  `- Do not wrap the result in quotes\n` +
                  `- Make it specific, useful, and ready to paste into an AI tool`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 220,
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gemini request failed with status ${response.status}` },
        { status: 500 },
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const generatedText =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("") ?? "";

    const prompt = cleanText(generatedText);

    return NextResponse.json(
      { prompt },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate prompt." },
      { status: 500 },
    );
  }
}
