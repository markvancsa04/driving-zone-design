import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ArrowRight, Newspaper } from "lucide-react";
import { CmsLink } from "@/components/CmsLink";
import { ImagePlaceholder } from "@/components/Placeholder";
import { pageBySlug, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/hirek")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/hirek"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Hírek – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/hirek");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="max-w-2xl mx-auto space-y-8">
          {content.news.map((item) => (
            <article key={item.id} className="card-lift rounded-3xl border border-border bg-card p-10 md:p-14 text-center">
              {item.image_url ? (
                <ImagePlaceholder
                  label={item.title}
                  className="aspect-[16/9] rounded-2xl mb-8"
                  src={item.image_url}
                  alt={item.title}
                />
              ) : (
                <div className="h-14 w-14 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand">
                  <Newspaper className="size-6" />
                </div>
              )}
              <h2 className="mt-6 text-3xl font-semibold text-ink">{item.title}</h2>
              {item.excerpt && <p className="mt-4 text-muted-foreground">{item.excerpt}</p>}
              {item.body && (
                <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">{item.body}</p>
              )}
              {item.link_url && (
                <CmsLink href={item.link_url} className="btn-brand mt-8">
                  {item.link_text || "Tovább"} <ArrowRight className="size-4" />
                </CmsLink>
              )}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
