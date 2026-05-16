"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Mode = "guided" | "simple";

type GeneratePromptResponse = {
  prompt?: string;
  error?: string;
};

type Brief = {
  mode: Mode;
  description: string;
  businessName: string;
  businessType: string;
  topic: string;
  task: string;
  audience: string;
  tone: string;
  outputLength: string;
  platform: string;
  keyPoints: string;
  notes: string;
};

function readBrief(searchParams: ReturnType<typeof useSearchParams>): Brief {
  const mode = searchParams.get("mode") === "simple" ? "simple" : "guided";
  let description = searchParams.get("description")?.trim() || "";

  if (searchParams.get("description_stored") === "true") {
    if (typeof window !== "undefined") {
      description = window.sessionStorage.getItem("forge_description") || "";
    }
  }

  return {
    mode,
    description,
    businessName: searchParams.get("businessName")?.trim() || "",
    businessType: searchParams.get("businessType")?.trim() || "",
    topic: searchParams.get("topic")?.trim() || "",
    task: searchParams.get("task")?.trim() || "",
    audience: searchParams.get("audience")?.trim() || "",
    tone: searchParams.get("tone")?.trim() || "",
    outputLength: searchParams.get("outputLength")?.trim() || "",
    platform: searchParams.get("platform")?.trim() || "",
    keyPoints: searchParams.get("keyPoints")?.trim() || "",
    notes: searchParams.get("notes")?.trim() || "",
  };
}

function BuildPageContent() {
  const searchParams = useSearchParams();
  const brief = useMemo(() => readBrief(searchParams), [searchParams]);

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const generate = async () => {
      try {
        setLoading(true);
        setError(null);
        setCopySuccess(false);
        setGeneratedPrompt("");

        const response = await fetch("/api/generate-prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brief),
        });

        const data: GeneratePromptResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof data?.error === "string"
              ? data.error
              : "Prompt generation failed.",
          );
        }

        if (
          !data ||
          typeof data !== "object" ||
          (data.prompt !== undefined && typeof data.prompt !== "string") ||
          (data.error !== undefined && typeof data.error !== "string")
        ) {
          throw new Error("Invalid response from server.");
        }

        if (!cancelled) {
          setGeneratedPrompt(data.prompt?.trim() || "");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to generate prompt.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void generate();

    return () => {
      cancelled = true;
    };
  }, [brief]);

  const copyPrompt = async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);
      window.setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="paper-card relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(178,74,47,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(23,19,17,0.08),transparent_30%)]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  {brief.mode === "simple" ? "Simple mode" : "Guided mode"}
                </p>
                <h1 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-5xl">
                  {loading
                    ? "Forging your prompt..."
                    : error
                      ? "The forge cooled down"
                      : "Your prompt is ready"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  {brief.mode === "simple"
                    ? "A plain-language request went into the kiln. The result below is ready to copy."
                    : "Your structured brief went into the kiln. The result below is tuned to your details."}
                </p>
              </div>

              <button
                type="button"
                onClick={copyPrompt}
                disabled={!generatedPrompt || loading || !!error}
                className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[color:theme(--color-border)] bg-white/80 px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copySuccess ? "Copied" : "Copy prompt"}
              </button>
            </div>

            <div className="rounded-[2rem] border border-[color:theme(--color-border)] bg-white/75 p-5 shadow-none sm:p-6">
              {loading ? (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-white/80 px-3 py-2 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    <Sparkles className="h-4 w-4" />
                    Generating
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-1/4 animate-pulse rounded-full bg-black/10" />
                    <div className="h-4 w-5/6 animate-pulse rounded-full bg-black/10" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-black/10" />
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-black/10" />
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/10" />
                  </div>
                  <div className="rounded-[1.5rem] border border-dashed border-[color:theme(--color-border)] bg-white/70 p-4">
                    <div className="space-y-3">
                      <div className="h-3 w-2/5 animate-pulse rounded-full bg-black/10" />
                      <div className="h-3 w-full animate-pulse rounded-full bg-black/10" />
                      <div className="h-3 w-11/12 animate-pulse rounded-full bg-black/10" />
                      <div className="h-3 w-4/5 animate-pulse rounded-full bg-black/10" />
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
                  {error}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-[15px] leading-8 text-ink">
                  {generatedPrompt}
                </pre>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function BuildPage() {
  return <BuildPageContent />;
}
