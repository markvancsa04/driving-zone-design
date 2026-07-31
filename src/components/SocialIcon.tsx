import { Facebook, Instagram, Linkedin, Twitter, Youtube, Globe } from "lucide-react";

export function SocialIcon({ platform, className = "size-4" }: { platform: string; className?: string }) {
  const key = (platform || "").toLowerCase();
  if (key.includes("facebook")) return <Facebook className={className} />;
  if (key.includes("instagram")) return <Instagram className={className} />;
  if (key.includes("linkedin")) return <Linkedin className={className} />;
  if (key.includes("twitter") || key === "x") return <Twitter className={className} />;
  if (key.includes("youtube")) return <Youtube className={className} />;
  if (key.includes("tiktok")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
      </svg>
    );
  }
  return <Globe className={className} />;
}
