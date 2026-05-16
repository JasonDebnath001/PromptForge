"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Mode = "guided" | "simple";

type GuidedFormState = {
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

const INITIAL_GUIDED_STATE: GuidedFormState = {
  businessName: "",
  businessType: "",
  topic: "",
  task: "",
  audience: "",
  tone: "",
  outputLength: "",
  platform: "",
  keyPoints: "",
  notes: "",
};

const BUSINESS_TYPES = [
  "Startup",
  "Small business",
  "Agency",
  "Creator brand",
  "E-commerce",
  "Freelancer",
  "Personal brand",
  "Other",
];

const TASK_OPTIONS = [
  "Marketing copy",
  "Social media post",
  "Blog article",
  "Email",
  "Ad copy",
  "Product description",
  "Sales page",
  "Brainstorming",
  "Strategy plan",
  "Script",
  "Other",
];

const TONE_OPTIONS = [
  "Professional",
  "Friendly",
  "Bold",
  "Luxury",
  "Playful",
  "Warm",
  "Persuasive",
  "Minimal",
];

const LENGTH_OPTIONS = ["Short", "Medium", "Detailed"];

const PLATFORM_OPTIONS = [
  "Website",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X / Twitter",
  "Email",
  "YouTube",
  "WhatsApp",
  "Other",
];

function buildQueryParams(mode: Mode, guidedForm: GuidedFormState, description: string) {
  const params = new URLSearchParams();
  params.set("mode", mode);

  if (mode === "simple") {
    const trimmed = description.trim();
    if (trimmed) {
      params.set("description", trimmed);
    }
    return params;
  }

  Object.entries(guidedForm).forEach(([key, value]) => {
    const trimmed = value.trim();
    if (trimmed) {
      params.set(key, trimmed);
    }
  });

  return params;
}

function FieldLabel({
  title,
  description,
  htmlFor,
}: {
  title: string;
  description?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-sm font-semibold text-ink">{title}</span>
      {description ? (
        <span className="mt-1 block text-sm leading-6 text-muted">{description}</span>
      ) : null}
    </label>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("guided");
  const [guidedForm, setGuidedForm] = useState<GuidedFormState>(INITIAL_GUIDED_STATE);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const guidedSummary = useMemo(() => {
    const pieces = [guidedForm.businessName, guidedForm.topic, guidedForm.task].filter(Boolean);
    return pieces.length ? pieces.join(" · ") : "Build a more tailored prompt";
  }, [guidedForm.businessName, guidedForm.topic, guidedForm.task]);

  const simpleSummary = useMemo(() => {
    const trimmed = description.trim();
    return trimmed ? trimmed.slice(0, 90) : "Describe the prompt in your own words";
  }, [description]);

  const handleGuidedChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setGuidedForm((current) => ({ ...current, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (mode === "simple" && !description.trim()) {
      setFormError("Please describe what you need first.");
      return;
    }

    if (mode === "guided") {
      const hasAnyValue = Object.values(guidedForm).some((value) => value.trim().length > 0);
      if (!hasAnyValue) {
        setFormError("Please provide at least one detail before generating a prompt.");
        return;
      }
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const params = buildQueryParams(mode, guidedForm, description);
      router.push(`/build?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="noise">
          <div className="mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="paper-card rounded-[2.25rem] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                  <Sparkles className="h-4 w-4" />
                  Prompt generation with a sharper brief
                </span>
                <div className="inline-flex rounded-full border border-[color:theme(--color-border)] bg-white/70 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("guided");
                      setFormError(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      mode === "guided"
                        ? "bg-ink text-surface"
                        : "text-muted hover:bg-black/5 hover:text-ink"
                    }`}
                  >
                    Guided
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("simple");
                      setFormError(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      mode === "simple"
                        ? "bg-ink text-surface"
                        : "text-muted hover:bg-black/5 hover:text-ink"
                    }`}
                  >
                    Simple
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  {mode === "simple" ? "Simple mode" : "Guided mode"}
                </p>
                <h1 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl">
                  {mode === "simple"
                    ? "Describe the prompt in plain language."
                    : "Tell us the shape of the task. Get a better prompt."}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                  {mode === "simple"
                    ? "One textarea, fewer decisions, faster spark. Type what you need and let the forge shape it."
                    : "PromptForge turns loose ideas into a structured brief and then into a ready-to-paste prompt. Add a few details and the AI can aim with a steadier hand."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                {mode === "simple" ? (
                  <div>
                    <FieldLabel
                      title="Describe what you need"
                      htmlFor="description"
                      description="Tell the AI the goal, audience, tone, format, and any must-haves in a single box."
                    />
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                        setFormError(null);
                      }}
                      rows={10}
                      placeholder="Example: Write a persuasive Instagram caption for a handmade candle brand. Keep it warm, elegant, and short. Mention natural ingredients and include a subtle call to action."
                      className="mt-3 w-full resize-none rounded-[1.5rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <FieldLabel title="Business name" htmlFor="businessName" />
                      <input
                        id="businessName"
                        name="businessName"
                        value={guidedForm.businessName}
                        onChange={handleGuidedChange}
                        placeholder="Your brand or project"
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      />
                    </div>

                    <div>
                      <FieldLabel title="Business type" htmlFor="businessType" />
                      <select
                        id="businessType"
                        name="businessType"
                        value={guidedForm.businessType}
                        onChange={handleGuidedChange}
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      >
                        <option value="">Select one</option>
                        {BUSINESS_TYPES.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel title="Task" htmlFor="task" />
                      <select
                        id="task"
                        name="task"
                        value={guidedForm.task}
                        onChange={handleGuidedChange}
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      >
                        <option value="">Select one</option>
                        {TASK_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel title="Topic" htmlFor="topic" />
                      <input
                        id="topic"
                        name="topic"
                        value={guidedForm.topic}
                        onChange={handleGuidedChange}
                        placeholder="What is this about?"
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      />
                    </div>

                    <div>
                      <FieldLabel title="Audience" htmlFor="audience" />
                      <input
                        id="audience"
                        name="audience"
                        value={guidedForm.audience}
                        onChange={handleGuidedChange}
                        placeholder="Who is it for?"
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      />
                    </div>

                    <div>
                      <FieldLabel title="Tone" htmlFor="tone" />
                      <select
                        id="tone"
                        name="tone"
                        value={guidedForm.tone}
                        onChange={handleGuidedChange}
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      >
                        <option value="">Select one</option>
                        {TONE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel title="Prompt length" htmlFor="outputLength" />
                      <select
                        id="outputLength"
                        name="outputLength"
                        value={guidedForm.outputLength}
                        onChange={handleGuidedChange}
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      >
                        <option value="">Select one</option>
                        {LENGTH_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel title="Platform" htmlFor="platform" />
                      <select
                        id="platform"
                        name="platform"
                        value={guidedForm.platform}
                        onChange={handleGuidedChange}
                        className="mt-3 w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      >
                        <option value="">Select one</option>
                        {PLATFORM_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <FieldLabel
                        title="Key points"
                        htmlFor="keyPoints"
                        description="Mention facts, features, constraints, or must-include lines."
                      />
                      <textarea
                        id="keyPoints"
                        name="keyPoints"
                        value={guidedForm.keyPoints}
                        onChange={handleGuidedChange}
                        rows={4}
                        placeholder="Feature list, offer, deadlines, keywords, or anything the prompt should respect"
                        className="mt-3 w-full resize-none rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <FieldLabel
                        title="Extra notes"
                        htmlFor="notes"
                        description="Anything special the AI should know about voice, format, restrictions, or goals."
                      />
                      <textarea
                        id="notes"
                        name="notes"
                        value={guidedForm.notes}
                        onChange={handleGuidedChange}
                        rows={4}
                        placeholder="Avoid jargon, emphasize trust, include a call to action, keep the language clear and human"
                        className="mt-3 w-full resize-none rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                {formError ? (
                  <p className="mt-4 text-sm leading-6 text-red-600">{formError}</p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-muted">
                    {mode === "simple" ? simpleSummary : guidedSummary}
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
                    Why this helps
                  </p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
                    <p>
                      Guided mode gives the AI more structure, which usually means sharper,
                      less generic output.
                    </p>
                    <p>
                      Simple mode is faster and friendlier for messy ideas, one-sentence
                      requests, or “just write the prompt for me” moments.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-[color:theme(--color-border)] bg-white/75 p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    Core idea
                  </p>
                  <p className="mt-3 max-w-sm text-2xl font-black leading-tight text-ink">
                    One guided brief.
                    <span className="block text-accent">Or one plain description.</span>
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