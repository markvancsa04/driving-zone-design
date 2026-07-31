import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSiteContent } from "./cms.functions";

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
});

export function useSiteContent(): SiteContent {
  return useSuspenseQuery(siteContentQuery).data;
}

/** Read a single site setting with an optional fallback. */
export function setting(content: SiteContent, key: string, fallback = ""): string {
  const v = content.settings[key];
  return v === undefined || v === null || v === "" ? fallback : v;
}

/** Split a multi-line setting into trimmed, non-empty lines. */
export function lines(value: string): string[] {
  return value.split("\n").map((l) => l.trim()).filter(Boolean);
}

/** Page metadata by slug, safe when the row is missing. */
export function pageBySlug(content: SiteContent, slug: string) {
  return (
    content.pages.find((p) => p.slug === slug) ?? {
      slug,
      name: "",
      eyebrow: "",
      title: "",
      intro: "",
      meta_title: "",
      meta_description: "",
    }
  );
}
