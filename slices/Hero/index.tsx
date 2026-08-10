import type { FC } from "react";
import type { Content } from "@prismicio/client";
import { PrismicLink, PrismicRichText, type SliceComponentProps } from "@prismicio/react";

// Prismic passes the content of one Hero slice as `slice` — its shape comes
// from the model.json we defined via `prismic field add`, which the CLI
// compiles into the TypeScript types in prismicio-types.d.ts.
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate overflow-hidden bg-gradient-to-br from-cinema-bg via-[#1a0f1f] to-[#241328]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-32">
        <div className="flex flex-col justify-center">
          {/* Simple text field — rendered as a plain string. */}
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cinema-gold">
            {slice.primary.eyebrow}
          </p>

          {/* Rich-text field — PrismicRichText renders the structured content
              from Prismic into HTML. We map heading1 to our display font. */}
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="mt-4 font-display text-4xl font-black leading-tight text-white md:text-6xl">
                  {children}
                </h1>
              ),
              strong: ({ children }) => (
                <span className="text-cinema-rose">{children}</span>
              ),
            }}
          />

          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mt-6 max-w-lg text-lg text-white/70">{children}</p>
              ),
            }}
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* PrismicLink handles both internal Prismic docs and external URLs. */}
            <PrismicLink
              field={slice.primary.cta_link}
              className="rounded-full bg-cinema-rose px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-cinema-rose/90"
            >
              {slice.primary.cta_label || "Learn more"}
            </PrismicLink>
          </div>
        </div>

        {/* Decorative poster tile — kept as static markup for now. */}
        <div className="relative hidden md:block">
          <div className="mx-auto aspect-[2/3] w-full max-w-sm rotate-3 rounded-lg bg-gradient-to-br from-cinema-gold via-cinema-rose to-purple-700 p-1 shadow-2xl">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-cinema-bg p-8 text-center">
              <p className="font-display text-xs uppercase tracking-widest text-cinema-gold">
                Opening Night
              </p>
              <p className="mt-6 font-display text-3xl font-black">Casablanca</p>
              <p className="mt-2 text-sm text-white/60">1942 · 35mm print</p>
              <p className="mt-auto text-xs text-white/40">Friday · 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
