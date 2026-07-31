import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { collectionByKey, type Collection } from "@/lib/admin-schema";
import { FieldInput } from "@/components/admin/FieldInput";
import { usePreview } from "@/components/admin/PreviewPane";

export const Route = createFileRoute("/admin/$collection")({
  component: CollectionEditor,
  notFoundComponent: () => <p className="text-sm text-muted-foreground">Ismeretlen tartalomtípus.</p>,
});

type Row = Record<string, unknown> & { id: string };

function CollectionEditor() {
  const { collection: key } = Route.useParams();
  const config = collectionByKey(key);
  if (!config) throw notFound();
  return <Editor key={key} config={config} />;
}

function Editor({ config }: { config: Collection }) {
  const queryClient = useQueryClient();
  const preview = usePreview();
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin", config.table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(config.table as never)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Row[];
    },
  });

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  function patch(id: string, name: string, value: unknown) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [name]: value } : r)));
  }

  async function afterWrite(message: string) {
    setStatus(message);
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["site-content"] });
    preview.refresh();
    setTimeout(() => setStatus(null), 2500);
  }

  async function save(row: Row) {
    const payload: Record<string, unknown> = {};
    for (const f of config.fields) payload[f.name] = row[f.name];
    const { error } = await supabase
      .from(config.table as never)
      .update(payload as never)
      .eq("id", row.id);
    if (error) return setStatus(`Hiba: ${error.message}`);
    await afterWrite("Mentve ✓");
  }

  async function create() {
    const nextSort = rows.length ? Math.max(...rows.map((r) => Number(r["sort_order"] ?? 0))) + 1 : 0;
    const payload: Record<string, unknown> = { sort_order: nextSort };
    if (config.table === "pages") {
      payload["slug"] = `/uj-oldal-${Date.now()}`;
      payload["name"] = "Új oldal";
    }
    const { data, error } = await supabase
      .from(config.table as never)
      .insert(payload as never)
      .select()
      .single();
    if (error) return setStatus(`Hiba: ${error.message}`);
    setOpenId((data as unknown as Row).id);
    await afterWrite("Új elem létrehozva ✓");
  }

  async function remove(row: Row) {
    if (!window.confirm("Biztosan törlöd ezt az elemet?")) return;
    const { error } = await supabase.from(config.table as never).delete().eq("id", row.id);
    if (error) return setStatus(`Hiba: ${error.message}`);
    await afterWrite("Törölve ✓");
  }

  async function move(row: Row, dir: -1 | 1) {
    const index = rows.findIndex((r) => r.id === row.id);
    const other = rows[index + dir];
    if (!other) return;
    await supabase
      .from(config.table as never)
      .update({ sort_order: Number(other["sort_order"] ?? 0) } as never)
      .eq("id", row.id);
    await supabase
      .from(config.table as never)
      .update({ sort_order: Number(row["sort_order"] ?? 0) } as never)
      .eq("id", other.id);
    await afterWrite("Sorrend frissítve ✓");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-ink">{config.label}</h1>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
          <button onClick={create} className="btn-brand">
            + Új elem
          </button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Betöltés…</p>}

      <div className="space-y-3">
        {rows.map((row, i) => {
          const open = openId === row.id;
          const title = String(row[config.titleField] || "(névtelen)");
          return (
            <div key={row.id} className="rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 px-4 py-3">
                <button
                  onClick={() => setOpenId(open ? null : row.id)}
                  className="flex-1 text-left text-sm font-semibold text-ink"
                >
                  {open ? "▾" : "▸"} {title}
                </button>
                {"is_active" in row && !row["is_active"] && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                    rejtett
                  </span>
                )}
                {config.sortable && (
                  <>
                    <button
                      onClick={() => move(row, -1)}
                      disabled={i === 0}
                      className="rounded-lg border border-border px-2 py-1 text-xs text-ink disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(row, 1)}
                      disabled={i === rows.length - 1}
                      className="rounded-lg border border-border px-2 py-1 text-xs text-ink disabled:opacity-40"
                    >
                      ↓
                    </button>
                  </>
                )}
              </div>

              {open && (
                <div className="space-y-4 border-t border-border p-4">
                  {config.fields.map((f) => (
                    <FieldInput
                      key={f.name}
                      field={f}
                      value={row[f.name]}
                      onChange={(v) => patch(row.id, f.name, v)}
                    />
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => save(row)} className="btn-brand">
                      Mentés
                    </button>
                    <button
                      onClick={() => remove(row)}
                      className="rounded-xl border border-border px-4 py-2 text-sm text-destructive"
                    >
                      Törlés
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
