import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/kapcsolat")({
  head: () => ({
    meta: [
      { title: "Kapcsolat – Driving Zone" },
      { name: "description", content: "Elérhetőségeink és nyitvatartásunk." },
      { property: "og:title", content: "Kapcsolat – Driving Zone" },
      { property: "og:description", content: "Vedd fel velünk a kapcsolatot." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Kapcsolat" title="[Kapcsolat – főcím]" intro="[Rövid bevezető]" />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card icon={<MapPin className="size-5" />} label="Cím" value="[Cím helye]" />
            <Card icon={<Phone className="size-5" />} label="Telefon" value="[Telefonszám]" />
            <Card icon={<Mail className="size-5" />} label="E-mail" value="[E-mail cím]" />
            <Card icon={<Clock className="size-5" />} label="Nyitvatartás" value="[Munkaidő]" />
          </div>
          <div className="placeholder-frame aspect-[4/3] lg:aspect-[5/4] rounded-3xl">
            <span>[Google Maps helye]</span>
          </div>
        </div>
      </Section>
    </>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
