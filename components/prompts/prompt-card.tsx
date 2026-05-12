import Link from "next/link";

type PromptCardProps = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tone: string;
  tool: string;
  tags: string[];
};

export function PromptCard({
  slug,
  title,
  category,
  summary,
  tone,
  tool,
  tags,
}: PromptCardProps) {
  return (
    <article className="paper-card group rounded-[2rem] p-5 transition duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {category}
          </p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-ink">
            {title}
          </h3>
        </div>

        <span className="rounded-full border border-[color:theme(--color-border)] bg-white px-3 py-1 text-xs font-medium text-muted">
          {tone}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded-full border border-[color:theme(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[color:theme(--color-border)] pt-4">
        <p className="text-xs text-muted">{tool}</p>

        <Link
          href={`/discover/${slug ? encodeURIComponent(slug) : ""}`}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-surface transition hover:opacity-90"
        >
          View prompt
        </Link>
      </div>
    </article>
  );
}
