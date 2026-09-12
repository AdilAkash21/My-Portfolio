-- Make the avatars bucket private instead of deleting it
UPDATE storage.buckets SET public = false WHERE id = 'avatars';