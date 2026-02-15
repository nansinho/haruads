-- ============================================
-- Migration 008: Add description column to tickets
-- ============================================

ALTER TABLE public.tickets ADD COLUMN IF NOT EXISTS description TEXT;
