"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FilterButtonGroup } from "@/components/ui/filter-button-group";
import { useDebounce } from "@/lib/useDebounce";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

type Prompt = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tone: string;
  tool: string;
  tags: string[];
};

const prompts: Prompt[] = [
  {
    slug: "cinematic-product-shot",
    title: "Cinematic Product Shot",
    category: "Image",
    summary:
      "Create a premium studio-style product image with soft directional light, realistic shadows, and a clean composition that highlights texture and material details.",
    tone: "Precise",
    tool: "Midjourney",
    tags: ["Product", "Studio", "Premium"],
  },
  {
    slug: "natural-portrait-retouch",
    title: "Natural Portrait Retouch",
    category: "Editing",
    summary:
      "Refine a portrait while preserving identity. Improve light, reduce distractions, and keep the final result realistic, subtle, and human.",
    tone: "Gentle",
    tool: "Photoshop",
    tags: ["Face", "Retouch", "Realistic"],
  },
  {
    slug: "investor-ppt-outline",
    title: "Investor PPT Outline",
    category: "PPT",
    summary:
      "Turn a rough idea into a 7-slide presentation with a strong narrative arc, clean slide titles, and one focused idea per slide.",
    tone: "Structured",
    tool: "PowerPoint",
    tags: ["Slides", "Business", "Outline"],
  },
  {
    slug: "clear-study-explainer",
    title: "Clear Study Explainer",
    category: "Study",
    summary:
      "Explain a topic in simple language, then summarize it with examples, memory hooks, and a short revision checklist.",
    tone: "Friendly",
    tool: "ChatGPT",
    tags: ["Notes", "Revision", "Simple"],
  },
  {
    slug: "clean-copy-adaption",
    title: "Clean Copy Adaptation",
    category: "Writing",
    summary:
      "Rewrite raw notes into polished copy with a chosen tone, audience, and output format without sounding overproduced.",
    tone: "Adaptive",
    tool: "Claude",
    tags: ["Copy", "Tone", "Marketing"],
  },
  {
    slug: "debug-focused-coding-prompt",
    title: "Debug-Focused Coding Prompt",
    category: "Coding",
    summary:
      "Ask the model to inspect code for logic issues, explain likely bugs, and propose minimal fixes with exact steps.",
    tone: "Direct",
    tool: "GPT-5",
    tags: ["JavaScript", "Fix", "Analysis"],
  },
  {
    slug: "social-carousel-prompt",
    title: "Social Carousel Prompt",
    category: "Writing",
    summary:
      "Generate a swipeable social carousel with punchy hooks, clear section breaks, and a tone that stays human rather than overhyped.",
    tone: "Punchy",
    tool: "Gemini",
    tags: ["Social", "Carousel", "Hook"],
  },
  {
    slug: "brand-visual-direction",
    title: "Brand Visual Direction",
    category: "Image",
    summary:
      "Create a visual direction prompt for a new brand identity with mood, composition, lighting, and reference cues that stay coherent.",
    tone: "Artful",
    tool: "Flux",
    tags: ["Brand", "Mood", "Direction"],
  },
];

const categories = [
  "All",
  "Image",
  "Editing",
  "PPT",
  "Writing",
  "Coding",
  "Study",
];
const tones = [
  "All",
  "Precise",
  "Gentle",
  "Structured",
  "Friendly",
  "Adaptive",
  "Direct",
  "Punchy",
  "Artful",
];
const tools = [
  "All",
  "Midjourney",
  "Photoshop",
  "PowerPoint",
  "ChatGPT",
  "Claude",
  "GPT-5",
  "Gemini",
  "Flux",
];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const [tool, setTool] = useState("All");
  const debouncedQuery = useDebounce(query, 300);

  const filteredPrompts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesQuery =
        q.length === 0 ||
        [
          prompt.title,
          prompt.summary,
          prompt.category,
          prompt.tone,
          prompt.tool,
          ...prompt.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesCategory =
        category === "All" || prompt.category === category;
      const matchesTone = tone === "All" || prompt.tone === tone;
      const matchesTool = tool === "All" || prompt.tool === tool;

      return matchesQuery && matchesCategory && matchesTone && matchesTool;
    });
  }, [debouncedQuery, category, tone, tool]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setTone("All");
    setTool("All");
  };

  const activeFilterCount =
    Number(category !== "All") +
    Number(tone !== "All") +
    Number(tool !== "All") +
    Number(query.trim().length > 0);

  return (
    <>
      <Navbar />

      <main className="noise">
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-6 flex flex-col gap-3 border-b border-[color:theme(--color-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                Prompt catalog
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Discover
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                Browse prompts by intent, tone, and tool. This section behaves
                like a library shelf, not a landing page.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-[color:theme(--color-border)] bg-surface px-4 py-2 text-sm text-muted">
                {filteredPrompts.length} prompts
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-black/5"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="paper-card rounded-[2rem] p-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                    Filters
                  </p>
                </div>

                <label className="mt-4 flex items-center gap-3 rounded-2xl border border-[color:theme(--color-border)] bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-muted" />
                  <span className="sr-only">Search prompts</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder="Search prompts"
                    aria-label="Search prompts"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  />
                </label>

                <FilterButtonGroup
                  label="Category"
                  options={categories}
                  value={category}
                  onChange={setCategory}
                />
                <FilterButtonGroup
                  label="Tone"
                  options={tones}
                  value={tone}
                  onChange={setTone}
                />
                <FilterButtonGroup
                  label="Tool"
                  options={tools}
                  value={tool}
                  onChange={setTool}
                />
              </div>

              <div className="paper-card rounded-[2rem] p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                    Active selection
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p>
                    <span className="font-semibold text-ink">Search:</span>{" "}
                    {query.trim() || "None"}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Category:</span>{" "}
                    {category}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Tone:</span> {tone}
                  </p>
                  <p>
                    <span className="font-semibold text-ink">Tool:</span> {tool}
                  </p>
                </div>
              </div>
            </aside>

            <div>
              {filteredPrompts.length === 0 ? (
                <div className="paper-card rounded-[2rem] p-10 text-center">
                  <h2 className="text-2xl font-black tracking-tight text-ink">
                    No prompts match this filter set
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Try a broader category or clear one filter at a time.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-surface"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard key={prompt.slug} {...prompt} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
