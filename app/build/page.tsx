"use client";

import { useState } from "react";
import { buildPrompt } from "@/lib/prompt-builder";
import { Navbar } from "@/components/layout/Navbar";
import { Copy, Sparkles, Wand2, RotateCcw, Check } from "lucide-react";

const tones = [
  "Precise",
  "Friendly",
  "Professional",
  "Punchy",
  "Creative",
  "Technical",
];

const taskTypes = [
  "Image generation",
  "Image editing",
  "Presentation",
  "Writing",
  "Coding",
  "Study",
];

const models = ["GPT-5", "Claude", "Gemini", "Midjourney", "Flux", "DALL·E"];

const outputFormats = [
  "Single prompt",
  "Prompt + examples",
  "Step-by-step workflow",
  "Structured bullet format",
];

export default function BuildPage() {
  const [taskType, setTaskType] = useState("Image generation");
  const [topic, setTopic] = useState("a premium smartwatch product shot");
  const [audience, setAudience] = useState("creative professionals");
  const [tone, setTone] = useState("Precise");
  const [model, setModel] = useState("GPT-5");
  const [outputFormat, setOutputFormat] = useState("Single prompt");
  const [constraints, setConstraints] = useState(
    "Keep it realistic, polished, and suitable for a high-end brand.",
  );
  const [extraNotes, setExtraNotes] = useState(
    "Use warm studio lighting and leave space for the subject to breathe.",
  );

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePrompt = async () => {
    try {
      setIsGenerating(true);
      setCopySuccess(false);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const result = buildPrompt({
        taskType,
        topic,
        audience,
        tone,
        model,
        outputFormat,
        constraints,
        extraNotes,
      });

      setGeneratedPrompt(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);

      window.setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTaskType("Image generation");
    setTopic("a premium smartwatch product shot");
    setAudience("creative professionals");
    setTone("Precise");
    setModel("GPT-5");
    setOutputFormat("Single prompt");
    setConstraints(
      "Keep it realistic, polished, and suitable for a high-end brand.",
    );
    setExtraNotes(
      "Use warm studio lighting and leave space for the subject to breathe.",
    );
    setGeneratedPrompt("");
    setCopySuccess(false);
  };

  return (
    <>
      <Navbar />

      <main className="noise">
        <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
          <div className="mb-6 border-b border-border pb-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              Prompt workshop
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Build
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Shape a prompt using structured inputs, then generate a tailored
              version when you are ready. This is the part where the app starts
              doing useful work.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:gap-8">
            <div className="paper-card rounded-[2rem] p-5 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                  Prompt inputs
                </p>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field label="Task type">
                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                  >
                    {taskTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Model / Tool">
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                  >
                    {models.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Tone">
                  <div className="flex flex-wrap gap-2">
                    {tones.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTone(item)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                          tone === item
                            ? "bg-ink text-surface"
                            : "border border-border bg-white text-muted hover:bg-black/5"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Output format">
                  <div className="flex flex-wrap gap-2">
                    {outputFormats.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setOutputFormat(item)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                          outputFormat === item
                            ? "bg-ink text-surface"
                            : "border border-border bg-white text-muted hover:bg-black/5"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5 grid gap-5">
                <Field label="Topic">
                  <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent"
                    placeholder="What do you want the prompt to be about?"
                  />
                </Field>

                <Field label="Audience">
                  <input
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent"
                    placeholder="Who is the output for?"
                  />
                </Field>

                <Field label="Constraints">
                  <textarea
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent"
                    placeholder="Any limits or rules?"
                  />
                </Field>

                <Field label="Extra notes">
                  <textarea
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent"
                    placeholder="Add useful context here"
                  />
                </Field>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={generatePrompt}
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Prompt"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-black/5"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            <aside className="order-first space-y-4 xl:order-last xl:sticky xl:top-24 xl:self-start">
              <div className="paper-card rounded-[2rem] p-5 sm:p-6 lg:p-7">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                    Generated prompt
                  </p>
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-border bg-[#fffdf8] p-5">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                          Live output
                        </p>
                        <h3 className="mt-1 text-lg font-black text-ink">
                          Prompt preview
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={copyPrompt}
                        disabled={!generatedPrompt}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-surface transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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

                    <div className="rounded-[1.5rem] border border-border bg-[#fffdf8] p-5">
                      {generatedPrompt ? (
                        <p className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-ink">
                          {generatedPrompt}
                        </p>
                      ) : (
                        <div className="flex min-h-[220px] items-center justify-center rounded-[1.25rem] border border-dashed border-border bg-white/40 p-6 text-center">
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              No prompt generated yet
                            </p>
                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                              Fill out the inputs on the left and generate a
                              tailored prompt.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
