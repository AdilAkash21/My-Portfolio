# Frontend-Only Setup (Design Without Backend)

This project runs as a pure frontend application with no backend dependencies.

---

## What Was Removed

- **Authentication**: Login, Signup, Forgot Password, Reset Password, and Profile pages have been deleted.
- **AuthContext**: The auth provider and context have been deleted.
- **Edge Functions**: The `delete-account` edge function has been deleted.
- **ImageCropDialog**: Avatar cropping component (was used on Profile) has been deleted.
- **Supabase client calls**: Navbar does not fetch user profiles. Contact form uses a simulated send.

---

## System-Managed Files (Unused but Cannot Be Deleted)

These files are auto-generated/managed by the platform and remain in the repo but are not used:

| File | Note |
|---|---|
| `src/integrations/supabase/client.ts` | Auto-generated, do not edit |
| `src/integrations/supabase/types.ts` | Auto-generated, do not edit |
| `supabase/config.toml` | System-managed |
| `.env` | System-managed |

---

## Contact Form

The contact form UI is fully functional but **does not send messages anywhere**. It simulates a successful send after 800ms.

To make it functional, integrate a service like:
- [EmailJS](https://www.emailjs.com/)
- [Formspree](https://formspree.io/)
- [Web3Forms](https://web3forms.com/)

Replace the simulated handler in `src/components/ContactSection.tsx`.

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
