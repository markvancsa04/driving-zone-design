import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/context";
import { CmsLink } from "./CmsLink";
import { SocialIcon } from "./SocialIcon";
import { setting, useSiteContent } from "@/lib/cms";

export function Footer() {
  const { t } = useI18n();
  const content = useSiteContent();
  const links = content.navLinks.filter((l) => l.location === "footer" || l.location === "both");

  const tagline = setting(content, "footer_tagline", "A biztos vezetés itt kezdődik.");
  const address = setting(content, "contact_address", "");
  const phone = setting(content, "contact_phone", "");
  const email = setting(content, "contact_email", "");
  const legal = setting(content, "footer_legal", "");

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo className="h-14 w-auto" />
            <p className="text-sm text-muted-foreground max-w-xs whitespace-pre-line">{tagline}</p>
            <div className="flex gap-2 mt-2">
              {content.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 grid place-items-center rounded-full border border-border text-ink hover:text-brand hover:border-brand transition"
                >
                  <SocialIcon platform={social.icon || social.label} />
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
                <li key={l.id}>
                  <CmsLink href={l.href} className="text-ink hover:text-brand transition-colors">
                    {l.label}
                  </CmsLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-ink-soft mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-ink">
              {address && (
                <li className="flex gap-3">
                  <MapPin className="size-4 text-brand shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex gap-3">
                  <Phone className="size-4 text-brand shrink-0 mt-0.5" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex gap-3">
                  <Mail className="size-4 text-brand shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="hover:text-brand transition-colors">
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Driving Zone. {t.footer.rights}</p>
          <p>{legal}</p>
        </div>
      </div>
    </footer>
  );
}
