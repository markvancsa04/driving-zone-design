import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Award, Users, Car } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Section, SectionHeader } from "@/components/Section";

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

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 md:pt-20 pb-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 fade-up">
              <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand">
                <span className="h-px w-8 bg-brand" />
                Driving Zone
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-ink leading-[1.02]">
                [Nagy főcím – pl. Vezess magabiztosan velünk]
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
                [Rövid bemutatkozás – 1–2 mondat a Driving Zone-ról]
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/jelentkezes" className="btn-brand">
                  Jelentkezés <ArrowRight className="size-4" />
                </Link>
                <Link to="/szolgaltatasok" className="btn-ghost">
                  Szolgáltatások
                </Link>
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                <Stat icon={<Users className="size-5" />} value="5000+" label="[Diák]" />
                <Stat icon={<Award className="size-5" />} value="15" label="[Év]" />
                <Stat icon={<Car className="size-5" />} value="21" label="[Kolléga]" />
              </dl>
            </div>

            <div className="lg:col-span-6 fade-up">
              <ImagePlaceholder
                label="[Iroda / épület fotó helye]"
                className="aspect-[5/4] lg:aspect-[4/5] rounded-3xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow="Szolgáltatások"
          title={<>[Amit kínálunk<br className="hidden md:block" /> neked]</>}
          intro="[Rövid bevezető a szolgáltatásokhoz]"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <article key={i} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="h-12 w-12 rounded-2xl bg-brand-soft grid place-items-center text-brand mb-6">
                <Car className="size-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">[Szolgáltatás címe {i}]</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                [Rövid leírás a szolgáltatásról]
              </p>
              <div className="mt-6 text-sm font-semibold text-brand">[Ár helye]</div>
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
            title="[Csapatunk]"
            intro="[Rövid szöveg az oktatókról]"
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

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="h-9 w-9 rounded-xl bg-secondary grid place-items-center text-brand mb-2">
        {icon}
      </div>
      <dt className="text-2xl font-semibold text-ink">{value}</dt>
      <dd className="text-xs text-muted-foreground mt-1">{label}</dd>
    </div>
  );
}
