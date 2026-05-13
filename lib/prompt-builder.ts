type PromptInput = {
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

  if (taskType === "Image generation") {
    return `
Create a high-quality AI image prompt for ${topic}.

Style and tone:
- ${tone}
- visually refined
- cinematic composition

Audience:
${audience}

Requirements:
${constraints}

Additional direction:
${extraNotes}

Optimize the prompt for ${model}.

Output format:
${outputFormat}
`.trim();
  }

  if (taskType === "Presentation") {
    return `
Create a presentation prompt about ${topic}.

Audience:
${audience}

Tone:
${tone}

Requirements:
${constraints}

Additional notes:
${extraNotes}

Optimize this for ${model} and structure it clearly for slide generation.
`.trim();
  }

  if (taskType === "Writing") {
    return `
Write a prompt for ${topic}.

Audience:
${audience}

Tone:
${tone}

Requirements:
${constraints}

Additional context:
${extraNotes}

Make the output natural, specific, and optimized for ${model}.
`.trim();
  }

  return `
Create a ${taskType.toLowerCase()} prompt for ${topic}.

Audience:
${audience}

Tone:
${tone}

Requirements:
${constraints}

Additional notes:
${extraNotes}

Optimize for ${model}.
`.trim();
}