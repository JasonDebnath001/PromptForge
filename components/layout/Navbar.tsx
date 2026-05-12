import Link from "next/link";

const links = [
  { href: "/discover", label: "Discover" },
  { href: "/build", label: "Build" },
  { href: "/collections", label: "Collections" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:theme(--color-border)] bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[color:theme(--color-border)] bg-surface shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-muted uppercase">
              PromptForge
            </p>
            <p className="text-sm text-muted">Human-made prompt systems</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-black/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
