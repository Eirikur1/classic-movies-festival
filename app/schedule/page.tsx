import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule — Reykjavík Classics",
};

// Screening data grouped by day. In a real app this would come from a CMS.
const days = [
  {
    label: "Friday · March 14",
    theme: "Opening night — Hollywood's Golden Age",
    films: [
      { time: "18:00", title: "Sunset Boulevard", year: 1950, runtime: "110 min" },
      { time: "20:00", title: "Casablanca", year: 1942, runtime: "102 min" },
      { time: "22:15", title: "Double Indemnity", year: 1944, runtime: "107 min" },
    ],
  },
  {
    label: "Saturday · March 15",
    theme: "World cinema",
    films: [
      { time: "14:00", title: "Bicycle Thieves", year: 1948, runtime: "89 min" },
      { time: "16:30", title: "Seven Samurai", year: 1954, runtime: "207 min" },
      { time: "20:30", title: "The 400 Blows", year: 1959, runtime: "99 min" },
      { time: "22:30", title: "Persona", year: 1966, runtime: "83 min" },
    ],
  },
  {
    label: "Sunday · March 16",
    theme: "New Hollywood & closing gala",
    films: [
      { time: "14:00", title: "Chinatown", year: 1974, runtime: "130 min" },
      { time: "17:00", title: "Taxi Driver", year: 1976, runtime: "114 min" },
      { time: "19:30", title: "The Godfather", year: 1972, runtime: "175 min" },
      { time: "22:30", title: "2001: A Space Odyssey", year: 1968, runtime: "149 min" },
      { time: "01:00", title: "Vertigo (closing)", year: 1958, runtime: "128 min" },
    ],
  },
];

export default function SchedulePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cinema-gold">
        Full lineup
      </p>
      <h1 className="mt-4 font-display text-4xl font-black md:text-5xl">
        Twelve films, three nights
      </h1>
      <p className="mt-4 max-w-2xl text-white/70">
        All screenings are held at Bíó Paradís. Doors open 30 minutes before
        each show. Seats for the Weekend Pass are reserved; single tickets are
        general admission.
      </p>

      {/* Each day gets a card. `space-y-*` gives consistent vertical rhythm
          between the day blocks without a manual margin on each. */}
      <div className="mt-12 space-y-12">
        {days.map((day) => (
          <article key={day.label}>
            <header className="border-b border-white/10 pb-3">
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                {day.label}
              </h2>
              <p className="text-cinema-gold">{day.theme}</p>
            </header>

            {/* Screening list — flexbox rows that gracefully wrap on mobile. */}
            <ul className="mt-4 divide-y divide-white/10">
              {day.films.map((f) => (
                <li
                  key={f.title}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div className="flex items-baseline gap-4">
                    {/* Fixed-width time column so titles line up neatly. */}
                    <span className="w-16 font-mono text-cinema-rose">
                      {f.time}
                    </span>
                    <span className="text-lg font-semibold">{f.title}</span>
                  </div>
                  <span className="pl-20 text-sm text-white/60 sm:pl-0">
                    {f.year} · {f.runtime}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
