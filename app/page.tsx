"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type FormState = {
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

const INITIAL_STATE: FormState = {
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

function buildQueryParams(form: FormState) {
  const params = new URLSearchParams();

  Object.entries(form).forEach(([key, value]) => {
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
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-ink">{title}</p>
      {description ? (
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSummary = useMemo(() => {
    const pieces = [form.businessName, form.topic, form.task].filter(Boolean);
    return pieces.length ? pieces.join(" · ") : "Build a more tailored prompt";
  }, [form.businessName, form.topic, form.task]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const params = buildQueryParams(form);
      const query = params.toString();
      router.push(query ? `/build?${query}` : "/build");
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
          <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:theme(--color-border)] bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-muted uppercase backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent" />
                Prompt generation with a sharper brief
              </p>

              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Tell us the shape of the task.
                <span className="block text-accent">Get a better prompt.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                PromptForge turns loose ideas into a structured brief and then
                into a ready-to-paste prompt. Add a few details and the AI can
                aim with a steadier hand.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-[2.25rem] border border-[color:theme(--color-border)] bg-white/80 p-4 shadow-[0_30px_100px_rgba(23,19,17,0.08)] backdrop-blur-sm sm:p-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FieldLabel
                      title="Business name"
                      description="Optional. Helps ground the prompt in the brand or company name."
                    />
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="Acme Studio"
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>

                  <div>
                    <FieldLabel
                      title="Business type"
                      description="Choose the closest fit for the brand."
                    />
                    <select
                      name="businessType"
                      value={form.businessType}
                      onChange={handleChange}
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
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
                    <FieldLabel
                      title="Task"
                      description="What should the AI actually produce?"
                    />
                    <select
                      name="task"
                      value={form.task}
                      onChange={handleChange}
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
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
                    <FieldLabel
                      title="Topic"
                      description="The subject or campaign theme."
                    />
                    <input
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      placeholder="New product launch"
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>

                  <div>
                    <FieldLabel
                      title="Target audience"
                      description="Who should the prompt speak to?"
                    />
                    <input
                      name="audience"
                      value={form.audience}
                      onChange={handleChange}
                      placeholder="Small business owners"
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>

                  <div>
                    <FieldLabel
                      title="Tone"
                      description="This sets the mood of the final prompt."
                    />
                    <select
                      name="tone"
                      value={form.tone}
                      onChange={handleChange}
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
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
                    <FieldLabel
                      title="Prompt length"
                      description="How detailed should the generated prompt be?"
                    />
                    <select
                      name="outputLength"
                      value={form.outputLength}
                      onChange={handleChange}
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
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
                    <FieldLabel
                      title="Platform"
                      description="Where will this prompt be used?"
                    />
                    <select
                      name="platform"
                      value={form.platform}
                      onChange={handleChange}
                      className="w-full rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
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
                      title="Key details"
                      description="Bullet-like shorthand is fine. List the facts, constraints, offers, or must-haves."
                    />
                    <textarea
                      name="keyPoints"
                      value={form.keyPoints}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Launch date, eco-friendly packaging, premium positioning, free shipping"
                      className="w-full resize-none rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel
                      title="Extra notes"
                      description="Anything special the AI should know about voice, format, restrictions, or goals."
                    />
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Avoid jargon, emphasize trust, include a call to action, keep the language clear and human"
                      className="w-full resize-none rounded-[1.35rem] border border-transparent bg-[#fffdf8] px-5 py-4 text-sm leading-6 text-ink outline-none transition placeholder:text-muted focus:border-[rgba(178,74,47,0.35)] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-muted">{formSummary}</p>

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
                    What this adds
                  </p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
                    <p>
                      More context means the generated prompt can sound less
                      generic and more on target.
                    </p>
                    <p>
                      Business name, task, audience, tone, platform, and key
                      details give the AI a better map before it writes.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-[color:theme(--color-border)] bg-white/75 p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    Core idea
                  </p>
                  <p className="mt-3 max-w-sm text-2xl font-black leading-tight text-ink">
                    One loose idea.
                    <span className="block text-accent">
                      One guided prompt.
                    </span>
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
