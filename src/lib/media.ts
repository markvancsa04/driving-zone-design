import { supabase } from "@/integrations/supabase/client";

/** Uploads a file to the private media bucket and returns the public URL path. */
export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safe = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const key = `${Date.now()}-${safe || "kep"}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(key, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  return `/api/public/media/${key}`;
}
