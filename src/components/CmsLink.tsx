import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Renders a link coming from the CMS. Internal paths (optionally with a #hash)
 * use client-side routing, external URLs open in a new tab.
 */
export function CmsLink({
  href,
  className,
  children,
  onClick,
  activeProps,
  inactiveProps,
  activeOptions,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  activeProps?: Record<string, unknown>;
  inactiveProps?: Record<string, unknown>;
  activeOptions?: Record<string, unknown>;
}) {
  const url = href || "/";
  const isExternal = /^(https?:)?\/\//.test(url) || url.startsWith("mailto:") || url.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  const [to, hash] = url.split("#");
  return (
    <Link
      to={(to || "/") as never}
      hash={hash}
      className={className}
      onClick={onClick}
      activeProps={activeProps as never}
      inactiveProps={inactiveProps as never}
      activeOptions={activeOptions as never}
    >
      {children}
    </Link>
  );
}
