import { SocialIcon } from "./SocialIcon";
import { useSiteContent } from "@/lib/cms";

export function SocialLinks({ className = "" }: { className?: string }) {
  const content = useSiteContent();
  const links = content.socialLinks;

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-ink transition-all duration-300 hover:border-brand hover:bg-brand-soft hover:text-brand hover:-translate-y-0.5"
        >
          <SocialIcon platform={link.icon || link.label} className="size-5" />
        </a>
      ))}
    </div>
  );
}
