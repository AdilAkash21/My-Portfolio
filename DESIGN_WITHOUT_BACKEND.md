# Frontend-Only Setup (Design Without Backend)

This project has already been stripped of all backend (Supabase) dependencies. It runs as a pure frontend application.

---

## What Was Removed

- **Authentication**: Login, Signup, Forgot Password, Reset Password, and Profile pages are no longer routed or used.
- **AuthContext**: The auth provider and context have been disconnected from the app.
- **Supabase client calls**: Navbar no longer fetches user profiles. Contact form uses a simulated send instead of database insert.
- **Settings link**: Removed from the navbar (desktop and mobile).
- **User avatar**: Removed from the navbar.

---

## Files Still in the Repo (Unused)

These files remain in the codebase but are **not imported or used** anywhere. You can safely delete them:

| File | Was Used For |
|---|---|
| `src/contexts/AuthContext.tsx` | Auth state management |
| `src/pages/Login.tsx` | Login page |
| `src/pages/Signup.tsx` | Signup page |
| `src/pages/ForgotPassword.tsx` | Password reset request |
| `src/pages/ResetPassword.tsx` | Password reset form |
| `src/pages/Profile.tsx` | User profile/settings |
| `src/components/ImageCropDialog.tsx` | Avatar cropping (used on Profile) |
| `src/integrations/supabase/client.ts` | Supabase client (auto-generated, do not edit) |
| `src/integrations/supabase/types.ts` | Supabase types (auto-generated, do not edit) |
| `supabase/` | Backend config, migrations, edge functions |
| `.env` | Backend credentials |

---

## Contact Form

The contact form UI is fully functional but **does not send messages anywhere**. It currently simulates a successful send after 800ms.

To make it functional, integrate a service like:
- [EmailJS](https://www.emailjs.com/)
- [Formspree](https://formspree.io/)
- [Web3Forms](https://web3forms.com/)

Replace the simulated handler in `src/components/ContactSection.tsx`:

```tsx
// Current (simulated)
await new Promise((resolve) => setTimeout(resolve, 800));

// Replace with your chosen service
```

---

## How to Run Locally

```bash
npm install
npm run dev
```

App starts at **http://localhost:8080**

> ⚠️ Do NOT use VS Code "Live Server" — this is a Vite + React project. Use `npm run dev`.

---

## Build for Production

```bash
npm run build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.).

---

## What Still Works

✅ Intro loading screen with progress bar and particle burst  
✅ Hero section with parallax background and mouse-follow glow  
✅ About section  
✅ Skills/Services grid  
✅ Projects section  
✅ Contact form (UI only)  
✅ Footer  
✅ Dark / Batman theme toggle  
✅ Scroll animations (ScrollReveal)  
✅ Scroll progress bar in navbar  
✅ Scroll-to-top button  
✅ Fully responsive (mobile + desktop)
