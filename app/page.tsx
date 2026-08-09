import Link from "next/link";

// Home page — a marketing landing page for the festival.
// Every layout decision below is done with Tailwind utility classes; there
// is no hand-written CSS in this file.
export default function HomePage() {
  return (
    <>
      {/* --- HERO ---------------------------------------------------------
          `min-h-[80vh]` gives a big, cinematic hero on desktop. The `bg-*`
          gradient adds mood without needing an actual image asset.
          Layout switches from single-column on mobile to two columns at md.
      ------------------------------------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-cinema-bg via-[#1a0f1f] to-[#241328]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-32">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cinema-gold">
              March 14 – 16 · Bíó Paradís
            </p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight text-white md:text-6xl">
              Three nights.
              <br />
              <span className="text-cinema-rose">Twelve classics.</span>
              <br />
              One festival.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              Reykjavík Classics brings the greatest restored films of the 20th
              century back to the big screen — projected on 35mm, in the room
              they were meant to be seen in.
            </p>

            {/* CTA row — `flex-col sm:flex-row` stacks on tiny screens,
                lays out horizontally at 640px+. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/schedule"
                className="rounded-full bg-cinema-rose px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-cinema-rose/90"
              >
                See the schedule
              </Link>
              <a
                href="#tickets"
                className="rounded-full border border-white/30 px-6 py-3 text-center font-semibold text-white/90 transition hover:bg-white/10"
              >
                Buy passes
              </a>
            </div>
          </div>

          {/* Decorative "poster" tile — pure Tailwind, no image needed.
              `aspect-[2/3]` keeps a classic movie-poster ratio. */}
          <div className="relative hidden md:block">
            <div className="mx-auto aspect-[2/3] w-full max-w-sm rotate-3 rounded-lg bg-gradient-to-br from-cinema-gold via-cinema-rose to-purple-700 p-1 shadow-2xl">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-cinema-bg p-8 text-center">
                <p className="font-display text-xs uppercase tracking-widest text-cinema-gold">
                  Opening Night
                </p>
                <p className="mt-6 font-display text-3xl font-black">
                  Casablanca
                </p>
                <p className="mt-2 text-sm text-white/60">1942 · 35mm print</p>
                <p className="mt-auto text-xs text-white/40">
                  Friday · 20:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID -------------------------------------------------
          `grid-cols-1 md:grid-cols-3` — the go-to responsive card grid.
      ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Why come?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-cinema-panel p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TICKETS ------------------------------------------------------
          Simple 2-column pricing on md+, single column stacked on mobile.
      ------------------------------------------------------------------ */}
      <section id="tickets" className="bg-cinema-panel/50">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Passes
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {passes.map((p) => (
              <div
                key={p.name}
                className="flex flex-col rounded-xl border border-white/10 bg-cinema-bg p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cinema-gold">
                  {p.name}
                </p>
                <p className="mt-4 font-display text-4xl font-black">
                  {p.price}
                </p>
                <ul className="mt-6 space-y-2 text-white/70">
                  {p.perks.map((perk) => (
                    <li key={perk}>· {perk}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-auto rounded-full bg-cinema-rose py-3 font-semibold text-white transition hover:bg-cinema-rose/90"
                >
                  Buy {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Data lives at the bottom of the file so JSX above reads top-to-bottom.
const features = [
  {
    icon: "🎞️",
    title: "35mm projection",
    body: "Every film is screened from an original or archival 35mm print.",
  },
  {
    icon: "🎙️",
    title: "Curator Q&As",
    body: "Live introductions and Q&As with critics and archivists after every screening.",
  },
  {
    icon: "🍷",
    title: "Late-night bar",
    body: "The lobby stays open until 02:00 with themed cocktails and vinyl DJs.",
  },
];

const passes = [
  {
    name: "Weekend Pass",
    price: "9 900 ISK",
    perks: [
      "Entry to all 12 screenings",
      "Reserved seating",
      "Festival tote & program",
    ],
  },
  {
    name: "Single Ticket",
    price: "1 800 ISK",
    perks: [
      "Entry to any one screening",
      "General admission seating",
    ],
  },
];
