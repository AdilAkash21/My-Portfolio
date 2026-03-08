

## Plan: Delete Unused Backend Files

Delete all files listed in `DESIGN_WITHOUT_BACKEND.md` that are no longer imported by the active codebase. These files only reference each other — no active code depends on them.

### Files to Delete

1. `src/contexts/AuthContext.tsx`
2. `src/pages/Login.tsx`
3. `src/pages/Signup.tsx`
4. `src/pages/ForgotPassword.tsx`
5. `src/pages/ResetPassword.tsx`
6. `src/pages/Profile.tsx`
7. `src/components/ImageCropDialog.tsx`
8. `supabase/functions/delete-account/index.ts`
9. `SETUP_INSTRUCTIONS.md` — references backend setup, now outdated

### Files NOT deleted (system-managed)

- `src/integrations/supabase/client.ts` — auto-generated, cannot be edited/deleted
- `src/integrations/supabase/types.ts` — auto-generated, cannot be edited/deleted
- `supabase/config.toml` — system-managed
- `.env` — system-managed

### Post-Cleanup

Update `DESIGN_WITHOUT_BACKEND.md` to remove the "Files Still in the Repo" section since they'll be gone, and note that system-managed files remain but are unused.

