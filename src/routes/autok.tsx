import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";

export const Route = createFileRoute("/autok")({
  head: () => ({
    meta: [
      { title: "Autópark – Driving Zone" },
      { name: "description", content: "Modern, kényelmes és biztonságos oktatóautóink." },
      { property: "og:title", content: "Autópark – Driving Zone" },
      { property: "og:description", content: "Fedezd fel modern autóflottánkat." },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Autópark"
        title="[Modern flottánk – főcím]"
        intro="[Rövid szöveg az autókról]"
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label={`[Autó ${i} fotó]`}
                className="aspect-[16/10] rounded-none border-0 border-b border-border"
              />
              <div className="p-8 md:p-10">
                <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                  [Évjárat]
                </div>
                <h3 className="mt-2 text-3xl font-semibold text-ink">[Autó modell]</h3>
                <p className="mt-4 text-base text-muted-foreground">
                  [Rövid leírás az autóról – 2–3 mondat]
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
