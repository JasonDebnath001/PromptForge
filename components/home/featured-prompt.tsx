"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCcw, Sparkles } from "lucide-react";
import { getKolkataDateKey, type FeaturedPrompt } from "@/lib/featured-prompt";

const storageKeyFor = (dateKey: string) =>
  `promptforge:featured-prompt:${dateKey}`;

export function FeaturedPromptSection() {
  const dateKey = useMemo(() => getKolkataDateKey(), []);
  const [featuredPrompt, setFeaturedPrompt] = useState<FeaturedPrompt | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const loadPrompt = async (forceRefresh = false) => {
    const storageKey = storageKeyFor(dateKey);

    if (!forceRefresh) {
      const cached = window.localStorage.getItem(storageKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as FeaturedPrompt;
          setFeaturedPrompt(parsed);
          setLoading(false);
          return;
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
    }

    try {
      setNotice(null);
      const response = await fetch(
        `/api/featured-prompt?date=${encodeURIComponent(dateKey)}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as FeaturedPrompt;
      setFeaturedPrompt(data);
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setNotice("Using the fallback prompt for today.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadPrompt(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey]);

  return (
    <section className="rounded-[2rem] border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              Today&apos;s featured prompt
            </p>
          </div>
          <h3 className="mt-2 text-2xl font-black text-ink">
            Fresh prompt, one copy-paste away
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            This refreshes daily and stays cached on the device so repeat visits
            stay snappy.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRefreshing(true);
            void loadPrompt(true);
          }}
          disabled={loading || refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCcw className="h-4 w-4" />
          {refreshing ? "Refreshing..." : "Reload today"}
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-border bg-[#fffdf8] p-5">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-28 animate-pulse rounded-full bg-black/10" />
            <div className="h-8 w-3/4 animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-full animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-black/10" />
            <div className="mt-4 h-24 w-full animate-pulse rounded-[1rem] bg-black/5" />
          </div>
        ) : featuredPrompt ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
                {featuredPrompt.category}
              </span>
              <span className="rounded-full border border-border bg-ink px-3 py-1 text-xs font-semibold text-surface">
                {featuredPrompt.tag}
              </span>
              <span className="text-xs font-medium text-muted">
                {featuredPrompt.source === "gemini"
                  ? "Generated with Gemini"
                  : "Built-in fallback"}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-black text-ink">
                {featuredPrompt.title}
              </h4>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">
                {featuredPrompt.prompt}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-border bg-white/50 p-6 text-sm text-muted">
            No prompt loaded yet.
          </div>
        )}
      </div>

      {notice ? <p className="mt-3 text-xs text-muted">{notice}</p> : null}
    </section>
  );
}
