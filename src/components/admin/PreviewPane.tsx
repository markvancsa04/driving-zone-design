import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PREVIEW_PATHS } from "@/lib/admin-schema";

type PreviewCtx = { refresh: () => void; nonce: number };

const Ctx = createContext<PreviewCtx>({ refresh: () => {}, nonce: 0 });

export function usePreview() {
  return useContext(Ctx);
}

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [nonce, setNonce] = useState(0);
  const refresh = useCallback(() => setNonce((n) => n + 1), []);
  const value = useMemo(() => ({ refresh, nonce }), [refresh, nonce]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Live preview of the public website next to the editor. */
export function PreviewPane() {
  const { nonce, refresh } = usePreview();
  const [open, setOpen] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const key = pathname.startsWith("/admin/") ? pathname.replace("/admin/", "") : "pages";
  const target = PREVIEW_PATHS[key] ?? "/";

  if (!open) {
    return (
      <div className="hidden xl:block">
        <button
          onClick={() => setOpen(true)}
          className="m-4 rounded-xl border border-border px-3 py-2 text-sm text-ink"
        >
          Élő előnézet
        </button>
      </div>
    );
  }

  return (
    <aside className="hidden w-[520px] shrink-0 border-l border-border bg-card xl:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <span className="text-sm font-semibold text-ink">Élő előnézet</span>
          <div className="flex gap-2">
            <button onClick={refresh} className="rounded-lg border border-border px-2 py-1 text-xs text-ink">
              Frissítés
            </button>
            <button onClick={() => setOpen(false)} className="rounded-lg border border-border px-2 py-1 text-xs text-ink">
              Elrejtés
            </button>
          </div>
        </div>
        <iframe
          key={`${target}-${nonce}`}
          src={target}
          title="Élő előnézet"
          className="h-full w-full flex-1 bg-white"
        />
      </div>
    </aside>
  );
}
