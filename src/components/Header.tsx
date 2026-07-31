import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/context";
import { CmsLink } from "./CmsLink";
import { useSiteContent } from "@/lib/cms";

export function Header() {
  const { t } = useI18n();
  const content = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = content.navLinks.filter((l) => l.location === "header" || l.location === "both");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 md:py-4">
          <Link to="/" className="flex items-center min-w-0">
            <Logo className="h-10 sm:h-12 w-auto shrink-0" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <CmsLink
                key={item.id}
                href={item.href}
                activeOptions={{ exact: item.href === "/" }}
                activeProps={{ className: "text-brand" }}
                inactiveProps={{ className: "text-ink hover:text-brand" }}
                className="px-3 py-2 text-sm font-medium transition-colors rounded-full"
              >
                {item.label}
              </CmsLink>
            ))}
            <Link to="/jelentkezes" className="btn-brand ml-3">
              {t.nav.apply}
            </Link>
          </nav>

          <button
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-border text-ink shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menü"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 fade-up">
            <div className="flex flex-col gap-1 border-t border-border pt-4">
              {navItems.map((item) => (
                <CmsLink
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.href === "/" }}
                  activeProps={{ className: "text-brand" }}
                  inactiveProps={{ className: "text-ink" }}
                  className="px-3 py-3 text-base font-medium rounded-xl hover:bg-secondary"
                >
                  {item.label}
                </CmsLink>
              ))}
              <Link
                to="/jelentkezes"
                onClick={() => setOpen(false)}
                className="btn-brand mt-3 self-start"
              >
                {t.nav.apply}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
