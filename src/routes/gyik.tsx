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

const items = Array.from({ length: 8 }).map((_, i) => ({
  q: `[GYIK kérdés ${i + 1}]`,
  a: `[GYIK válasz ${i + 1}]`,
}));

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHeader
        eyebrow="GYIK"
        title="[Gyakori kérdések]"
        intro="[Rövid bevezető]"
      />
      <Section>
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
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
      </Section>
    </>
  );
}
