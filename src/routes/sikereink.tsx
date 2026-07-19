import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import { X } from "lucide-react";

export const Route = createFileRoute("/sikereink")({
  head: () => ({
    meta: [
      { title: "Sikereink – Driving Zone" },
      { name: "description", content: "Diákjaink sikerei és pillanatai." },
      { property: "og:title", content: "Sikereink – Driving Zone" },
      { property: "og:description", content: "Több ezer sikeres vizsga pillanatai." },
    ],
  }),
  component: WallPage,
});

function WallPage() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Wall of Fame"
        title="[Sikereink – főcím]"
        intro="[Rövid szöveg – diákjaink sikerei]"
      />
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-3xl aspect-square focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <ImagePlaceholder
                  label={`[Siker ${i + 1}]`}
                  className="w-full h-full rounded-3xl"
                />
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
            </button>
          ))}
        </div>
      </Section>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-6 fade-up"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 h-11 w-11 rounded-full bg-background text-ink grid place-items-center"
            aria-label="Bezárás"
          >
            <X className="size-5" />
          </button>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <ImagePlaceholder
              label={`[Siker ${open + 1} – nagyítva]`}
              className="aspect-[4/3] rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
