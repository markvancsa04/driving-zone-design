import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ImagePlaceholder } from "@/components/Placeholder";
import { pageBySlug, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/oktatok")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/oktatok"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Oktatók – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/oktatok");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {content.instructors.map((instructor) => (
            <article key={instructor.id} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label={instructor.name}
                className="aspect-[4/5] rounded-none border-0 border-b border-border"
                src={instructor.image_url}
                alt={instructor.name}
              />
              <div className="p-8">
                <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                  {instructor.role}
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{instructor.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{instructor.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
