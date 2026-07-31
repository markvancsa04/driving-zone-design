import { createFileRoute, Link } from "@tanstack/react-router";
import { COLLECTIONS } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Tartalomkezelő</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Válassz egy tartalomtípust a szerkesztéshez. A módosítások mentés után azonnal megjelennek a weboldalon.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/settings"
          className="rounded-2xl border border-border bg-card p-5 hover:border-brand"
        >
          <div className="font-semibold text-ink">Általános beállítások</div>
          <p className="mt-1 text-sm text-muted-foreground">Elérhetőségek, nyitvatartás, szövegek, statisztikák.</p>
        </Link>
        {COLLECTIONS.map((c) => (
          <Link
            key={c.key}
            to="/admin/$collection"
            params={{ collection: c.key }}
            className="rounded-2xl border border-border bg-card p-5 hover:border-brand"
          >
            <div className="font-semibold text-ink">{c.label}</div>
            <p className="mt-1 text-sm text-muted-foreground">Elemek hozzáadása, szerkesztése, sorrendezése.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
