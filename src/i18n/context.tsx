import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Dict, type Locale } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("hu");
  // Fallback to Hungarian when Romanian keys are missing.
  const t = (translations[locale] as Partial<Dict> as Dict) ?? translations.hu;
  const merged = { ...translations.hu, ...t } as Dict;
  return (
    <I18nContext.Provider value={{ locale, setLocale, t: merged }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
