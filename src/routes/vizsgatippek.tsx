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

const THEORETICAL_TIPS = [
  {
    title: "1. A táblák hivatalos neve döntő fontosságú!",
    description: "Példa: Az „Előzni tilos” tábla hivatalos neve valójában: „Előzni tilos, kivéve az oldalkocsi nélküli kétkerekű motorkerékpárokat”.",
  },
  {
    title: "2. Kihágások és bűncselekmények – Felejtsd el a logikát!",
    description: "A szabálysértések (kihágások) és a bűncselekmények közötti különbséget nem lehet puszta logikával vagy józan ésszel kitalálni. Ezt bizony meg kell tanulni.",
  },
  {
    title: "3. Jogosítvány- és forgalmi engedély bevonása: Mennyi időre?",
    description: "Ez a vizsgák egyik leggyakoribb buktatója. Pontosan tudnod kell, hogy melyik szabálytalanságért hány napra (30, 60, 90 vagy 120 napra) veszik el a jogosítványt, és mikor vonják be a forgalmi engedélyt. Ne hagyd itt a pontokat, tanuld meg ezeket a konkrét számokat!",
  },
  {
    title: "4. A tiltások finomságai (Előzés, megállás, várakozás, tolatás, megfordulás)",
    description: "A tiltások nagy részét az általános műveltség alapján mindenki tudja (pl. hogy a kanyarban nem fordulunk meg). A vizsgakérdések azonban pont azokra a részletekre és kivételekre mennek rá, amiket nem lehet kitalálni.",
  },
  {
    title: "5. Haladj lépésről lépésre – A tanulás 4 fázisa:",
    description: "-A sikeres felkészülésnek megvan a maga logikus sorrendje. Ne ugorj egyből a mély vízbe! -Ismerkedés: Először csak olvasgasd, nézegesd a forgalmi szabályzatot és a táblákat. Szoktasd hozzá az agyad a témához. -Figyelem az elméleti órákon: Csilla óráin olyan kérdésekre kapsz magyarázatot és gyakorlati példákat, amik a könyvekben nincsenek leírva. -A kérdések végigjátszása (Nem szimuláció!): Az elméleti órák alatt és után kezdd el a teszteket a testepermis.ro oldalon. De vigyázz: ne vizsgaszimulációkat indíts, hanem menj végig az összes létező kérdésen! Ha hibázol, keresd meg a magyarázatot. Ha elakadsz, kérj segítséget az iskolánál – az oktatóink és a tanárunk örömmel elmagyarázzák a logikáját. -Éles szimuláció: Csak azután kezdj el vizsgaszimulációkat futtatni, ha már minden kérdést legalább egyszer láttál és megértettél. Így pontos képet kapsz arról, hogyan teljesítenél élesben.",
  },
];

const PRACTICAL_TIPS = [
  {
    title: "Idd az oktatód szavait!",
    description: "Az órák alatt az oktatód nem azért beszél folyamatosan, mert unatkozik, hanem mert minden szavával a fejlődésedet segíti. Felhívja a figyelmed a hibáidra, és előre felkészít a vizsgán várható trükkös szituációkra. Figyelj rá maximálisan a felkészülés alatt, hogy a vizsgán már rutinból menjen minden!",
  },
  {
    title: "Engedd el a görcsös stresszt!",
    description: "Könnyű mondani, hogy ne stresszelj, de törekedned kell rá. Ha túl nagy terhet pakolsz magadra, a koncentrációd drasztikusan lecsökken, és olyan banális hibákat is elkövethetsz, amiket amúgy sosem. Tekints a vizsgára úgy, mint egy újabb vezetési órára, egy újabb élményre az úton!",
  },
  {
    title: "A két kulcsszó: Szabályosan és Biztonságosan",
    description: "A vizsgáztató rendőrnek egyetlen dolgot kell bebizonyítanod: azt, hogy kellő fegyelemmel, az autó biztos kezelésével képes vagy önállóan közlekedni úgy, hogy nem okozol sem enyhe, sem súlyos balesetet. Ha a rendőr biztonságban érzi magát melletted a jobb első ülésen, akkor még kisebb hibák mellett is garantált a sikeres vizsga.",
  },
  {
    title: "Az elsőbbségadás a legfontosabb szempont",
    description: "Legyen szó kereszteződésről, körforgalomról, jelzőlámpáról, gyalogosátkelőről vagy előzésről: az elsőbbségadásnak makulátlannak kell lennie. Aranyos szabály: ha a másik járműnek miattunk nem kell megállnia, kikerülnie minket, vagy akár csak egy kicsit is lassítania, akkor nem létezik elsőbbségadási probléma.",
  },
  {
    title: "Tükrök és jelzések – Nem lehet hanyagolni!",
    description: "A tükrök folyamatos használatát és az időbeni irányjelzést rendkívül szigorúan veszik a vizsgán, és jogosan. Az indexelés elmulasztása vagy a vakon történő manőverezés rettentően balesetveszélyes. Mutasd meg a rendőrnek, hogy látod és uralod a teret magad körül!",
  },
  {
    title: "Sávtartás, helyezkedés és besorolás",
    description: "Mindig tartsd az autót a sávod közepén – még ott is, ahol nincs felfestve felezővonal! Szűk helyeken, ha közel kell menned valamihez, lassíts le drasztikusan, hogy megmaradjon a biztonságérzet. Az útkereszteződések előtt pedig időben kezdj el a megfelelő sávba húzódni és besorolni.",
  },
  {
    title: "A vizsga nem verseny, de nem is szekérút",
    description: "Igyekezz betartani a sebességhatárokat. Ok nélkül ne haladj túl lassan, mert azzal feltartod a forgalmat és pontokat veszíthetsz. Ha kint van egy 30-as tábla, tartsd be, de ha véletlenül 1-2-3 km/h-val átléped, nem történik tragédia – a lényeg, hogy ne engedd az autót 35-ig vagy feljebb gyorsulni.",
  },
  {
    title: "Ne ijedj meg a parkolástól!",
    description: "A parkolás fontos, de nem ezen áll vagy bukik a vizsgád. Ha látod, hogy elszámoltad és nem sikerül elsőre, ne erőltesd a rossz pozíciót, mert ha veszélyessé válik, a vizsgáztató beavatkozhat (fékezhet), és akkor a vizsgának azonnal vége. Inkább vállald fel őszintén, és kérdezd meg, mit tegyél. A vizsgáztató látni fogja a megfontoltságodat, megnyugtat, és egy másik helyen újra megpróbálhatod.",
  },
];

function TipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vizsgatippek"
        title="Vizsga előtt | Driving Zone"
        intro="Praktikus tanácsok, hogy felkészülten érkezz a vizsgára."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <TipsGroup
            icon={<BookOpen className="size-5" />}
            title="Elméleti tippek"
            tips={THEORETICAL_TIPS}
          />
          <TipsGroup
            icon={<Car className="size-5" />}
            title="Gyakorlati tippek"
            tips={PRACTICAL_TIPS}
          />
        </div>
      </Section>
    </>
  );
}

function TipsGroup({
  icon,
  title,
  tips,
}: {
  icon: React.ReactNode;
  title: string;
  tips: { title: string; description: string }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-2xl bg-brand-soft grid place-items-center text-brand">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <article
            key={i}
            className="card-lift rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl font-semibold text-brand shrink-0 w-8">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                  {tip.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
