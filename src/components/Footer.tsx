import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/context";

const links = [
  { to: "/", key: "home" as const },
  { to: "/rolunk", key: "about" as const },
  { to: "/szolgaltatasok", key: "services" as const },
  { to: "/oktatok", key: "instructors" as const },
  { to: "/autok", key: "cars" as const },
  { to: "/sikereink", key: "wall" as const },
  { to: "/velemenyek", key: "reviews" as const },
  { to: "/vizsgatippek", key: "tips" as const },
  { to: "/hirek", key: "news" as const },
  { to: "/testepermis", key: "testepermis" as const },
  { to: "/gyik", key: "faq" as const },
  { to: "/kapcsolat", key: "contact" as const },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo className="h-14 w-auto" />
            <p className="text-sm text-muted-foreground max-w-xs">
              A biztos vezetés itt kezdődik.
            </p>
            <div className="flex gap-2 mt-2">
              {[
                {
                  href: "https://www.facebook.com/soforsuli/?locale=hu_HU",
                  label: "Facebook",
                  icon: <Facebook className="size-4" />,
                },
                {
                  href: "https://www.instagram.com/driving_zone_illes_autosiskola/",
                  label: "Instagram",
                  icon: <Instagram className="size-4" />,
                },
                {
                  href: "https://www.tiktok.com/@ills.auts.iskola",
                  label: "TikTok",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                      <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 grid place-items-center rounded-full border border-border text-ink hover:text-brand hover:border-brand transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink-soft mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink hover:text-brand transition-colors"
                  >
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink-soft mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-ink">
              <li className="flex gap-3">
                <MapPin className="size-4 text-brand shrink-0 mt-0.5" />
                <span>[Cím helye]</span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 text-brand shrink-0 mt-0.5" />
                <span>[Telefonszám]</span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 text-brand shrink-0 mt-0.5" />
                <span>[E-mail cím]</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Driving Zone. {t.footer.rights}</p>
          <p>[Készítette / Adatvédelem]</p>
        </div>
      </div>
    </footer>
  );
}
