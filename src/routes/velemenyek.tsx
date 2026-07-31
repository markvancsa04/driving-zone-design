import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { Star } from "lucide-react";
import { pageBySlug, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/velemenyek")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/velemenyek"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Vélemények – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/velemenyek");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.reviews.map((review) => (
            <article key={review.id} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="flex gap-1 text-brand mb-5">
                {Array.from({ length: review.rating || 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-ink leading-relaxed">{review.text}</p>
              <div className="mt-6">
                <div className="text-sm font-semibold text-ink">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.age}</div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
