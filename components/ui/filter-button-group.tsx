type FilterButtonGroupProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function FilterButtonGroup({
  label,
  options,
  value,
  onChange,
}: FilterButtonGroupProps) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-pressed={value === item}
            className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
              value === item
                ? "bg-ink text-surface"
                : "border border-[color:theme(--color-border)] bg-white text-muted hover:bg-black/5"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
