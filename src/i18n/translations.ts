// Translation dictionary. Add a Romanian version later by filling the `ro` object
// with the same keys. The active language is controlled by src/i18n/context.tsx.

export type Locale = "hu" | "ro";

export const translations = {
  hu: {
    nav: {
      home: "Kezdőlap",
      about: "Rólunk",
      services: "Szolgáltatások",
      instructors: "Oktatók",
      cars: "Autók",
      wall: "Sikereink",
      faq: "GYIK",
      contact: "Kapcsolat",
      apply: "Jelentkezés",
      news: "Hírek",
      testepermis: "TestePermis",
      reviews: "Vélemények",
      tips: "Vizsgatippek",
    },
    common: {
      more: "Továbbiak",
      allInstructors: "Összes oktató",
      allCars: "Összes autó",
      allSuccess: "Összes siker",
      allReviews: "Összes vélemény",
      moreInfo: "További információ",
      submit: "Jelentkezés",
      feed: "Hírfolyam",
      testepermis: "TestePermis",
      placeholder: "Kép helye",
      editable: "Szerkeszthető",
    },
    footer: {
      quickLinks: "Gyors elérés",
      contact: "Kapcsolat",
      follow: "Kövess minket",
      rights: "Minden jog fenntartva.",
      tagline: "[Rövid szlogen a Driving Zone-ról]",
    },
  },
  ro: {
    // Populate with Romanian translations later.
  },
} as const;

export type Dict = typeof translations.hu;
