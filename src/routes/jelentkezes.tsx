import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { lines, pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/jelentkezes")({
  loader: async ({ context }) =>
    pageBySlug(await context.queryClient.ensureQueryData(siteContentQuery), "/jelentkezes"),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta_title || loaderData?.title || "Jelentkezés – Driving Zone" },
      { name: "description", content: loaderData?.meta_description || loaderData?.intro || "" },
      { property: "og:title", content: loaderData?.meta_title || loaderData?.title || "" },
      { property: "og:description", content: loaderData?.meta_description || loaderData?.intro || "" },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const content = useSiteContent();
  const page = pageBySlug(content, "/jelentkezes");
  const [sent, setSent] = useState(false);
  const openingHours = lines(setting(content, "contact_hours"));

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft"
            >
              <div className="grid gap-5">
                <Field label="Teljes név" name="name" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Telefonszám" name="phone" type="tel" required />
                  <Field label="E-mail cím" name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-ink-soft mb-2">
                    Üzenet
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={1000}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Miben segíthetünk?"
                  />
                </div>
                <button type="submit" className="btn-brand mt-2 w-full sm:w-auto">
                  {setting(content, "apply_form_button", "Jelentkezés")} <ArrowRight className="size-4" />
                </button>
                {sent && (
                  <p className="text-sm text-brand font-medium fade-up">
                    {setting(content, "apply_success_text")}
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-secondary/40 p-8 space-y-6">
              <InfoRow
                icon={<MapPin className="size-4" />}
                label="Cím"
                value={<div className="whitespace-pre-line">{setting(content, "contact_address")}</div>}
              />
              <InfoRow icon={<Phone className="size-4" />} label="Telefon" value={setting(content, "contact_phone")} />
              <InfoRow icon={<Mail className="size-4" />} label="E-mail" value={setting(content, "contact_email")} />
              <InfoRow
                icon={<Clock className="size-4" />}
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
            <div className="mt-6 placeholder-frame aspect-[4/3] rounded-3xl overflow-hidden">
              <iframe
                title="Google Maps"
                src={setting(content, "contact_map_embed")}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold tracking-widest uppercase text-ink-soft mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
        placeholder={`[${label}]`}
      />
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-2xl bg-background border border-border grid place-items-center text-brand shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-widest uppercase text-ink-soft">{label}</div>
        <div className="mt-1 text-ink">{value}</div>
      </div>
    </div>
  );
}
