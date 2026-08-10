# Reykjavík Classics — Tailwind + Prismic CMS

A small two-page responsive marketing site for a fictional classic-film festival, built with **Next.js 15 (App Router)**, **Tailwind CSS**, and the **Prismic** headless CMS.

Submitted for two Module 5 guides:

- _HTML & CSS — Tooling/Tailwind_
- _Speciality guide — Prismic CMS_

## Prismic CMS

The **home page** (`/`) is content-managed in Prismic. The **schedule page** (`/schedule`) is intentionally left as hard-coded content so the difference between "own DB" and "CMS" is easy to see side-by-side.

### Setup

The repo is already linked to a Prismic repository via `prismic.config.json`. To point at your own repo instead:

```bash
npx prismic login
npx prismic init            # or: --repo <existing-repo-name>
npx prismic push            # push local models to Prismic
```

### Content model (created via the Prismic CLI, not hand-edited JSON)

- **`Homepage`** — a `single` page type with a slice zone.
- **`Hero` slice** — fields: `eyebrow` (text), `title` (rich text), `description` (rich text), `cta_label` (text), `cta_link` (link).
- **`FeatureList` slice** — fields: `heading` (rich text) + a repeatable `items` group with `icon`, `title`, `body`.

All models were added with commands like:

```bash
npx prismic type create Homepage --format page --single
npx prismic slice create Hero
npx prismic field add rich-text title --to-slice hero --label "Title"
npx prismic slice connect hero --to homepage
npx prismic push
```

### Editing content

1. Open <https://prismic.io/dashboard> and pick the repository.
2. Create a **Homepage** document, add a Hero slice and a FeatureList slice, fill them in, then click **Publish**.
3. Reload the local site — `createClient()` fetches the published content on the server.

### CMS vs. own database — what I learned

- **Own DB (Postgres / MongoDB projects earlier in this module)**: I write the schema, the API routes, the admin UI. Total control, but every content change is a code change or a raw SQL/Mongo write.
- **Headless CMS (Prismic)**: the schema lives in the CMS, editors get a polished admin UI for free, and the app just consumes an API. I don't need to build a login, a rich-text editor, or an image uploader — Prismic provides them.
- **"Headless" means** the CMS has no opinion about the front-end. It just serves content over an API; my Next.js app decides how to render it. That's why the same Prismic content could feed a website, an iOS app, and an email template.
- **Trade-off**: I lose some flexibility. Complex relational queries (like joins across many types) are awkward. And I'm dependent on a third-party service being up.

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
