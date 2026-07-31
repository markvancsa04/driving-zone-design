import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePreview } from "@/components/admin/PreviewPane";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsEditor,
});

type Setting = {
  id: string;
  key: string;
  value: string;
  label: string;
  group_name: string;
  field_type: string;
  sort_order: number;
};

function SettingsEditor() {
  const queryClient = useQueryClient();
  const preview = usePreview();
  const [rows, setRows] = useState<Setting[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("group_name")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Setting[];
    },
  });

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const groups = Array.from(new Set(rows.map((r) => r.group_name)));

  async function saveAll() {
    setSaving(true);
    const changed = rows.filter((r) => {
      const original = data?.find((d) => d.id === r.id);
      return original && original.value !== r.value;
    });
    for (const row of changed) {
      const { error } = await supabase.from("site_settings").update({ value: row.value }).eq("id", row.id);
      if (error) {
        setSaving(false);
        setStatus(`Hiba: ${error.message}`);
        return;
      }
    }
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["site-content"] });
    preview.refresh();
    setSaving(false);
    setStatus(`Mentve ✓ (${changed.length} mező)`);
    setTimeout(() => setStatus(null), 2500);
  }

  const input =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-ink">Általános beállítások</h1>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
          <button onClick={saveAll} disabled={saving} className="btn-brand">
            {saving ? "Mentés…" : "Összes mentése"}
          </button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Betöltés…</p>}

      {groups.map((group) => (
        <section key={group} className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{group}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {rows
              .filter((r) => r.group_name === group)
              .map((row) => (
                <label key={row.id} className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {row.label || row.key}
                  </span>
                  {row.field_type === "textarea" ? (
                    <textarea
                      rows={4}
                      className={input}
                      value={row.value}
                      onChange={(e) =>
                        setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, value: e.target.value } : r)))
                      }
                    />
                  ) : (
                    <input
                      className={input}
                      value={row.value}
                      onChange={(e) =>
                        setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, value: e.target.value } : r)))
                      }
                    />
                  )}
                  <span className="text-[10px] text-muted-foreground">{row.key}</span>
                </label>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
