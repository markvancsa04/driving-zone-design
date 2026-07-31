import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function serverClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const db = serverClient();
  const [
    settings,
    pages,
    heroSlides,
    services,
    instructors,
    cars,
    reviews,
    faqs,
    examTips,
    news,
    gallery,
    socialLinks,
    navLinks,
  ] = await Promise.all([
    db.from("site_settings").select("key, value").order("sort_order"),
    db.from("pages").select("*").order("sort_order"),
    db.from("hero_slides").select("*").eq("is_active", true).order("sort_order"),
    db.from("services").select("*").eq("is_active", true).order("sort_order"),
    db.from("instructors").select("*").eq("is_active", true).order("sort_order"),
    db.from("cars").select("*").eq("is_active", true).order("sort_order"),
    db.from("reviews").select("*").eq("is_active", true).order("sort_order"),
    db.from("faqs").select("*").eq("is_active", true).order("sort_order"),
    db.from("exam_tips").select("*").eq("is_active", true).order("sort_order"),
    db.from("news_items").select("*").eq("is_active", true).order("sort_order"),
    db.from("gallery_images").select("*").eq("is_active", true).order("sort_order"),
    db.from("social_links").select("*").eq("is_active", true).order("sort_order"),
    db.from("nav_links").select("*").eq("is_active", true).order("sort_order"),
  ]);

  const map: Record<string, string> = {};
  for (const row of settings.data ?? []) map[row.key] = row.value;

  return {
    settings: map,
    pages: pages.data ?? [],
    heroSlides: heroSlides.data ?? [],
    services: services.data ?? [],
    instructors: instructors.data ?? [],
    cars: cars.data ?? [],
    reviews: reviews.data ?? [],
    faqs: faqs.data ?? [],
    examTips: examTips.data ?? [],
    news: news.data ?? [],
    gallery: gallery.data ?? [],
    socialLinks: socialLinks.data ?? [],
    navLinks: navLinks.data ?? [],
  };
});
