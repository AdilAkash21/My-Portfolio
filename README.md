# Adil Rahman Akash Portfolio

Personal portfolio website for Adil Rahman Akash — a responsive, animation-rich
React portfolio focused on software engineering, web development, and interface
design.

## Highlights

- Responsive portfolio sections for home, about, education, skills, projects,
  articles, testimonials, and contact
- Mobile-friendly animated WebGL and canvas backgrounds with performance-aware
  quality settings
- Smooth Lenis scrolling, scroll-reveal transitions, and interactive project
  cards
- Touch-device and reduced-motion support
- Dark visual system built with Tailwind CSS and shadcn/ui
- Supabase integration for projects, education, and articles
- Repository-owned fallback content when Supabase is not configured
- Client-side contact form validation with Zod
- Vite production build with code splitting

## Tech stack

- React 18
- JavaScript and TypeScript components
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI
- Framer Motion
- Lenis
- Supabase
- Vitest

## Local development

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

The Vite server prints the local URL in the terminal. If the default port is
already in use, Vite automatically selects another available port.

## Environment variables

Supabase variables are optional. Without them, the site uses the fallback
portfolio content in `src/data/portfolioFallback.js`.

For live Supabase content, create a local `.env` file or configure these
variables in the deployment provider:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Never commit a real `.env` file or private server-side credentials. Use only a
Supabase publishable/anonymous key in this browser application.

## Netlify deployment

The repository includes [`netlify.toml`](./netlify.toml), which configures:

- `npm run build` as the build command
- `dist` as the publish directory
- Node.js 20
- SPA fallback routing for client-side paths

To deploy:

1. Connect the GitHub repository to Netlify.
2. Use the `main` branch.
3. Add the optional Supabase variables under **Project configuration →
   Environment variables**.
4. Trigger a deploy.

The site can deploy and render without Supabase variables. Add them when live
projects, education, and article data should replace the fallback content.

## Quality checks

Run the production build:

```sh
npm run build
```

Run the type check:

```sh
npm run typecheck
```

Run lint:

```sh
npm run lint
```

Run tests:

```sh
npm run test
```
