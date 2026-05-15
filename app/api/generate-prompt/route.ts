import { NextResponse } from "next/server";

const GEMINI_MODEL =
  process.env.GEMINI_MODEL?.trim() || "gemini-3.1-flash-lite";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Brief = {
  businessName?: string;
  businessType?: string;
  topic?: string;
  task?: string;
  audience?: string;
  tone?: string;
  outputLength?: string;
  platform?: string;
  keyPoints?: string;
  notes?: string;
};

function cleanText(text: string) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function buildBrief(input: Brief) {
  const lines: string[] = [];

  if (input.businessName) lines.push(`Business name: ${input.businessName}`);
  if (input.businessType) lines.push(`Business type: ${input.businessType}`);
  if (input.task) lines.push(`Task: ${input.task}`);
  if (input.topic) lines.push(`Topic: ${input.topic}`);
  if (input.audience) lines.push(`Audience: ${input.audience}`);
  if (input.tone) lines.push(`Tone: ${input.tone}`);
  if (input.outputLength)
    lines.push(`Desired prompt length: ${input.outputLength}`);
  if (input.platform) lines.push(`Platform: ${input.platform}`);
  if (input.keyPoints) lines.push(`Key details: ${input.keyPoints}`);
  if (input.notes) lines.push(`Extra notes: ${input.notes}`);

  return lines.length ? lines.join("\n") : "No extra brief supplied.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Brief | null;

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set." },
        { status: 500 },
      );
    }

    const brief = buildBrief(body || {});

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      GEMINI_MODEL,
    )}:generateContent`;

    const response = await fetch(endpoint, {
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
                  "You are a senior prompt engineer.\n" +
                  "Turn the following brief into one polished, ready-to-paste AI prompt.\n" +
                  "The prompt should be detailed and accurate, but still reasonably short, around 120 to 180 words.\n" +
                  "Use only the information provided. Do not invent facts.\n" +
                  "Keep it in plain text.\n" +
                  "Do not use markdown, lists, headings, or code fences.\n" +
                  "Write the prompt so it can be pasted into another AI tool and immediately used.\n\n" +
                  `Brief:\n${brief}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: 320,
        },
      }),
    });

    const rawText = await response.text();

    if (!response.ok) {
      let upstreamError: unknown = rawText;

      try {
        upstreamError = JSON.parse(rawText);
      } catch {
        // Keep raw text if it is not JSON.
      }

      console.error("Gemini request failed", {
        status: response.status,
        model: GEMINI_MODEL,
        upstreamError,
      });

      return NextResponse.json(
        {
          error: "Gemini request failed.",
          status: response.status,
          model: GEMINI_MODEL,
          details: upstreamError,
        },
        { status: 500 },
      );
    }

    const data = JSON.parse(rawText) as {
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
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to generate prompt.",
        details:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    );
  }
}
