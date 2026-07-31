import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Check } from "lucide-react";
import aboutImage from "@/assets/about-storefront.jpg.asset.json";

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
        title="Driving Zone Autósiskola"
        intro="Ismerd meg a Driving Zone csapatát!"
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-ink leading-relaxed">
              Ingyenes online tananyag: Nálunk nincs szükség drága könyvekre vagy elavult jegyzetekre. Modern, bárhonnan elérhető, ingyenes online felkészítő anyagokkal segítjük a sikeres elméleti vizsgádat.
              <br /><br />
              Professzionális elméleti és gyakorlati képzés: Tapasztalt, türelmes és naprakész oktatói gárdánk gondoskodik arról, hogy az elméleti alapoktól a legnehezebb forgalmi szituációkig mindent magabiztosan sajátíts el.
              <br /><br />
              Segítség jogosítványcserénél: Külföldi hajtási engedélyedet cserélnéd románra, vagy lejárt a régi? Lépésről lépésre végigvezetünk és segítünk a folyamaton.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Nálunk te vagy az első. Tedd meg az első métereket egy olyan csapattal, amelynek a vezetés a múltja, a jelene és a jövője!
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Több éves szakmai tapasztalat",
                "Barátságos és segítőkész csapat",
                "Korszerű oktatás",
                "Folyamatos támogatás a vizsgáig"
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="h-6 w-6 rounded-full bg-brand-soft grid place-items-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-brand" />
                  </span>
                  <span className="text-ink">✅ {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              label="Driving Zone iroda"
              className="aspect-[4/5] rounded-3xl"
              src={aboutImage.url}
              alt="Driving Zone autósiskola irodája Kézdivásárhelyen"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
