import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ArrowRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/hirek")({
  head: () => ({
    meta: [
      { title: "Hírek – Driving Zone" },
      { name: "description", content: "Legfrissebb híreink és bejegyzéseink." },
      { property: "og:title", content: "Hírek – Driving Zone" },
      { property: "og:description", content: "Nézd meg legfrissebb híreinket." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hírek"
        title="Friss hírek | Driving Zone"
        intro="Értesüljön legújabb információinkról, változásainkról és fontos újdonságainkról."
      />
      <Section>
        <div className="max-w-2xl mx-auto">
          <article className="card-lift rounded-3xl border border-border bg-card p-10 md:p-14 text-center">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand">
              <Newspaper className="size-6" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-ink">Ujdonságok</h2>
            <p className="mt-4 text-muted-foreground">
              Itt találja legfrissebb híreinket és az aktuális információkat.
            </p>
            <a
              href="https://maszol.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand mt-8"
            >
              Hírfolyam <ArrowRight className="size-4" />
            </a>
          </article>
        </div>
      </Section>
    </>
  );
}
