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
          {Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="flex gap-1 text-brand mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-ink leading-relaxed">„[Vélemény szövege {i + 1}]"</p>
              <div className="mt-6 flex items-center gap-3">
                <ImagePlaceholder label="" className="h-12 w-12 rounded-full aspect-square shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-ink">[Név]</div>
                  <div className="text-xs text-muted-foreground">[Év]</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
