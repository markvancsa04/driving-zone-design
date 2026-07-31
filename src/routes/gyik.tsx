import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { Plus, Minus } from "lucide-react";
import { pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/gyik")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/gyik"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "GYIK – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: FAQPage,
});

type Faq = { id: string; question: string; answer: string };

function FAQPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/gyik");
  const practical = content.faqs.filter((f) => f.category !== "theoretical");
  const theoretical = content.faqs.filter((f) => f.category === "theoretical");

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="space-y-12">
          <FaqGroup title={setting(content, "faq_practical_title", "Gyakorlati kérdések")} items={practical} />
          <FaqGroup title={setting(content, "faq_theoretical_title", "Elméleti kérdések")} items={theoretical} />
        </div>
      </Section>
    </>
  );
}

function FaqGroup({ title, items }: { title: string; items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-ink mb-5 md:mb-6">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {items.map((it) => {
          const isOpen = open === it.id;
          return (
            <div key={it.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : it.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base md:text-lg font-semibold text-ink">{it.question}</span>
                <span className="h-9 w-9 shrink-0 rounded-full bg-secondary grid place-items-center text-brand">
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{it.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
