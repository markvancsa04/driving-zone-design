import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin bejelentkezés – Driving Zone" },
      { name: "description", content: "Bejelentkezés a Driving Zone tartalomkezelő felületére." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

async function isAdminNow(): Promise<boolean> {
  try {
    await claimAdmin();
  } catch {
    /* not the owner account – ignore */
  }
  const { data } = await supabase.rpc("is_admin");
  return Boolean(data);
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user && (await isAdminNow())) navigate({ to: "/admin", replace: true });
    })();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      if (!data.session) {
        setInfo("Elküldtük a megerősítő e-mailt. Kattints a linkre, majd jelentkezz be.");
        setLoading(false);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Hibás e-mail cím vagy jelszó.");
        setLoading(false);
        return;
      }
    }

    if (!(await isAdminNow())) {
      await supabase.auth.signOut();
      setError("Ehhez a fiókhoz nincs adminisztrátori hozzáférés.");
      setLoading(false);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  const input =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-3xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold text-ink">
          {mode === "signin" ? "Admin bejelentkezés" : "Admin fiók létrehozása"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Jelentkezz be a weboldal tartalmának szerkesztéséhez.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-mail</span>
            <input type="email" required className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Jelszó</span>
            <input
              type="password"
              required
              minLength={8}
              className={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <button type="submit" disabled={loading} className="btn-brand w-full justify-center">
            {loading ? "Folyamatban…" : mode === "signin" ? "Bejelentkezés" : "Fiók létrehozása"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setInfo(null);
            }}
            className="w-full text-center text-xs text-muted-foreground underline"
          >
            {mode === "signin" ? "Még nincs fiókod? Regisztráció" : "Van már fiókod? Bejelentkezés"}
          </button>
        </div>
      </form>
    </div>
  );
}
