import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";

export const Route = createFileRoute("/velemenyek")({
  head: () => ({
    meta: [
      { title: "Vélemények – Driving Zone" },
      { name: "description", content: "Diákjaink véleményei rólunk." },
      { property: "og:title", content: "Vélemények – Driving Zone" },
      { property: "og:description", content: "Olvasd el, mit mondanak rólunk diákjaink." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  {
    name: "Menyhárt Ákos",
    age: "18 éves",
    text: "Nagyon türelmes oktatót kaptam, minden órán éreztem, hogy biztos kezekben vagyok, és sikerült magabiztosan levizsgáznom.",
  },
  {
    name: "Dudás Nóra",
    age: "19 éeves",
    text: "Nagyon pozitív élmény volt a tanulás, az oktatás során mindig kaptam hasznos tanázatokat és segítséget:)",
  },
  {
    name: "Barabás Csongi",
    age: "18 éves",
    text: "Rugalmas időpontokkal és jó hangulatú órákkal segítettek abban, hogy könnyebben elsajátítsam a vezetés alapjait.",
  },
  {
    name: "[Név]",
    age: "[Év]",
    text: "[Vélemény szövege]",
  },
  {
    name: "[Név]",
    age: "[Év]",
    text: "[Vélemény szövege]",
  },
  {
    name: "[Név]",
    age: "[Év]",
    text: "[Vélemény szövege]",
  },
];

function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vélemények"
        title="Ügyfeleink mondták | Driving Zone"
        intro="Valódi vélemények azoktól, akik már minket választottak."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <article key={i} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="flex gap-1 text-brand mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-ink leading-relaxed">{review.text}</p>
              <div className="mt-6">
                <div className="text-sm font-semibold text-ink">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.age}</div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
