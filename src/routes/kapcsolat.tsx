import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { lines, pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/kapcsolat")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/kapcsolat"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Kapcsolat – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/kapcsolat");
  const openingHours = lines(setting(content, "contact_hours"));

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card
              icon={<MapPin className="size-5" />}
              label="Cím"
              value={<div className="whitespace-pre-line">{setting(content, "contact_address")}</div>}
            />
            <Card icon={<Phone className="size-5" />} label="Telefon" value={setting(content, "contact_phone")} />
            <Card icon={<Mail className="size-5" />} label="E-mail" value={setting(content, "contact_email")} />
            <Card
              icon={<Clock className="size-5" />}
              label="Nyitvatartás"
              value={
                <div className="space-y-1">
                  {openingHours.map((line) => (
                    <div key={line} className="text-sm">
                      {line}
                    </div>
                  ))}
                </div>
              }
            />
          </div>
          <div className="placeholder-frame aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden">
            <iframe
              title="Google Maps"
              src={setting(content, "contact_map_embed")}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Section>
    </>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="card-lift rounded-2xl border border-border bg-card p-6">
      <div className="h-11 w-11 rounded-2xl bg-brand-soft grid place-items-center text-brand mb-4">
        {icon}
      </div>
      <div className="text-xs font-semibold tracking-widest uppercase text-ink-soft">{label}</div>
      <div className="mt-1 text-ink font-medium">{value}</div>
    </div>
  );
}
