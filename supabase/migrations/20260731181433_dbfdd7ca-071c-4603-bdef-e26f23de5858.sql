ALTER TABLE public.services ADD COLUMN IF NOT EXISTS badge text NOT NULL DEFAULT '';
UPDATE public.services SET badge = 'Népszerű' WHERE category = 'B KATEGÓRIA';