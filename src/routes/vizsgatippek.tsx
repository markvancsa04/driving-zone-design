import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { BookOpen, Car } from "lucide-react";

export const Route = createFileRoute("/vizsgatippek")({
  head: () => ({
    meta: [
      { title: "Vizsgatippek – Driving Zone" },
      { name: "description", content: "Hasznos tanácsok az elméleti és gyakorlati vizsgához." },
      { property: "og:title", content: "Vizsgatippek – Driving Zone" },
      { property: "og:description", content: "Gyakorlati és elméleti vizsgatippek diákjainknak." },
    ],
  }),
  component: TipsPage,
});

function TipsPage() {
  return (
    <>
      <PageHeader eyebrow="Vizsgatippek" title="[Hasznos tippek – főcím]" intro="[Rövid bevezető]" />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <TipsGroup icon={<BookOpen className="size-5" />} title="[Elméleti tippek]" count={5} />
          <TipsGroup icon={<Car className="size-5" />} title="[Gyakorlati tippek]" count={8} />
        </div>
      </Section>
    </>
  );
}

function TipsGroup({ icon, title, count }: { icon: React.ReactNode; title: string; count: number }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-2xl bg-brand-soft grid place-items-center text-brand">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <article
            key={i}
            className="card-lift rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl font-semibold text-brand shrink-0 w-8">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">[Tipp {i + 1} címe]</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  [Tipp {i + 1} rövid leírása]
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
