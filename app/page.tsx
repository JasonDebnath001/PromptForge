import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  Sparkles,
  ImageIcon,
  Presentation,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FeaturedPromptSection } from "@/components/home/featured-prompt";

const promptTags = [
  "Image Prompt",
  "Edit Image",
  "PPT Builder",
  "Writing",
  "Coding",
  "Study",
];

const examples = [
  {
    title: "Product photo prompt",
    text: "Create a clean studio-style product image for a matte black smartwatch on a warm stone surface, with soft side lighting, premium shadows, and minimal composition.",
  },
  {
    title: "Presentation prompt",
    text: "Turn this topic into a 7-slide investor presentation with crisp headings, one idea per slide, and a calm professional tone.",
  },
  {
    title: "Image edit prompt",
    text: "Keep the subject unchanged, but replace the background with a moody daylight office scene, preserve facial detail, and enhance natural skin tones.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="noise">
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:py-12">
          <div className="flex flex-col justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-surface px-4 py-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
                <Sparkles className="h-4 w-4 text-accent" />
                Personalized prompt library
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-7xl">
                Prompts that feel
                <span className="block italic text-accent">
                  written for one person
                </span>
                not a crowd.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                A prompt workspace for image creation, image editing,
                presentations, writing, coding, and everyday AI tasks. Built to
                adapt to the way you actually work.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/discover"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-surface transition hover:translate-y-[-1px]"
                >
                  Explore prompts
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/build"
                  className="inline-flex items-center justify-center rounded-full border border-[color:theme(--color-border)] bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
                >
                  Build a custom prompt
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="paper-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft">
                  <ImageIcon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">
                  Image
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Crafted prompts for generation and editing.
                </p>
              </div>

              <div className="paper-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft">
                  <Presentation className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">
                  PPT
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Slide-ready structures with clear narrative flow.
                </p>
              </div>

              <div className="paper-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft">
                  <PenTool className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">
                  Writing
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Tone-aware prompts for copy, notes, and drafts.
                </p>
              </div>
            </div>

            <section className="mt-16">
              <FeaturedPromptSection />
            </section>
          </div>

          <aside>
            <div className="paper-card rounded-[2rem] p-5 sm:p-6 lg:p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                Prompt library
              </p>

              <div className="mt-4 space-y-3">
                {examples.map((item, index) => (
                  <div
                    key={item.title}
                    className={`rounded-[1.5rem] border p-4 ${
                      index === 0
                        ? "border-[rgba(178,74,47,0.24)] bg-[rgba(178,74,47,0.05)]"
                        : "border-[color:theme(--color-border)] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-ink">
                        {item.title}
                      </h3>
                      <span className="text-xs text-muted">{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
