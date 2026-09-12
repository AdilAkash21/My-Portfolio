ALTER TABLE public.profiles
  ADD CONSTRAINT age_range CHECK (age IS NULL OR (age >= 1 AND age <= 150));