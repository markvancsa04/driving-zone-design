import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/jelentkezes")({
  head: () => ({
    meta: [
      { title: "Jelentkezés – Driving Zone" },
      { name: "description", content: "Vedd fel velünk a kapcsolatot és kezdd el a jogosítványszerzést." },
      { property: "og:title", content: "Jelentkezés – Driving Zone" },
      { property: "og:description", content: "Jelentkezz autósiskolánkba – egyszerűen és gyorsan." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Jelentkezés"
        title="[Jelentkezés – főcím]"
        intro="[Rövid bevezető – vedd fel velünk a kapcsolatot]"
      />
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
                    placeholder="[Rövid üzenet]"
                  />
                </div>
                <button type="submit" className="btn-brand mt-2 w-full sm:w-auto">
                  Jelentkezés <ArrowRight className="size-4" />
                </button>
                {sent && (
                  <p className="text-sm text-brand font-medium fade-up">
                    [Köszönjük! Hamarosan felvesszük veled a kapcsolatot.]
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-secondary/40 p-8 space-y-6">
              <InfoRow icon={<MapPin className="size-4" />} label="Cím" value="[Cím helye]" />
              <InfoRow icon={<Phone className="size-4" />} label="Telefon" value="[Telefonszám]" />
              <InfoRow icon={<Mail className="size-4" />} label="E-mail" value="[E-mail cím]" />
              <InfoRow icon={<Clock className="size-4" />} label="Nyitvatartás" value="[Munkaidő]" />
            </div>
            <div className="mt-6 placeholder-frame aspect-[4/3] rounded-3xl">
              <span>[Google Maps helye]</span>
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

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
