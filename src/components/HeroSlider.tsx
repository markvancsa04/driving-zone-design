import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Car, ChevronLeft, ChevronRight, Users } from "lucide-react";
import heroStorefront from "@/assets/hero-storefront.jpg.asset.json";
import hero2 from "@/assets/hero-2.png.asset.json";

const SLIDES = [
  { src: heroStorefront.url, alt: "Driving Zone – autósiskola irodánk Kézdivásárhelyen", position: "50% 50%" },
  { src: hero2.url, alt: "Driving Zone – Skoda a tengerparton", position: "50% 50%" },
];

const INTERVAL = 6000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [index]);

  const reset = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
  };

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
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out will-change-[opacity]"
          style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: s.position }}
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
            Driving Zone
          </div>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-6xl lg:text-7xl">
            Vezess magabiztosan velünk
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Az elmúlt másfél évtizedben több mint 5000 diákunk szerzett sikeresen jogosítványt az
            irányításunk alatt. Légy te a következő!
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jelentkezes" className="btn-brand">
              Jelentkezés <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/szolgaltatasok"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Szolgáltatások
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            <HeroStat icon={<Users className="size-5" />} value="5000+" label="Diák" />
            <HeroStat icon={<Award className="size-5" />} value="15" label="Év" />
            <HeroStat icon={<Car className="size-5" />} value="21" label="Kolléga" />
          </dl>
        </div>
      </div>

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
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Dia ${i + 1}`}
            onClick={() => { go(i); reset(); }}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-brand" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
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
