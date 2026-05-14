"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Wand2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const topic = idea.trim();
    setIsSubmitting(true);

    try {
      await router.push(
        topic ? `/build?topic=${encodeURIComponent(topic)}` : "/build",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="noise relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(178,74,47,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(23,19,17,0.08),transparent_24%)]"
        />

        <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-muted uppercase backdrop-blur">
                <Wand2 className="h-4 w-4 text-accent" />
                Prompt generation, nothing extra
              </p>

              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Tell it what you need.
                <span className="block text-accent">Get the prompt.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                PromptForge turns a rough task into a prompt you can actually
                use. No clutter, no generic template parade, just a clean
                starting point for whatever you are trying to make.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-[2.25rem] border border-[color:theme(--color-border)] bg-white/80 p-4 shadow-[0_30px_100px_rgba(23,19,17,0.08)] backdrop-blur-sm sm:p-5"
              >
                <label className="block">
                  <span className="sr-only">Describe what you need</span>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    rows={4}
                    placeholder="Describe what you need a prompt for"
                    className="w-full resize-none rounded-[1.5rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-base leading-7 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                  />
                </label>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-muted">
                    A sentence is enough. The workshop handles the rest.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-surface transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Generate prompt
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            <aside className="flex items-stretch lg:justify-end">
              <div className="paper-card flex w-full max-w-xl flex-col justify-between rounded-[2.25rem] p-6 sm:p-8 lg:min-h-[32rem]">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    How it feels
                  </p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
                    <p>You bring the need. PromptForge shapes the wording.</p>
                    <p>
                      The result is meant to feel direct, specific, and ready to
                      use, without looking like a stock AI landing page.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-[color:theme(--color-border)] bg-white/75 p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    Core idea
                  </p>
                  <p className="mt-3 max-w-sm text-2xl font-black leading-tight text-ink">
                    One input in.
                    <span className="block text-accent">One prompt out.</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
