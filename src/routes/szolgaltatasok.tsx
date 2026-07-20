import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";

import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/szolgaltatasok")({
  head: () => ({
    meta: [
      { title: "Szolgáltatások és árak – Driving Zone" },
      { name: "description", content: "Járművezetői tanfolyam, gyakorló órák, jogosítványcsere és további szolgáltatások." },
      { property: "og:title", content: "Szolgáltatások – Driving Zone" },
      { property: "og:description", content: "Nézd meg szolgáltatásainkat és aktuális árainkat." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Szolgáltatások"
        title="Szolgáltatásaink – Driving Zone"
        intro="Nálunk mindent egy helyen elintézhetsz, ami a járművezetéssel és a jogosítvánnyal kapcsolatos.&nbsp;"
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <article key={i} className="card-lift rounded-3xl bg-card border border-border p-8 flex flex-col">
              <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                [Kategória]
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-ink">
                [Szolgáltatás címe]
              </h3>
              <p className="mt-3 text-sm text-muted-foreground flex-1">
                [Rövid leírás a szolgáltatásról]
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold text-ink">[Ár]</div>
                  <div className="mt-1 inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                    [Akció]
                  </div>
                </div>
                <Link to="/jelentkezes" className="text-sm font-semibold text-ink hover:text-brand inline-flex items-center gap-1">
                  Jelentkezés <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
