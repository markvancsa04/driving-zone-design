import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import instructorImageAsset from "@/assets/instructor-fleet.jpg.asset.json";

export const Route = createFileRoute("/oktatok")({
  head: () => ({
    meta: [
      { title: "Oktatók – Driving Zone" },
      { name: "description", content: "Ismerd meg tapasztalt oktatóinkat." },
      { property: "og:title", content: "Oktatók – Driving Zone" },
      { property: "og:description", content: "Türelmes, tapasztalt oktatók egyénre szabott figyelemmel." },
    ],
  }),
  component: InstructorsPage,
});

const INSTRUCTORS = [
  {
    name: "Illés Bálint",
    role: "TULAJDONOS, MENEDZSER ÉS OKTATÓ",
    description: "Emberi értékek és szerénység: Bálint nem a háttérből irányít. Tulajdonosként és menedzserként is közvetlen, két lábbal a földön járó ember maradt, aki maga is aktívan oktat. Számára minden egyes tanuló egyedi sorsot jelent, és a legnagyobb elismerés nem a száraz statisztika, hanem a diákok arcán látható őszinte öröm és biztonságérzet."
  },
  {
    name: "Illés László",
    role: "AZ ISKOLA SZÜLŐATYJA",
    description: "Több évtizedes szakmai tapasztalat: László a kétezres évek eleje óta oktat, így több ezer sofőr hálás neki a biztos alapokért. Nincs olyan közlekedési szituáció, műszaki probléma vagy oktatási helyzet, amivel az évek során ne találkozott volna."
  },
  {
    name: "Csüdör Lóránd",
    role: "GYAKORLATI OKTATÓ",
    description: "Világjáró tapasztalat és magas szintű kommunikáció: Lóránd Kolozsváron végzett egyetemet, majd éveken át Angliában élt és dolgozott. Az ott szerzett tapasztalatok, a precizitás és a nemzetközi szemlélet mind hozzájárulnak ahhoz, hogy a legmagasabb színvonalon, végtelenül professzionálisan oktasson – nálunk akár idegen nyelven is!"
  }
];

function InstructorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Oktatók"
        title="Csapatunk | Driving Zone"
        intro="Ismerd meg tapasztalt és türelmes oktatóinkat, akik segítenek a magabiztos vezetés elsajátításában."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {INSTRUCTORS.map((instructor, i) => (
            <article key={i} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label={instructor.name}
                className="aspect-[4/5] rounded-none border-0 border-b border-border"
                src={instructorImageAsset.url}
                alt={instructor.name}
              />
              <div className="p-8">
                <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                  {instructor.role}
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{instructor.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {instructor.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
