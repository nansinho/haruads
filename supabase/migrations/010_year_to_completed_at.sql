-- Replace integer 'year' column with text 'completed_at' (format YYYY-MM)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS completed_at TEXT;

-- Migrate existing data: convert integer year to "YYYY-01" format
UPDATE public.projects SET completed_at = year::text || '-01' WHERE year IS NOT NULL;

-- Drop the old year column
ALTER TABLE public.projects DROP COLUMN IF EXISTS year;
