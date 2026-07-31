import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: isAdmin } = await supabase.rpc("is_admin");
        if (isAdmin) navigate({ to: "/admin", replace: true });
      }
    })();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Hibás e-mail cím vagy jelszó.");
      setLoading(false);
      return;
    }
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
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
        <h1 className="text-2xl font-semibold text-ink">Admin bejelentkezés</h1>
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
              className={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading} className="btn-brand w-full justify-center">
            {loading ? "Bejelentkezés…" : "Bejelentkezés"}
          </button>
        </div>
      </form>
    </div>
  );
}
