-- Sanitize handle_new_user: validate & limit display_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id,
    LEFT(
      NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'display_name', '')), ''),
      100
    )
  );
  RETURN NEW;
END;
$function$;

-- Add DB constraints for URL format validation
ALTER TABLE public.profiles
  ADD CONSTRAINT github_url_format CHECK (github_url IS NULL OR github_url ~* '^https?://'),
  ADD CONSTRAINT linkedin_url_format CHECK (linkedin_url IS NULL OR linkedin_url ~* '^https?://'),
  ADD CONSTRAINT twitter_url_format CHECK (twitter_url IS NULL OR twitter_url ~* '^https?://'),
  ADD CONSTRAINT website_url_format CHECK (website_url IS NULL OR website_url ~* '^https?://');