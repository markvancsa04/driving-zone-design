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
  const openingHours = [
    "Hétfő: 8:00 – 16:00",
    "Kedd: 8:00 – 16:00",
    "Szerda: 8:00 – 16:00",
    "Csütörtök: 8:00 – 16:00",
    "Péntek: 8:00 – 16:00",
    "Szombat: Zárva",
    "Vasárnap: Zárva"
  ];

  return (
    <>
      <PageHeader
        eyebrow="Kapcsolat"
        title="Lépj velünk kapcsolatba!"
        intro="Kérdésed van? Vedd fel velünk a kapcsolatot, és örömmel segítünk!"
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card
              icon={<MapPin className="size-5" />}
              label="Cím"
              value={
                <div className="whitespace-pre-line">
                  {"Kézdivásárhely\n17-es Udvartér 1-es szám"}
                </div>
              }
            />
            <Card icon={<Phone className="size-5" />} label="Telefon" value="0786 585 405" />
            <Card icon={<Mail className="size-5" />} label="E-mail" value="drivingzonedrz@gmail.com" />
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.8166579895083!2d26.1368925!3d46.0028135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b497f9c8f8d689%3A0x6b8d44e59c1c49c7!2zS8OlenZpdsOhc8OhcmhlbHksIFJvbWFuaWE!5e0!3m2!1sen!2shu!4v1715850000000!5m2!1sen!2shu"
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
