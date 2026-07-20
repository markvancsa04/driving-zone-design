import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader, Section } from "@/components/Section";

import { GALLERY_IMAGES } from "@/lib/gallery-images";
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
        title="Eredményeink | Driving Zone"
        intro="Tekintse meg korábbi munkáinkat és a közösen elért sikereinket."
      />
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-3xl aspect-square focus:outline-none focus:ring-2 focus:ring-brand bg-secondary"
            >
              <img
                src={src}
                alt={`Driving Zone sikeres diák ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[open]}
              alt={`Driving Zone sikeres diák ${open + 1}`}
              className="w-full max-h-[85vh] object-contain rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
