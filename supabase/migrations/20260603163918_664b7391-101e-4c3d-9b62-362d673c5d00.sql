
-- Drop overly permissive avatars policy
DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;

-- Lock down SECURITY DEFINER helper functions
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
