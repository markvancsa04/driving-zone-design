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

  const openingHours = [
    "hétfő, 8:00–16:00",
    "kedd, 8:00–16:00",
    "szerda, 8:00–16:00",
    "csütörtök, 8:00–16:00",
    "péntek, 8:00–16:00",
    "szombat, Zárva",
    "vasárnap, Zárva"
  ];

  return (
    <>
      <PageHeader
        eyebrow="Jelentkezés"
        title="Készen állsz?"
        intro="Töltsd ki az űrlapot, és kezdjük el együtt a vezetéshez vezető utat!"
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
                    placeholder="Miben segíthetünk?"
                  />
                </div>
                <button type="submit" className="btn-brand mt-2 w-full sm:w-auto">
                  Jelentkezés <ArrowRight className="size-4" />
                </button>
                {sent && (
                  <p className="text-sm text-brand font-medium fade-up">
                    Köszönjük! Hamarosan felvesszük veled a kapcsolatot.
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
                value={
                  <div className="whitespace-pre-line">
                    {"Kézdivásárhely\n17.es Udvartér 1.es szám"}
                  </div>
                }
              />
              <InfoRow icon={<Phone className="size-4" />} label="Telefon" value="0786 585 405" />
              <InfoRow icon={<Mail className="size-4" />} label="E-mail" value="drivingzonedrz@gmail.com" />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.8166579895083!2d26.1389208!3d46.0009686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDAwJzAzLjUiTiAyNsKwMDgnMjAuMSJF!5e0!3m2!1sen!2shu!4v1715850000000!5m2!1sen!2shu"
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
