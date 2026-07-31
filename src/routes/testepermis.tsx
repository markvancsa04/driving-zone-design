import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { ArrowRight, GraduationCap } from "lucide-react";
import { CmsLink } from "@/components/CmsLink";
import { pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/testepermis")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/testepermis"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Online tesztek | Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: TestePermisPage,
});

function TestePermisPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/testepermis");
  const note = setting(content, "testepermis_note");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-background p-10 md:p-16 shadow-soft text-center">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand">
              <GraduationCap className="size-7" />
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-ink">
              {setting(content, "testepermis_title")}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              {setting(content, "testepermis_text")}
            </p>
            <CmsLink href={setting(content, "testepermis_cta_link", "#")} className="btn-brand mt-10 text-base px-8 py-4">
              {setting(content, "testepermis_cta_text")} <ArrowRight className="size-4" />
            </CmsLink>
            {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
          </article>
        </div>
      </Section>
    </>
  );
}
