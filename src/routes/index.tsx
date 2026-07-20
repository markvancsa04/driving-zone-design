import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Car } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Section, SectionHeader } from "@/components/Section";
import { HeroSlider } from "@/components/HeroSlider";
import instructorImageAsset from "@/assets/instructor-fleet.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Driving Zone – Autósiskola Kézdivásárhelyen" },
      { name: "description", content: "Több mint 5000 sikeres vizsga. Modern autók, tapasztalt oktatók, teljes körű ügyintézés." },
      { property: "og:title", content: "Driving Zone – Autósiskola" },
      { property: "og:description", content: "Több mint 5000 sikeres vizsga. Vezess magabiztosan velünk." },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  {
    title: "B kategóriás járművezetői tanfolyam",
    description: "Türelmes és tapasztalt oktatók, akik mellett élmény a tanulás.",
    price: "2400 - Rontól",
  },
  {
    title: "Vezetés-tökéletesítő órák (Már meglévő jogosítvánnyal)",
    description: "Személyre szabott gyakorló órák saját vagy oktatóautóval.",
    price: "150 - Rontól",
  },
  {
    title: "Jogosítványcsere (Külföldi és belföldi)",
    description: "Külföldön szerzett vezetői engedélyek románra való cseréje (honosítás).",
    price: "Szemelyreszabott ár, kérj ajánlatot",
  },
];

function HomePage() {
  return (
    <>
      <HeroSlider />


      {/* SERVICES PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow="Szolgáltatások"
          title="Szolgáltatásaink – Driving Zone"
          intro=""
        />
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <article key={index} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="h-12 w-12 rounded-2xl bg-brand-soft grid place-items-center text-brand mb-6">
                <Car className="size-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-6 text-sm font-semibold text-brand">{service.price}</div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/szolgaltatasok" className="btn-ghost">
            Továbbiak <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* INSTRUCTORS PREVIEW */}
      <Section className="bg-secondary/40 max-w-none px-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Oktatók"
            title="Csapatunk | Driving Zone"
            intro="Tapasztalt és türelmes oktatóink segítenek, hogy magabiztos vezetővé válj."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <article key={i} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
                <ImagePlaceholder
                  label="[Oktató fotó]"
                  className="aspect-[16/10] rounded-none border-0 border-b border-border"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-ink">[Oktató neve]</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    [Rövid bemutatkozás]
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/oktatok" className="btn-ghost">
              Összes oktató <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* CARS PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow="Autópark"
          title="[Modern flottánk]"
          intro="[Rövid szöveg az autókról]"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <article key={i} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label="[Autó fotó]"
                className="aspect-[16/10] rounded-none border-0 border-b border-border"
              />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-ink">[Autó modell]</h3>
                <p className="mt-2 text-sm text-muted-foreground">[Rövid leírás]</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/autok" className="btn-ghost">
            Összes autó <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* WALL OF FAME PREVIEW */}
      <Section className="bg-secondary/40 max-w-none px-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Sikereink"
            title="[Diákjaink]"
            intro="[Rövid szöveg a sikerekről]"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder
                key={i}
                label={`[Siker ${i}]`}
                className="aspect-square"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/sikereink" className="btn-ghost">
              Összes siker <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* REVIEWS PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow="Vélemények"
          title="[Mit mondanak rólunk]"
          intro="[Rövid szöveg a véleményekhez]"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <article key={i} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="flex gap-1 text-brand mb-4">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-ink leading-relaxed">
                „[Vélemény szövege]"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary" />
                <div>
                  <div className="text-sm font-semibold text-ink">[Név]</div>
                  <div className="text-xs text-muted-foreground">[Év]</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/velemenyek" className="btn-ghost">
            Összes vélemény <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
