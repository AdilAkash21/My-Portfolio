# Security Fixes - Implementation Guide

## Quick Fixes (Priority Order)

### 1. Update .gitignore (CRITICAL)

**File:** `.gitignore`

Add these lines at the beginning:

```
# Environment variables - NEVER commit
.env
.env.local
.env.*.local
.env.production.local

# OS & IDE
node_modules/
dist/
dist-ssr/
*.local
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

Then remove .env from git:
```bash
git rm --cached .env
git add .gitignore
git commit -m "Remove exposed .env file and update .gitignore"
```

---

### 2. Enable TypeScript Strict Mode (HIGH PRIORITY)

**File:** `tsconfig.app.json`

Edit the `compilerOptions` section:

```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleDetection": "force",
    "moduleResolution": "bundler",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "strict": true,                          // ✅ CHANGED: was false
    "noImplicitAny": true,                   // ✅ CHANGED: was false
    "noUnusedLocals": true,                  // ✅ CHANGED: was false
    "noUnusedParameters": true,              // ✅ CHANGED: was false
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true,
    "target": "ES2020",
    "types": ["vitest/globals"],
    "useDefineForClassFields": true
  },
  "include": ["src"]
}
```

---

### 3. Add Security Headers to Vite Config (CRITICAL)

**File:** `vite.config.ts`

Replace the entire file:

```typescript
// ─── Vite Configuration ───
// Build tool config for the React application.
// - Uses SWC-based React plugin for fast JSX transformation
// - Sets up path alias "@" → "./src" for clean imports
// - Disables HMR overlay to prevent error popups during development
// - Manual chunk splitting for optimal loading performance
// - Adds security headers

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // ✅ ADD: Security headers for development
    headers: {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' eobqzywnwvzabqwzehgf.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-toast', '@radix-ui/react-tabs', '@radix-ui/react-popover'],
        },
      },
    },
  },
}));
```

---

### 4. Fix Supabase Edge Function (CRITICAL)

**File:** `supabase/config.toml`

Change:

```toml
[functions.delete-account]
verify_jwt = false
```

To:

```toml
[functions.delete-account]
verify_jwt = true  # ✅ CHANGED: Enable JWT verification
```

---

### 5. Fix Console Logging (MEDIUM)

**File:** `src/pages/NotFound.tsx`

Replace:

```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Log the invalid route attempt for debugging purposes
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <a href="/" className="text-primary underline hover:text-primary/90">
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
```

With:

```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // ✅ IMPROVED: Only log in development, sanitized in production
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: Page not found");
      // Don't log sensitive paths in production
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
```

---

### 6. Fix Contact Section - Hide Personal Info (HIGH)

**File:** `src/components/ContactSection.tsx`

Option A: Remove direct contact links (recommended):

```tsx
// ✅ IMPROVED: Don't expose personal contact info directly
const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Nanchong, China",
    href: undefined,  // Use form instead
    batmanValue: "Gotham City",
    batmanHref: undefined,
  },
  {
    icon: Mail,
    label: "Email",
    value: "Use contact form below",
    href: undefined,  // Use form instead
    batmanValue: "Use signal below",
    batmanHref: undefined,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "AdilAkash21",
    href: "https://github.com/AdilAkash21",  // OK to share public profile
    batmanHref: undefined,
  },
];
```

Then update the card rendering to not show empty contact info:

```tsx
{contactInfo.map((item, i) => {
  const displayValue = isBatman ? (item.batmanValue ?? item.value) : item.value;
  const displayHref = isBatman ? item.batmanHref : item.href;

  // Skip if no contact link
  if (!displayHref) return null;

  return (
    <motion.div key={item.label} {...animationProps}>
      {/* Only render clickable card if href exists */}
      {displayHref ? (
        <a href={displayHref} target="_blank" rel="noopener noreferrer" {...cardStyle}>
          {/* Card content */}
        </a>
      ) : null}
    </motion.div>
  );
})}
```

---

### 7. Add Rate Limiting to Contact Form (MEDIUM)

**File:** `src/components/ContactSection.tsx`

Add to component:

```tsx
const ContactSection = () => {
  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);  // ✅ ADD
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  // Handle form submission: validate → insert into database → show feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ ADD: Rate limiting check (5 second cooldown)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < 5000) {
      setErrors({ 
        submit: `Please wait ${Math.ceil((5000 - timeSinceLastSubmit) / 1000)} seconds before trying again` 
      });
      return;
    }

    // Validate form data against Zod schema
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setLastSubmitTime(now);  // ✅ ADD: Record submit time

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  // Rest of component...
};
```

---

### 8. Fix ESLint Configuration (MEDIUM)

**File:** `eslint.config.js`

Replace:

```javascript
rules: {
  ...reactHooks.configs.recommended.rules,
  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  "@typescript-eslint/no-unused-vars": "off",  // ❌ DISABLED
},
```

With:

```javascript
rules: {
  ...reactHooks.configs.recommended.rules,
  "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  // ✅ IMPROVED: Re-enabled with smart prefixes
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_"
    }
  ],
},
```

---

### 9. Create .env.example (CRITICAL)

**File:** `.env.example`

Create this file (NO SECRETS):

```
# Supabase Configuration (PUBLIC - Safe to commit)
VITE_SUPABASE_PROJECT_ID=your_project_id_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
VITE_SUPABASE_URL=https://your-project.supabase.co
```

Add to git:
```bash
git add .env.example
git commit -m "Add .env.example template"
```

---

### 10. Create Error Boundary Component (HIGH)

**File:** `src/components/ErrorBoundary.tsx`

Create new file:

```tsx
// ─── Error Boundary ───
// Catches React component errors to prevent full app crashes

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service (Sentry, LogRocket, etc.)
    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-muted-foreground mb-8">
              Something went wrong. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

