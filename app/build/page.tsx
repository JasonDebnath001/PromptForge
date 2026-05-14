"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type GeneratePromptResponse = {
  prompt?: string;
  error?: string;
};

export default function BuildPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic")?.trim() || "";

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
          body: JSON.stringify({ topic }),
        });

        const data = (await response.json()) as GeneratePromptResponse;

        if (!response.ok) {
          throw new Error(data.error || "Prompt generation failed.");
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
  }, [topic]);

  const copyPrompt = async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);

      window.setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="noise min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-4xl items-center justify-center">
          <div className="paper-card w-full rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  Prompt result
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {loading ? "Generating..." : "Ready"}
                </h1>
              </div>

              <button
                type="button"
                onClick={copyPrompt}
                disabled={!generatedPrompt || loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-surface transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copySuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-[color:theme(--color-border)] bg-[#fffdf8] p-5 sm:p-6">
              {loading ? (
                <p className="text-sm leading-7 text-muted">
                  Generating your prompt...
                </p>
              ) : error ? (
                <p className="text-sm leading-7 text-muted">{error}</p>
              ) : (
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-ink sm:text-base sm:leading-8">
                  {generatedPrompt}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
