import Link from "next/link";

// Shared top navigation. Rendered from the root layout so every page
// gets it without duplication. `md:` prefixes turn the mobile hamburger-free
// stacked layout into a horizontal bar on tablets and up.
export function Nav() {
  return (
    <header className="border-b border-white/10 bg-cinema-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-black tracking-wide text-cinema-gold md:text-2xl"
        >
          Reykjavík Classics
        </Link>

        {/* Simple text menu — Tailwind's `gap-*` + `md:gap-*` give us
            different spacing at different breakpoints without media queries. */}
        <ul className="flex items-center gap-4 text-sm md:gap-8 md:text-base">
          <li>
            <Link href="/" className="text-white/80 transition hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/schedule"
              className="text-white/80 transition hover:text-white"
            >
              Schedule
            </Link>
          </li>
          <li>
            <a
              href="#tickets"
              className="rounded-full bg-cinema-rose px-4 py-2 font-semibold text-white shadow-md transition hover:bg-cinema-rose/90"
            >
              Tickets
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