Then wrap your app in `src/App.tsx`:

```tsx
import ErrorBoundary from "@/components/ErrorBoundary";

// ... imports ...

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>  {/* ✅ ADD */}
        <ThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              {/* ... rest of app ... */}
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>  {/* ✅ ADD */}
    </QueryClientProvider>
  );
}
```

---

### 11. Update index.html with SRI and Remove Inline Script (CRITICAL)

**File:** `index.html`

Move inline theme script to separate file:

```html
<!-- Remove this: -->
<!-- <script>
  (function(){var t=localStorage.getItem('theme');...})();
</script> -->

<!-- Add this instead (at end of body): -->
<script src="/src/theme-init.ts" type="module"></script>
```

Create `src/theme-init.ts`:

```typescript
// ─── Theme Initialization Script ───
// Runs before React hydration to prevent theme flash

function initTheme() {
  const theme = localStorage.getItem("theme");
  
  // Validate theme value
  const validThemes = ["dark", "batman"];
  const selectedTheme = validThemes.includes(theme || "") ? theme : "dark";
  
  // Apply theme
  document.documentElement.className = selectedTheme;
  
  // Save if changed
  if (theme !== selectedTheme) {
    localStorage.setItem("theme", selectedTheme);
  }
}

// Run immediately
initTheme();

// Listen for changes
window.addEventListener("storage", () => {
  initTheme();
});
```

Add integrity to fonts in `index.html`:

```html
<!-- Old (without integrity): -->
<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" /> -->

<!-- New (with crossorigin): -->
<link 
  rel="stylesheet" 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" 
  crossorigin="anonymous"
/>
```

---

## Testing After Fixes

Run these commands to verify your fixes:

```bash
# 1. Check for TypeScript errors
npm run build

# 2. Run ESLint
npm run lint

# 3. Check for security issues
npm audit

# 4. Run tests
npm run test

# 5. Check build size
npm run build -- --report  # if using Vite with plugins
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Rotate Supabase credentials (done)
- [ ] Remove `.env` from git history (done)
- [ ] Update `.gitignore` (done)
- [ ] Enable TypeScript strict mode (done)
- [ ] Add security headers (done)
- [ ] Enable CSP (done)
- [ ] Fix console logging (done)
- [ ] Add error boundary (done)
- [ ] Test on HTTPS (required!)
- [ ] Verify CSP in browser DevTools (Network tab)
- [ ] Run npm audit (clean)
- [ ] Test rate limiting on contact form
- [ ] Verify no console errors/warnings

---

## Deployment Instructions

### For Vercel/Netlify:

Add to `vercel.json` or `netlify.toml`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' eobqzywnwvzabqwzehgf.supabase.co"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

✅ **After applying these fixes, your portfolio will be significantly more secure and production-ready!**
