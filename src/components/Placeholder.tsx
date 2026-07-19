import type { ReactNode } from "react";

/**
 * Editable image placeholder. Replace by swapping this component with an <img>
 * or setting a background. Keep the same aspect ratio via `className`.
 */
export function ImagePlaceholder({
  label = "[Kép helye]",
  className = "aspect-[4/3]",
  children,
}: {
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`placeholder-frame ${className}`}>
      <div className="flex flex-col items-center gap-1 text-center px-4">
        <span className="text-[10px] tracking-widest text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

/**
 * Editable text placeholder. Wrap short bracketed strings so they visually
 * signal "replace me" without breaking layout.
 */
export function TextPlaceholder({
  children,
  as: Tag = "span",
  className = "",
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <Tag className={`text-ink-soft/80 ${className}`}>
      {children}
    </Tag>
  );
}
