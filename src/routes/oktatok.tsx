import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import instructorImageAsset from "@/assets/instructor-fleet.jpg.asset.json";

export const Route = createFileRoute("/oktatok")({
  head: () => ({
    meta: [
      { title: "Oktatók – Driving Zone" },
      { name: "description", content: "Ismerd meg tapasztalt oktatóinkat." },
      { property: "og:title", content: "Oktatók – Driving Zone" },
      { property: "og:description", content: "Türelmes, tapasztalt oktatók egyénre szabott figyelemmel." },
    ],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Oktatók"
        title="[Csapatunk – főcím]"
        intro="[Rövid bemutatkozás az oktatókról]"
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <article key={i} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label={`[Oktató ${i} fotó]`}
                className="aspect-[4/5] rounded-none border-0 border-b border-border"
              />
              <div className="p-8">
                <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                  [Szerepkör]
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-ink">[Oktató neve]</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  [Rövid bemutatkozás – 2–3 mondat]
                </p>
                <button className="mt-6 text-sm font-semibold text-brand hover:underline">
                  További információ →
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
