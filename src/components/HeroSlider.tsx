import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Award, Car, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { CmsLink } from "./CmsLink";
import { setting, useSiteContent } from "@/lib/cms";

const INTERVAL = 6000;

export function HeroSlider() {
  const content = useSiteContent();
  const slides = content.heroSlides;
  const count = Math.max(slides.length, 1);

  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + count) % count);
  }, [count]);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [index, count]);

  const reset = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL);
  };

  const stats = [
    { icon: <Users className="size-5" />, value: setting(content, "hero_stat1_value"), label: setting(content, "hero_stat1_label") },
    { icon: <Award className="size-5" />, value: setting(content, "hero_stat2_value"), label: setting(content, "hero_stat2_label") },
    { icon: <Car className="size-5" />, value: setting(content, "hero_stat3_value"), label: setting(content, "hero_stat3_label") },
  ].filter((s) => s.value);

  return (
    <section
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black"
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 50) {
          go(index + (dx < 0 ? 1 : -1));
          reset();
        }
        touchStart.current = null;
      }}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out will-change-[opacity]"
          style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <img
            src={s.image_url}
            alt={s.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: s.focal_position || "50% 50%" }}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
        <div className="max-w-2xl fade-up">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            <span className="h-px w-8 bg-brand" />
            {setting(content, "hero_eyebrow")}
          </div>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-6xl lg:text-7xl">
            {setting(content, "hero_title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            {setting(content, "hero_subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CmsLink href={setting(content, "hero_cta_primary_link", "/jelentkezes")} className="btn-brand">
              {setting(content, "hero_cta_primary_text")} <ArrowRight className="size-4" />
            </CmsLink>
            <CmsLink
              href={setting(content, "hero_cta_secondary_link", "/szolgaltatasok")}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {setting(content, "hero_cta_secondary_text")}
            </CmsLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {stats.map((s) => (
              <HeroStat key={s.label} icon={s.icon} value={s.value} label={s.label} />
            ))}
          </dl>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          {/* Arrows */}
          <button
            aria-label="Előző dia"
            onClick={() => { go(index - 1); reset(); }}
            className="absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/50 md:inline-flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Következő dia"
            onClick={() => { go(index + 1); reset(); }}
            className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 p-3 text-white backdrop-blur-sm transition hover:bg-black/50 md:inline-flex"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Dia ${i + 1}`}
                onClick={() => { go(i); reset(); }}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-brand" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function HeroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-brand backdrop-blur-sm">
        {icon}
      </div>
      <dt className="text-2xl font-semibold text-white">{value}</dt>
      <dd className="mt-1 text-xs text-white/70">{label}</dd>
    </div>
  );
}
