import { useState } from "react";
import { uploadMedia } from "@/lib/media";
import type { Field } from "@/lib/admin-schema";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const base =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[var(--brand,#f97316)]"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div className="space-y-1.5">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {field.label}
      </span>

      {field.type === "textarea" && (
        <textarea
          rows={4}
          className={base}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          className={base}
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}

      {field.type === "select" && (
        <select className={base} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === "text" && (
        <input
          className={base}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "image" && (
        <div className="space-y-2">
          {value ? (
            <img
              src={String(value)}
              alt=""
              className="h-32 w-full rounded-xl border border-border object-cover"
            />
          ) : (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
              Nincs kép
            </div>
          )}
          <input
            className={base}
            value={String(value ?? "")}
            placeholder="/api/public/media/… vagy külső URL"
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-ink hover:border-brand">
            {uploading ? "Feltöltés…" : "Kép feltöltése"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                setError(null);
                try {
                  onChange(await uploadMedia(file));
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Sikertelen feltöltés");
                } finally {
                  setUploading(false);
                  e.target.value = "";
                }
              }}
            />
          </label>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}

      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
}
