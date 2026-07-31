import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ArrowRight } from "lucide-react";
import { CmsLink } from "@/components/CmsLink";
import { pageBySlug, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/szolgaltatasok")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/szolgaltatasok"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Szolgáltatások – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/szolgaltatasok");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service) => (
            <article key={service.id} className="card-lift rounded-3xl bg-card border border-border p-8 flex flex-col">
              <div className="text-xs font-semibold tracking-widest uppercase text-brand">
                {service.category}
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground flex-1 whitespace-pre-line">
                {service.description}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold text-ink">{service.price}</div>
                  {service.badge && (
                    <div className="mt-1 inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                      {service.badge}
                    </div>
                  )}
                </div>
                <CmsLink
                  href={service.cta_link || "/jelentkezes"}
                  className="text-sm font-semibold text-ink hover:text-brand inline-flex items-center gap-1"
                >
                  {service.cta_text || "Jelentkezés"} <ArrowRight className="size-4" />
                </CmsLink>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
