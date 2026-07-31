export type FieldType = "text" | "textarea" | "number" | "boolean" | "image" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
};

export type Collection = {
  key: string;
  table: string;
  label: string;
  titleField: string;
  fields: Field[];
  sortable: boolean;
};

const common = {
  sort: { name: "sort_order", label: "Sorrend", type: "number" } as Field,
  active: { name: "is_active", label: "Látható az oldalon", type: "boolean" } as Field,
};

export const COLLECTIONS: Collection[] = [
  {
    key: "hero_slides",
    table: "hero_slides",
    label: "Főoldali diák",
    titleField: "alt",
    sortable: true,
    fields: [
      { name: "image_url", label: "Kép", type: "image" },
      { name: "alt", label: "Kép leírása (alt)", type: "text" },
      { name: "focal_position", label: "Képkivágás (pl. 50% 50%)", type: "text" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "services",
    table: "services",
    label: "Szolgáltatások",
    titleField: "title",
    sortable: true,
    fields: [
      { name: "category", label: "Kategória", type: "text" },
      { name: "title", label: "Cím", type: "text" },
      { name: "description", label: "Leírás", type: "textarea" },
      { name: "price", label: "Ár", type: "text" },
      { name: "badge", label: "Címke (pl. Népszerű)", type: "text" },
      { name: "cta_text", label: "Gomb szövege", type: "text" },
      { name: "cta_link", label: "Gomb linkje", type: "text" },
      { name: "show_on_home", label: "Megjelenik a főoldalon", type: "boolean" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "instructors",
    table: "instructors",
    label: "Oktatók",
    titleField: "name",
    sortable: true,
    fields: [
      { name: "image_url", label: "Fénykép", type: "image" },
      { name: "name", label: "Név", type: "text" },
      { name: "role", label: "Beosztás", type: "text" },
      { name: "bio", label: "Bemutatkozás", type: "textarea" },
      { name: "show_on_home", label: "Megjelenik a főoldalon", type: "boolean" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "cars",
    table: "cars",
    label: "Autók",
    titleField: "model",
    sortable: true,
    fields: [
      { name: "image_url", label: "Kép", type: "image" },
      { name: "model", label: "Modell", type: "text" },
      { name: "description", label: "Leírás", type: "textarea" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "reviews",
    table: "reviews",
    label: "Vélemények",
    titleField: "name",
    sortable: true,
    fields: [
      { name: "name", label: "Név", type: "text" },
      { name: "age", label: "Kor / megjegyzés", type: "text" },
      { name: "text", label: "Vélemény", type: "textarea" },
      { name: "rating", label: "Értékelés (1-5)", type: "number" },
      { name: "show_on_home", label: "Megjelenik a főoldalon", type: "boolean" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "faqs",
    table: "faqs",
    label: "GYIK",
    titleField: "question",
    sortable: true,
    fields: [
      { name: "category", label: "Kategória", type: "select", options: ["practical", "theoretical"] },
      { name: "question", label: "Kérdés", type: "text" },
      { name: "answer", label: "Válasz", type: "textarea" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "exam_tips",
    table: "exam_tips",
    label: "Vizsgatippek",
    titleField: "title",
    sortable: true,
    fields: [
      { name: "category", label: "Kategória", type: "select", options: ["practical", "theoretical"] },
      { name: "title", label: "Cím", type: "text" },
      { name: "description", label: "Leírás", type: "textarea" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "news_items",
    table: "news_items",
    label: "Hírek",
    titleField: "title",
    sortable: true,
    fields: [
      { name: "image_url", label: "Kép", type: "image" },
      { name: "title", label: "Cím", type: "text" },
      { name: "excerpt", label: "Rövid összefoglaló", type: "textarea" },
      { name: "body", label: "Tartalom", type: "textarea" },
      { name: "link_url", label: "Link", type: "text" },
      { name: "link_text", label: "Link szövege", type: "text" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "gallery_images",
    table: "gallery_images",
    label: "Galéria",
    titleField: "alt",
    sortable: true,
    fields: [
      { name: "image_url", label: "Kép", type: "image" },
      { name: "alt", label: "Kép leírása (alt)", type: "text" },
      common.sort,
      common.active,
    ],
  },
  {
    key: "social_links",
    table: "social_links",
    label: "Közösségi linkek",
    titleField: "label",
    sortable: true,
    fields: [
      { name: "label", label: "Név", type: "text" },
      { name: "url", label: "URL", type: "text" },
      {
        name: "icon",
        label: "Ikon",
        type: "select",
        options: ["facebook", "instagram", "tiktok", "youtube", "linkedin", "twitter"],
      },
      common.sort,
      common.active,
    ],
  },
  {
    key: "nav_links",
    table: "nav_links",
    label: "Menüpontok",
    titleField: "label",
    sortable: true,
    fields: [
      { name: "label", label: "Felirat", type: "text" },
      { name: "href", label: "Útvonal (pl. /rolunk vagy /#autok)", type: "text" },
      { name: "location", label: "Hol jelenjen meg", type: "select", options: ["header", "footer", "both"] },
      common.sort,
      common.active,
    ],
  },
  {
    key: "pages",
    table: "pages",
    label: "Oldalak és SEO",
    titleField: "name",
    sortable: true,
    fields: [
      { name: "name", label: "Oldal neve", type: "text" },
      { name: "slug", label: "Útvonal", type: "text" },
      { name: "eyebrow", label: "Felső címke", type: "text" },
      { name: "title", label: "Főcím", type: "text" },
      { name: "intro", label: "Bevezető", type: "textarea" },
      { name: "meta_title", label: "SEO cím", type: "text" },
      { name: "meta_description", label: "SEO leírás", type: "textarea" },
      common.sort,
    ],
  },
];

export function collectionByKey(key: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

/** Preview path for a collection, used by the live preview pane. */
export const PREVIEW_PATHS: Record<string, string> = {
  hero_slides: "/",
  services: "/szolgaltatasok",
  instructors: "/oktatok",
  cars: "/#autok",
  reviews: "/velemenyek",
  faqs: "/gyik",
  exam_tips: "/vizsgatippek",
  news_items: "/hirek",
  gallery_images: "/sikereink",
  social_links: "/",
  nav_links: "/",
  pages: "/",
  settings: "/",
};
