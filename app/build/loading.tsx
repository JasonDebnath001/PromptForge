import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="paper-card relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(178,74,47,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(23,19,17,0.08),transparent_30%)]" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
                <div className="mt-4 h-12 w-4/5 animate-pulse rounded-[1.25rem] bg-black/10 sm:h-14 sm:w-3/5" />
                <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-black/10" />
                <div className="mt-3 h-4 w-5/6 animate-pulse rounded-full bg-black/10" />
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[color:theme(--color-border)] bg-white/80 px-4 py-3 text-sm font-semibold text-ink">
                <Sparkles className="h-4 w-4" />
                Forging
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:theme(--color-border)] bg-white/75 p-5 sm:p-6">
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
