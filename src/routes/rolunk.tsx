import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Check } from "lucide-react";

export const Route = createFileRoute("/rolunk")({
  head: () => ({
    meta: [
      { title: "Rólunk – Driving Zone" },
      { name: "description", content: "Ismerd meg a Driving Zone csapatát és 15 éves történetét." },
      { property: "og:title", content: "Rólunk – Driving Zone" },
      { property: "og:description", content: "Több mint 5000 sikeres vizsga és 15 év tapasztalat." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rólunk"
        title="Driving Zone&nbsp; Autósiskola"
        intro="Ismerd meg a Driving Zone csapatát!"
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-ink leading-relaxed">
              [Bemutatkozó bekezdés – 2–3 mondat]
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              [További bekezdés]
            </p>
            <ul className="mt-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="h-6 w-6 rounded-full bg-brand-soft grid place-items-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-brand" />
                  </span>
                  <span className="text-ink">[Előny / érték {i}]</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              label="[Csapatkép helye]"
              className="aspect-[4/5] rounded-3xl"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
