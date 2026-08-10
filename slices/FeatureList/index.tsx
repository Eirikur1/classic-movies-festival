import type { FC } from "react";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type FeatureListProps = SliceComponentProps<Content.FeatureListSlice>;

// Renders a section heading (rich text) and a responsive grid of feature cards.
// The features themselves come from a Prismic "group" field (repeatable).
const FeatureList: FC<FeatureListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-6xl px-4 py-20 md:px-8"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {children}
            </h2>
          ),
        }}
      />

      {/* Prismic group fields come through as an array we can .map(). */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {slice.primary.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-cinema-panel p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <PrismicRichText
              field={item.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-2 text-white/70">{children}</p>
                ),
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureList;
