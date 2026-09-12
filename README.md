# Adil Rahman Akash Portfolio

Personal portfolio website for Adil Rahman Akash, built with React, JavaScript, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- Responsive sections for about, experience, skills, projects, blog, testimonials, stats, and contact
- Dark theme mode
- Framer Motion animations and scroll reveal effects
- Contact form validation with Zod
- Vite production build with code splitting

## Development

Install dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

## Netlify deployment

Netlify can deploy this Vite app directly from the repository using the included
`netlify.toml` configuration. The site renders without Supabase configuration;
projects, education, and articles are loaded when the following optional
production environment variables are configured in Netlify:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

After adding or changing these variables, trigger a new deploy so Vite includes
them in the production bundle. Do not commit a real `.env` file or secret keys
to the repository.

Run tests:

```sh
npm run test
```

Run lint:

```sh
npm run lint
```

## Tech Stack

- React
- JavaScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Vitest
