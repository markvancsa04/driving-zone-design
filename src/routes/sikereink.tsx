import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader, Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { X } from "lucide-react";
import { pageBySlug, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/sikereink")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/sikereink"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Sikereink – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: WallPage,
});

function WallPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/sikereink");
  const images = content.gallery;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <SocialLinks className="mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-3xl aspect-square focus:outline-none focus:ring-2 focus:ring-brand bg-secondary"
            >
              <img
                src={image.image_url}
                alt={image.alt || `Driving Zone sikeres diák ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
            </button>
          ))}
        </div>
      </Section>

      {open !== null && images[open] && (
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
              src={images[open].image_url}
              alt={images[open].alt || `Driving Zone sikeres diák ${open + 1}`}
              className="w-full max-h-[85vh] object-contain rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
