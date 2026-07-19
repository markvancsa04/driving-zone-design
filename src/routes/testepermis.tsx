import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ArrowRight, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/testepermis")({
  head: () => ({
    meta: [
      { title: "TestePermis – Driving Zone" },
      { name: "description", content: "Gyakorolj a hivatalos elméleti tesztkérdésekkel." },
      { property: "og:title", content: "TestePermis – Driving Zone" },
      { property: "og:description", content: "Ugorj tovább a TestePermis platformra." },
    ],
  }),
  component: TestePermisPage,
});

function TestePermisPage() {
  return (
    <>
      <PageHeader eyebrow="TestePermis" title="[TestePermis – főcím]" intro="[Rövid bevezető]" />
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-background p-10 md:p-16 shadow-soft text-center">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand">
              <GraduationCap className="size-7" />
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-ink">
              [TestePermis – cím]
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              [Rövid leírás – gyakorolj a hivatalos tesztkérdésekkel]
            </p>
            <a href="#" className="btn-brand mt-10 text-base px-8 py-4">
              TestePermis <ArrowRight className="size-4" />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              [Külső link később kerül beillesztésre]
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
