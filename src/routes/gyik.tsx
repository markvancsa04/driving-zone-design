import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/gyik")({
  head: () => ({
    meta: [
      { title: "GYIK – Driving Zone" },
      { name: "description", content: "Gyakran feltett kérdések a jogosítványszerzésről." },
      { property: "og:title", content: "GYIK – Driving Zone" },
      { property: "og:description", content: "Válaszok a leggyakoribb kérdésekre." },
    ],
  }),
  component: FAQPage,
});

const practicalItems = [
  {
    q: "Mikor kezdhetem a vezetési órákat?",
    a: "Az elméleti feltételek teljesítése után elkezdheted a gyakorlati oktatást.",
  },
  {
    q: "Hány vezetési óra szükséges a vizsgához?",
    a: "A kötelező óraszám jelenleg 30 óra, de ez egyéni fejlődéstől függően változhat.",
  },
  {
    q: "[Gyakorlati kérdés 3]",
    a: "[Gyakorlati válasz 3]",
  },
  {
    q: "[Gyakorlati kérdés 4]",
    a: "[Gyakorlati válasz 4]",
  },
  {
    q: "[Gyakorlati kérdés 5]",
    a: "[Gyakorlati válasz 5]",
  },
  {
    q: "[Gyakorlati kérdés 6]",
    a: "[Gyakorlati válasz 6]",
  },
  {
    q: "[Gyakorlati kérdés 7]",
    a: "[Gyakorlati válasz 7]",
  },
  {
    q: "[Gyakorlati kérdés 8]",
    a: "[Gyakorlati válasz 8]",
  },
];

const theoreticalItems = [
  {
    q: "[Elméleti kérdés 1]",
    a: "[Elméleti válasz 1]",
  },
  {
    q: "[Elméleti kérdés 2]",
    a: "[Elméleti válasz 2]",
  },
  {
    q: "[Elméleti kérdés 3]",
    a: "[Elméleti válasz 3]",
  },
  {
    q: "[Elméleti kérdés 4]",
    a: "[Elméleti válasz 4]",
  },
  {
    q: "[Elméleti kérdés 5]",
    a: "[Elméleti válasz 5]",
  },
];

function FAQPage() {
  const [openPractical, setOpenPractical] = useState<number | null>(0);
  const [openTheoretical, setOpenTheoretical] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="GYIK"
        title="Gyakori kérdések | Driving Zone"
        intro="Gyors válaszok a leggyakrabban felmerülő kérdésekre."
      />
      <Section>
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-5 md:mb-6">
              Gyakorlati kérdések
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {practicalItems.map((it, i) => {
                const isOpen = openPractical === i;
                return (
                  <div
                    key={`practical-${i}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenPractical(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base md:text-lg font-semibold text-ink">
                        {it.q}
                      </span>
                      <span className="h-9 w-9 shrink-0 rounded-full bg-secondary grid place-items-center text-brand">
                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-5 md:mb-6">
              Elméleti kérdések
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {theoreticalItems.map((it, i) => {
                const isOpen = openTheoretical === i;
                return (
                  <div
                    key={`theoretical-${i}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenTheoretical(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base md:text-lg font-semibold text-ink">
                        {it.q}
                      </span>
                      <span className="h-9 w-9 shrink-0 rounded-full bg-secondary grid place-items-center text-brand">
                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
