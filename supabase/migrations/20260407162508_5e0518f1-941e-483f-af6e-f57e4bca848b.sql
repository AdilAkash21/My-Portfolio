-- Fix 1: Replace overly permissive avatar SELECT policy with owner-scoped one
DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;

CREATE POLICY "Users can view their own avatar"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars' AND (auth.uid())::text = (storage.foldername(name))[1]);

-- Fix 2: Add explicit restrictive SELECT policy on contact_messages (deny all reads via API)
CREATE POLICY "No one can read contact messages"
  ON public.contact_messages FOR SELECT
  USING (false);