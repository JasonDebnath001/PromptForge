export type FeaturedPrompt = {
  title: string;
  category: string;
  tag: string;
  prompt: string;
  dateKey: string;
  source: "gemini" | "fallback";
};

const GEMINI_MODEL = "gemini-3.1-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const CATEGORIES = [
  "Image",
  "Editing",
  "Presentation",
  "Writing",
  "Coding",
  "Study",
] as const;
const THEMES = [
  "product launch",
  "portfolio polishing",
  "exam revision",
  "social media campaign",
  "video thumbnail design",
  "startup pitch deck",
  "brand storytelling",
  "coding workflow",
] as const;
const STYLES = [
  "clean",
  "cinematic",
  "bold",
  "minimal",
  "premium",
  "playful",
] as const;

export function getKolkataDateKey(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value ?? "1970";
  const month = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: readonly T[], seed: number): T {
  return items[seed % items.length]!;
}

function fallbackFeaturedPrompt(dateKey: string): FeaturedPrompt {
  const seed = hashString(dateKey);
  const category = pick(CATEGORIES, seed);
  const theme = pick(THEMES, seed + 7);
  const style = pick(STYLES, seed + 13);

  return {
    title: `${theme
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`,
    category,
    tag: `${style} ${category}`,
    prompt: `Create a ${style} ${category.toLowerCase()} prompt for ${theme}. Make it practical, specific, and ready to paste into an AI tool.`,
    dateKey,
    source: "fallback",
  };
}

function extractJson(text: string): unknown | null {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

function normalizePrompt(
  input: unknown,
  fallback: FeaturedPrompt,
): FeaturedPrompt {
  if (!input || typeof input !== "object") return fallback;

  const data = input as Record<string, unknown>;
  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : fallback.title;
  const category =
    typeof data.category === "string" && data.category.trim()
      ? data.category.trim()
      : fallback.category;
  const tag =
    typeof data.tag === "string" && data.tag.trim()
      ? data.tag.trim()
      : fallback.tag;
  const prompt =
    typeof data.prompt === "string" && data.prompt.trim()
      ? data.prompt.trim()
      : fallback.prompt;

  return {
    title,
    category,
    tag,
    prompt,
    dateKey: fallback.dateKey,
    source: "gemini",
  };
}

export async function generateFeaturedPrompt(
  dateKey = getKolkataDateKey(),
): Promise<FeaturedPrompt> {
  const fallback = fallbackFeaturedPrompt(dateKey);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return fallback;

  try {
    const theme = pick(THEMES, hashString(dateKey) + 3);
    const style = pick(STYLES, hashString(dateKey) + 11);
    const category = pick(CATEGORIES, hashString(dateKey) + 19);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  `Create today's featured prompt for PromptForge.\n` +
                  `Theme: ${theme}\n` +
                  `Style: ${style}\n` +
                  `Category: ${category}\n\n` +
                  `Return ONLY valid JSON with exactly these keys:\n` +
                  `{"title":"...","category":"...","tag":"...","prompt":"..."}` +
                  `\n\nRules:\n` +
                  `- category must be one of: Image, Editing, Presentation, Writing, Coding, Study\n` +
                  `- prompt should be 2 to 4 sentences\n` +
                  `- prompt should be ready to paste into an AI tool\n` +
                  `- no markdown, no code fences, no extra text`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 220,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) return fallback;

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("") ?? "";
    const parsed = typeof text === "string" ? extractJson(text) : null;

    return normalizePrompt(parsed, fallback);
  } catch {
    return fallback;
  }
}
