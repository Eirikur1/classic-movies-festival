# Reykjavík Classics — a Tailwind CSS marketing site

A small two-page responsive marketing site for a fictional classic-film festival, built with **Next.js 15 (App Router)** and **Tailwind CSS**.

Submitted for _HTML & CSS — Tooling/Tailwind_ in Module 5.

## Pages / layouts

1. **Home (`/`)** — hero, feature grid, ticket / passes pricing block
2. **Schedule (`/schedule`)** — a text-forward, structured lineup grouped by day

Both pages share a `Nav` and `Footer` from `app/components/`, rendered from `app/layout.tsx`.

## Running it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## The UI framework: Tailwind CSS

### How it's set up

- `tailwind.config.ts` — scans `app/**/*.{ts,tsx}`, extends the default palette with a small `cinema.*` set of brand colours, and registers a Playfair Display display font.
- `postcss.config.js` — wires Tailwind and Autoprefixer into the PostCSS pipeline that Next.js runs.
- `app/globals.css` — three `@tailwind` directives (base / components / utilities) plus a single `@import` for Google Fonts. That's all the hand-written CSS in the project.

### How it was used

Every layout decision — grids, spacing, typography, colour, breakpoints, hover states, transitions — is expressed with utility classes directly in JSX. There is **no separate stylesheet per component**. Responsive design uses the built-in breakpoint prefixes: `sm:`, `md:`, `lg:`. For example on the home hero:

```tsx
<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-32">
```

- `grid` + `md:grid-cols-2` — one column on mobile, two on tablets and up.
- `max-w-6xl` + `mx-auto` — centered content column, capped width.
- `px-4 md:px-8` and `py-20 md:py-32` — smaller padding on mobile, larger on desktop.

The custom colours from the config surface as `bg-cinema-bg`, `text-cinema-gold`, `bg-cinema-rose`, etc.

### What made development easier

- **No context-switching between HTML and CSS files.** Style lives with markup, so changing a colour or breakpoint is one edit.
- **Design tokens are enforced.** The spacing (`px-4`, `gap-10`) and colour scales (`cinema-gold`, `white/70`) are consistent by default — hard to drift.
- **Responsive design is built in.** No need to write `@media` queries — `md:grid-cols-2` is enough.
- **Zero unused CSS in production.** Tailwind's content scan means only the classes I actually typed ship to the browser.
- **Hover / focus / transition states are one-liners** (`transition hover:-translate-y-1`).

### What was more complicated

- **Class strings get long.** A visually rich element can end up with 10+ utility classes on a line. Readability suffers if you don't break lines or extract components.
- **Onboarding cost.** You need to know Tailwind's naming conventions (`justify-between`, `tracking-widest`, `divide-y`) to be productive — it's a vocabulary.
- **Custom design tokens still need to live somewhere.** For the brand palette I still had to edit `tailwind.config.ts`; utility classes alone can't create new colours.
- **Global styles feel awkward.** Anything genuinely global (Google Font import, base body colour) still needs `globals.css` or the root layout — Tailwind doesn't remove the concept of global CSS, just minimises it.

### The tradeoff, summarised

Tailwind pushes styling into the same file as the markup and gives you a strict design system for free. For a small marketing site like this, that's mostly a win: 2 pages, ~250 lines of JSX, no `.css` files to manage. On a larger app you'd start reaching for component extraction (or a component library like shadcn/ui) to keep the utility soup manageable.

## Project structure

```
app/
├── components/
│   ├── Footer.tsx        # site footer used on every page
│   └── Nav.tsx           # top nav used on every page
├── schedule/
│   └── page.tsx          # /schedule — festival lineup
├── globals.css           # Tailwind directives + one font import
├── layout.tsx            # root layout, mounts Nav + Footer
└── page.tsx              # / — landing page (hero, features, tickets)
tailwind.config.ts        # Tailwind config with custom cinema.* palette
postcss.config.js         # Tailwind + Autoprefixer
```
