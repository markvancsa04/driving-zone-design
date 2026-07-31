import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Owner e-mail allowed to claim the first administrator role. */
const OWNER_EMAIL = "drivingzonedrz@gmail.com";

/**
 * Grants the admin role to the site owner account the first time it signs in.
 * Any other account is ignored.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims?.["email"] ?? "").toLowerCase();
    if (email !== OWNER_EMAIL) return { granted: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (existing) return { granted: true };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw error;
    return { granted: true };
  });
