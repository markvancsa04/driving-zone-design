import { Facebook, Instagram } from "lucide-react";

const LINKS = [
  {
    href: "https://www.facebook.com/soforsuli?locale=hu_HU",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/driving_zone_illes_autosiskola/",
    label: "Instagram",
    Icon: Instagram,
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-ink transition-all duration-300 hover:border-brand hover:bg-brand-soft hover:text-brand hover:-translate-y-0.5"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
