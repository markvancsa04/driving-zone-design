import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { BookOpen, Car } from "lucide-react";
import { pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/vizsgatippek")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/vizsgatippek"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Vizsgatippek – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: TipsPage,
});

function TipsPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/vizsgatippek");
  const theoretical = content.examTips.filter((t) => t.category === "theoretical");
  const practical = content.examTips.filter((t) => t.category !== "theoretical");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <TipsGroup
            icon={<BookOpen className="size-5" />}
            title={setting(content, "tips_theoretical_title", "Elméleti tippek")}
            tips={theoretical}
          />
          <TipsGroup
            icon={<Car className="size-5" />}
            title={setting(content, "tips_practical_title", "Gyakorlati tippek")}
            tips={practical}
          />
        </div>
      </Section>
    </>
  );
}

function TipsGroup({
  icon,
  title,
  tips,
}: {
  icon: React.ReactNode;
  title: string;
  tips: { id: string; title: string; description: string }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-2xl bg-brand-soft grid place-items-center text-brand">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <article key={tip.id} className="card-lift rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-semibold text-brand shrink-0 w-8">{i + 1}</div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                  {tip.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
