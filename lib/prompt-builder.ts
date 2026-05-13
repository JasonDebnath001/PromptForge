export type PromptInput = {
  taskType: string;
  topic: string;
  audience: string;
  tone: string;
  model: string;
  outputFormat: string;
  constraints: string;
  extraNotes: string;
};

export function buildPrompt(input: PromptInput) {
  const {
    taskType,
    topic,
    audience,
    tone,
    model,
    outputFormat,
    constraints,
    extraNotes,
  } = input;

  // Sanitize inputs
  const sanitized = {
    taskType: taskType.trim() || "general task",
    topic: topic.trim() || "general topic",
    audience: audience.trim(),
    tone: tone.trim() || "neutral",
    model: model.trim(),
    outputFormat: outputFormat.trim(),
    constraints: constraints.trim(),
    extraNotes: extraNotes.trim(),
  };

  const parts: string[] = [];

  if (sanitized.taskType === "Image generation") {
    parts.push(`Create a high-quality AI image prompt for ${sanitized.topic}.`);

    parts.push(`Style and tone:
- ${sanitized.tone}
- visually refined
- cinematic composition`);

    if (sanitized.audience) {
      parts.push(`Audience:
${sanitized.audience}`);
    }

    if (sanitized.constraints) {
      parts.push(`Requirements:
${sanitized.constraints}`);
    }

    if (sanitized.extraNotes) {
      parts.push(`Additional direction:
${sanitized.extraNotes}`);
    }

    if (sanitized.model) {
      parts.push(`Optimize the prompt for ${sanitized.model}.`);
    }

    if (sanitized.outputFormat) {
      parts.push(`Output format:
${sanitized.outputFormat}`);
    }

    return parts.join("\n\n").trim();
  }

  if (sanitized.taskType === "Presentation") {
    parts.push(`Create a presentation prompt about ${sanitized.topic}.`);

    if (sanitized.audience) {
      parts.push(`Audience:
${sanitized.audience}`);
    }

    if (sanitized.tone) {
      parts.push(`Tone:
${sanitized.tone}`);
    }

    if (sanitized.constraints) {
      parts.push(`Requirements:
${sanitized.constraints}`);
    }

    if (sanitized.extraNotes) {
      parts.push(`Additional notes:
${sanitized.extraNotes}`);
    }

    if (sanitized.model) {
      parts.push(
        `Optimize this for ${sanitized.model} and structure it clearly for slide generation.`,
      );
    }

    return parts.join("\n\n").trim();
  }

  if (sanitized.taskType === "Writing") {
    parts.push(`Write a prompt for ${sanitized.topic}.`);

    if (sanitized.audience) {
      parts.push(`Audience:
${sanitized.audience}`);
    }

    if (sanitized.tone) {
      parts.push(`Tone:
${sanitized.tone}`);
    }

    if (sanitized.constraints) {
      parts.push(`Requirements:
${sanitized.constraints}`);
    }

    if (sanitized.extraNotes) {
      parts.push(`Additional context:
${sanitized.extraNotes}`);
    }

    if (sanitized.model) {
      parts.push(
        `Make the output natural, specific, and optimized for ${sanitized.model}.`,
      );
    }

    return parts.join("\n\n").trim();
  }

  // Default branch
  parts.push(
    `Create a ${sanitized.taskType.toLowerCase()} prompt for ${sanitized.topic}.`,
  );

  if (sanitized.audience) {
    parts.push(`Audience:
${sanitized.audience}`);
  }

  if (sanitized.tone) {
    parts.push(`Tone:
${sanitized.tone}`);
  }

  if (sanitized.constraints) {
    parts.push(`Requirements:
${sanitized.constraints}`);
  }

  if (sanitized.extraNotes) {
    parts.push(`Additional notes:
${sanitized.extraNotes}`);
  }

  if (sanitized.model) {
    parts.push(`Optimize for ${sanitized.model}.`);
  }

  return parts.join("\n\n").trim();
}
