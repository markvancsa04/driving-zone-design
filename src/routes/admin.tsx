import { createFileRoute, redirect, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { COLLECTIONS } from "@/lib/admin-schema";
import { PreviewProvider, PreviewPane } from "@/components/admin/PreviewPane";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (to: string, label: string, params?: Record<string, string>) => {
    const href = params ? to.replace("$collection", params["collection"]!) : to;
    const active = pathname === href;
    return (
      <Link
        key={href}
        to={to as never}
        params={params as never}
        onClick={() => setMenuOpen(false)}
        className={`block rounded-xl px-3 py-2 text-sm ${
          active ? "bg-brand text-white font-semibold" : "text-ink hover:bg-muted"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <PreviewProvider>
      <div className="flex min-h-screen bg-background">
        <aside
          className={`${
            menuOpen ? "block" : "hidden"
          } fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-border bg-card p-4 lg:sticky lg:top-0 lg:block lg:h-screen`}
        >
          <div className="mb-4 text-lg font-semibold text-ink">Driving Zone CMS</div>
          <nav className="space-y-1">
            {navItem("/admin", "Áttekintés")}
            {navItem("/admin/settings", "Általános beállítások")}
            {COLLECTIONS.map((c) =>
              navItem("/admin/$collection", c.label, { collection: c.key }),
            )}
          </nav>
          <div className="mt-6 space-y-2 border-t border-border pt-4">
            <a href="/" target="_blank" rel="noreferrer" className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-muted">
              Weboldal megnyitása ↗
            </a>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/auth";
              }}
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-destructive hover:bg-muted"
            >
              Kijelentkezés
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-xl border border-border px-3 py-1.5 text-sm text-ink"
            >
              Menü
            </button>
            <span className="font-semibold text-ink">Driving Zone CMS</span>
          </header>

          <div className="flex min-w-0 flex-1 flex-col xl:flex-row">
            <main className="min-w-0 flex-1 p-4 lg:p-8">
              <Outlet />
            </main>
            <PreviewPane />
          </div>
        </div>
      </div>
    </PreviewProvider>
  );
}
