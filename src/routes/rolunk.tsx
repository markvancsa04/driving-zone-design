import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Check } from "lucide-react";
import { lines, pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/rolunk")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/rolunk"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Rólunk – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/rolunk");
  const bullets = lines(setting(content, "about_bullets"));

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-ink leading-relaxed whitespace-pre-line">
              {setting(content, "about_body")}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {setting(content, "about_note")}
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map((text) => (
                <li key={text} className="flex gap-3 items-start">
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
              src={setting(content, "about_image")}
              alt="Driving Zone autósiskola irodája Kézdivásárhelyen"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
