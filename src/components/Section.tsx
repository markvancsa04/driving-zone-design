import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl mb-12 md:mb-16 fade-up ${alignCls}`}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand">
          <span className="h-px w-8 bg-brand" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-3xl fade-up">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              <span className="h-px w-8 bg-brand" />
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-ink">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              {intro}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
