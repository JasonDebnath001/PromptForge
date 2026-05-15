export type PromptMode = "simple" | "business";

export type PromptInput = {
  mode: PromptMode;
  topic: string;
  businessName: string;
  businessType: string;
  promptType: string;
  task: string;
  audience: string;
  goal: string;
  tone: string;
  context: string;
  constraints: string;
  outputFormat: string;
  extraNotes: string;
};

function clean(value: string) {
  return value.trim();
}

function addSection(parts: string[], heading: string, value: string) {
  const trimmed = clean(value);
  if (!trimmed) return;
  parts.push(`${heading}:\n${trimmed}`);
}

export function buildPrompt(input: PromptInput) {
  const sanitized: PromptInput = {
    mode: input.mode === "business" ? "business" : "simple",
    topic: clean(input.topic) || "general topic",
    businessName: clean(input.businessName),
    businessType: clean(input.businessType),
    promptType: clean(input.promptType) || "general prompt",
    task: clean(input.task) || clean(input.topic) || "general task",
    audience: clean(input.audience),
    goal: clean(input.goal),
    tone: clean(input.tone) || "clear and useful",
    context: clean(input.context),
    constraints: clean(input.constraints),
    outputFormat: clean(input.outputFormat),
    extraNotes: clean(input.extraNotes),
  };

  const parts: string[] = [];

  if (sanitized.mode === "business") {
    parts.push(
      `Create a polished ${sanitized.promptType.toLowerCase()} prompt for ${sanitized.businessName || "a business"}.`,
    );
    parts.push(
      `Use a ${sanitized.tone} tone and make the prompt detailed enough that the AI understands the brand context, the task, the audience, and the desired result without needing follow-up questions.`,
    );

    addSection(parts, "Business name", sanitized.businessName);
    addSection(parts, "Business type", sanitized.businessType);
    addSection(parts, "Primary task", sanitized.task);
    addSection(parts, "Audience", sanitized.audience);
    addSection(parts, "Goal", sanitized.goal);
    addSection(parts, "Context", sanitized.context);
    addSection(parts, "Constraints", sanitized.constraints);
    addSection(parts, "Output format", sanitized.outputFormat);
    addSection(parts, "Additional notes", sanitized.extraNotes);

    parts.push(
      "Write the final prompt so it is ready to paste into an AI tool, with enough specificity to produce a strong first draft.",
    );

    return parts.join("\n\n").trim();
  }

  parts.push(
    `Create a detailed AI prompt for ${sanitized.topic}. The result should be slightly more specific than a bare request, but still easy to paste into an AI tool.`,
  );
  parts.push(
    `Use a ${sanitized.tone} tone and include the useful context, expected outcome, and any important constraints so the prompt feels complete without becoming bloated.`,
  );

  addSection(parts, "Task", sanitized.task);
  addSection(parts, "Audience", sanitized.audience);
  addSection(parts, "Goal", sanitized.goal);
  addSection(parts, "Context", sanitized.context);
  addSection(parts, "Constraints", sanitized.constraints);
  addSection(parts, "Output format", sanitized.outputFormat);
  addSection(parts, "Additional notes", sanitized.extraNotes);

  parts.push(
    "Return only the final prompt text. Make it practical, specific, and ready to use immediately.",
  );

  return parts.join("\n\n").trim();
}
