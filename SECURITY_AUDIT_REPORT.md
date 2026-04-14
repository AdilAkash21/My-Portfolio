# Security & Code Quality Audit Report
**Portfolio: nanchong-nexus-works**  
**Generated: April 15, 2026**  
**Status: ⚠️ CRITICAL ISSUES FOUND**

---

## Executive Summary

This comprehensive security audit identified **3 CRITICAL**, **8 HIGH**, **10 MEDIUM**, and **8 LOW** severity issues. The most critical concern is exposed Supabase credentials in the `.env` file committed to the repository. Immediate remediation is required for production deployment.

---

## 🔴 CRITICAL ISSUES (Immediate Action Required)

### 1. **Exposed Supabase Credentials in Repository**
- **Location:** [.env](.env)
- **Severity:** CRITICAL
- **Issue:** The `.env` file contains sensitive Supabase credentials:
  - `VITE_SUPABASE_PROJECT_ID` 
  - `VITE_SUPABASE_PUBLISHABLE_KEY` (JWT token)
  - `VITE_SUPABASE_URL`
- **Risk:** If the repository is public or accessed by unauthorized users, these credentials can be used to:
  - Access your Supabase project
  - Enumerate/modify database records
  - Delete user data
- **Why This Happened:** The `.gitignore` does NOT exclude `.env` files
- **Fix:**
  ```bash
  # 1. Immediately rotate all Supabase keys in your project settings:
  # https://supabase.com/dashboard projects → API settings → Rotate keys
  
  # 2. Add to .gitignore:
  echo ".env" >> .gitignore
  echo ".env.local" >> .gitignore
  echo ".env.*.local" >> .gitignore
  
  # 3. Remove .env from git history:
  git rm --cached .env
  git commit -m "Remove .env file with credentials"
  
  # 4. Create .env.example (without secrets):
  VITE_SUPABASE_PROJECT_ID=your_project_id_here
  VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
  VITE_SUPABASE_URL=https://your-project.supabase.co
  ```

### 2. **Missing Content Security Policy (CSP) Headers**
- **Location:** [index.html](index.html)
- **Severity:** CRITICAL
- **Issue:** No CSP header is set, leaving the application vulnerable to XSS attacks
- **Risk:** 
  - Inline scripts can be injected
  - Malicious stylesheets can be loaded
  - Sensitive data can be exfiltrated via form submissions
- **Current Vulnerable Code:**
  ```html
  <!-- No CSP header defined -->
  <script>
    (function(){var t=localStorage.getItem('theme');...})();
  </script>
  ```
- **Fix:** Add CSP headers via Vite config or server headers:
  ```typescript
  // vite.config.ts
  export default defineConfig({
    server: {
      headers: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' eobqzywnwvzabqwzehgf.supabase.co",
      }
    }
  });
  ```
  Or better, remove inline scripts and move to separate files with nonce.

### 3. **Unverified JWT in Supabase Edge Function**
- **Location:** [supabase/config.toml](supabase/config.toml)
- **Severity:** CRITICAL
- **Issue:** 
  ```toml
  [functions.delete-account]
  verify_jwt = false  # ⚠️ DISABLED!
  ```
- **Risk:** Any attacker can call this function without authentication
- **Fix:**
  ```toml
  [functions.delete-account]
  verify_jwt = true  # Enable JWT verification
  ```

---

## 🟠 HIGH SEVERITY ISSUES

### 4. **TypeScript Strict Mode Disabled**
- **Location:** [tsconfig.app.json](tsconfig.app.json)
- **Severity:** HIGH
- **Issue:** 
  ```json
  {
    "strict": false,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
  ```
- **Risk:** Type safety is reduced, allowing:
  - Silent type coercion errors
  - Undetected null/undefined access
  - Unused variables accumulating
- **Fix:** Enable strict mode:
  ```json
  {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
  ```

### 5. **Dangerous dangerouslySetInnerHTML in Chart Component**
- **Location:** [src/components/ui/chart.tsx](src/components/ui/chart.tsx#L70)
- **Severity:** HIGH
- **Issue:**
  ```tsx
  <style dangerouslySetInnerHTML={{
    __html: Object.entries(THEMES)
      .map(([theme, prefix]) => `...${colorConfig...}`)
      .join("\n"),
  }} />
  ```
- **Risk:** If `THEMES` or `colorConfig` contain user input, this creates an XSS vulnerability
- **Current Context:** Currently safe (hardcoded data), but dangerous pattern
- **Fix:** Use CSS-in-JS library or inject styles safely:
  ```tsx
  const styleSheet = document.createElement('style');
  styleSheet.textContent = cssText;
  document.head.appendChild(styleSheet);
  ```

### 6. **No Error Boundaries for React Components**
- **Location:** [src/App.tsx](src/App.tsx), [src/pages/Index.tsx](src/pages/Index.tsx)
- **Severity:** HIGH
- **Issue:** No error boundary to catch React component errors
- **Risk:** Single component error crashes entire application
- **Fix:** Create an error boundary:
  ```tsx
  class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
      console.error('Error caught:', error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return <div>Something went wrong.</div>;
      }
      return this.props.children;
    }
  }
  ```

### 7. **Hardcoded Personal Contact Information**
- **Location:** [src/components/ContactSection.tsx](src/components/ContactSection.tsx#L42-L59)
- **Severity:** HIGH
- **Issue:**
  ```tsx
  {
    icon: Phone,
    label: "Mobile",
    value: "+86 17390219212",  // ⚠️ EXPOSED PHONE
    href: "tel:+8617390219212",
  },
  {
    icon: Mail,
    label: "Email",
    value: "adilakash23@gmail.com",  // ⚠️ EXPOSED EMAIL
    href: "mailto:adilakash23@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "AdilAkash21",  // ⚠️ EXPOSED USERNAME
    href: "https://github.com/AdilAkash21",
  },
  ```
- **Risk:** 
  - Email/phone scraping by bots for spam/phishing
  - Social engineering attacks using verified identifying information
  - Privacy concerns (publicly exposed personal numbers)
- **Fix:** Use obfuscated/contact form approach:
  ```tsx
  // Instead of direct contact links, use a contact form
  // Or use email obfuscation: email = atob("YWRpbGFrYXNoMjNAZ21haWwuY29t")
  ```

### 8. **Missing HTTPS Enforcement Headers**
- **Location:** [index.html](index.html)
- **Severity:** HIGH
- **Issue:** No HSTS (HTTP Strict-Transport-Security) header
- **Risk:** Downgrade attacks, man-in-the-middle (MITM) attacks
- **Fix:** Add to Vite config or server headers:
  ```typescript
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  ```

### 9. **No X-Frame-Options Header**
- **Location:** [index.html](index.html)
- **Severity:** HIGH
- **Issue:** Missing clickjacking protection
- **Risk:** Website can be embedded in malicious iframes
- **Fix:** Add header:
  ```
  X-Frame-Options: SAMEORIGIN
  ```

### 10. **Unvalidated localStorage Theme**
- **Location:** [index.html](index.html#L59)
- **Severity:** HIGH (Medium in this context)
- **Issue:**
  ```javascript
  var t=localStorage.getItem('theme');
  if(!t||!['dark','batman'].includes(t)){
    t='dark';
    localStorage.setItem('theme','dark')
  }
  ```
- **While There IS Validation:** The check `['dark','batman'].includes(t)` IS safe, BUT:
  - An attacker could manipulate localStorage to inject data
  - Better to use a Map to validate instead of array lookup
- **Risk:** Limited in this case, but localStorage manipulation vector exists
- **Fix:** Use environment-based theme defaults

### 11. **Supabase Session Persistence in localStorage**
- **Location:** [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts)
- **Severity:** HIGH
- **Issue:**
  ```typescript
  auth: {
    storage: localStorage,        // ⚠️ PLAINTEXT IN BROWSER
    persistSession: true,
    autoRefreshToken: true,
  }
  ```
- **Risk:** Although this is Supabase's default, JWT tokens in localStorage are vulnerable to XSS attacks
- **Better Approach:** Use httpOnly cookies (requires backend):
  ```typescript
  // The current implementation is acceptable for public data
  // But for sensitive operations, httpOnly cookies are safer
  ```

---

## 🟡 MEDIUM SEVERITY ISSUES

### 12. **Missing External Resource Integrity (SRI)**
- **Location:** [index.html](index.html#L49-L56)
- **Severity:** MEDIUM
- **Issue:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter...">
  <!-- ⚠️ NO INTEGRITY HASH! -->
  ```
- **Risk:** If Google Fonts CDN is compromised, malicious CSS/fonts could be injected
- **Fix:** Add integrity attribute:
  ```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" integrity="sha384-..." crossorigin="anonymous" />
  ```

### 13. **Console Error Logging Sensitive Data**
- **Location:** [src/pages/NotFound.tsx](src/pages/NotFound.tsx#L11)
- **Severity:** MEDIUM
- **Issue:**
  ```typescript
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  ```
- **Risk:** 
  - Sensitive URLs/paths exposed in browser console
  - Attacker could see internal route structure
  - Production logs could be intercepted
- **Fix:** Only log in development:
  ```typescript
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error:", location.pathname);
    }
  }, [location.pathname]);
  ```

### 14. **No HTTP Security Headers Defined**
- **Location:** All routes
- **Severity:** MEDIUM
- **Missing Headers:**
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block` (deprecated but helpful)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- **Fix:** Configure in Vite or deployment:
  ```typescript
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
  ```

### 15. **Supabase Client Not Actually Used**
- **Location:** [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts), [DESIGN_WITHOUT_BACKEND.md](DESIGN_WITHOUT_BACKEND.md#L13)
- **Severity:** MEDIUM
- **Issue:**
  - Supabase is configured but the contact form doesn't use it
  - Code suggests `// Supabase client calls: Navbar does not fetch user profiles. Contact form uses a simulated send.`
- **Risk:** 
  - Dead code increases attack surface
  - Developers might accidentally use it and send data to wrong place
  - Database schema exists but is unused
- **Fix:** Either:
  1. Remove Supabase integration entirely, or
  2. Actually integrate the contact form with the database

### 16. **ESLint Rules Disabled**
- **Location:** [eslint.config.js](eslint.config.js)
- **Severity:** MEDIUM
- **Issue:**
  ```javascript
  rules: {
    "@typescript-eslint/no-unused-vars": "off",  // ⚠️ DISABLED!
  }
  ```
- **Risk:** Dead code accumulates, making codebase harder to maintain and understand
- **Fix:** Re-enable the rule:
  ```javascript
  "@typescript-eslint/no-unused-vars": ["error", { 
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_"
  }]
  ```

### 17. **No Input Sanitization (Though Zod Validates)**
- **Location:** [src/components/ContactSection.tsx](src/components/ContactSection.tsx#L10)
- **Severity:** MEDIUM (MITIGATED by Zod)
- **Issue:**
  ```typescript
  const contactSchema = z.object({
    name: z.string().trim().min(1, ...).max(100, ...),
    email: z.string().trim().email(...),
    message: z.string().trim().min(1, ...).max(1000, ...),
  });
  ```
- **Current State:** Zod provides good validation
- **Enhancement:** Add more specific sanitization:
  ```typescript
  name: z.string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  ```

### 18. **Large Bundle Size (UI Component Bloat)**
- **Location:** [src/components/ui/](src/components/ui/)
- **Severity:** MEDIUM
- **Issue:** 30+ shadcn UI components imported, but only subset used
- **Risk:** Larger initial load, slow first contentful paint (FCP)
- **Current Dependencies:** Chart, Calendar, Select, Toast, etc.
- **Fix:** Use dynamic imports for less-used components:
  ```typescript
  const Dialog = lazy(() => import('@/components/ui/dialog'));
  ```

### 19. **No Rate Limiting on Contact Form**
- **Location:** [src/components/ContactSection.tsx](src/components/ContactSection.tsx#L58)
- **Severity:** MEDIUM
- **Issue:**
  ```typescript
  // Simulate sending (replace with EmailJS, Formspree, or your own backend)
  await new Promise((resolve) => setTimeout(resolve, 800));
  ```
- **Risk:** 
  - Form submit can be spammed (even if backend not connected)
  - No rate limiting implemented
  - No CAPTCHA protection
- **Fix:** Add rate limiting:
  ```typescript
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  
  const handleSubmit = async (e) => {
    const now = Date.now();
    if (now - lastSubmitTime < 5000) { // 5 second cooldown
      setErrors({ submit: "Please wait before trying again" });
      return;
    }
    setLastSubmitTime(now);
    // ... rest of submit logic
  }
  ```

### 20. **Font Resources Not Optimized**
- **Location:** [index.html](index.html#L49-L56)
- **Severity:** MEDIUM
- **Issue:** Multiple font weights loaded from Google Fonts increases network requests
- **Current:** Preloading multiple font weights:
  - `Inter:wght@400;600;700`
  - `Space+Mono:wght@400;700`
  - `Lora:wght@400;500;600;700`
  - `JetBrains+Mono:wght@400;500;600`
- **Risk:** Slower page load, higher bandwidth usage
- **Fix:** Use font subsetting and limit weights:
  ```html
  <!-- Only load essential weights -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
  ```

---

## 🔵 LOW SEVERITY ISSUES

### 21. **Redundant Supabase Configuration**
- **Location:** [src/integrations/supabase/](src/integrations/supabase/), [DESIGN_WITHOUT_BACKEND.md](DESIGN_WITHOUT_BACKEND.md)
- **Severity:** LOW
- **Issue:** Supabase is fully configured but marked as "system-managed" and unused
- **Fix:** Remove if not using:
  ```bash
  rm -rf src/integrations/supabase/
  ```

### 22. **No robots.txt Configuration**
- **Location:** [public/robots.txt](public/robots.txt)
- **Severity:** LOW
- **Issue:** Default robots.txt doesn't specify sitemap or crawl rules
- **Fix:** Create proper robots.txt:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin/
  Sitemap: https://nanchong-nexus-works.lovable.app/sitemap.xml
  ```

### 23. **Missing 404 Page Error Handling**
- **Location:** [src/pages/NotFound.tsx](src/pages/NotFound.tsx)
- **Severity:** LOW
- **Issue:** 404 page exists but doesn't have proper meta tags for redirect handling
- **Enhancement:** Add helpful error page with suggestions

### 24. **Vite Build Not Minified in Dev Mode**
- **Location:** [vite.config.ts](vite.config.ts)
- **Severity:** LOW
- **Issue:** Default dev mode doesn't minify; production build does
- **Fix:** This is normal for Vite, just ensure production build is tested

### 25. **No Service Worker / Offline Support**
- **Severity:** LOW
- **Issue:** No service worker for offline functionality or caching
- **Enhancement:** Consider adding PWA support for better UX

### 26. **GitHub URL is Placeholder**
- **Location:** [src/components/ProjectsSection.tsx](src/components/ProjectsSection.tsx#L25)
- **Severity:** LOW
- **Issue:**
  ```tsx
  {
    title: "Portfolio Website",
    github: "https://github.com",  // ⚠️ PLACEHOLDER!
  }
  ```
- **Fix:** Update to real URLs or remove

### 27. **Contact Form Not Functional**
- **Location:** [src/components/ContactSection.tsx](src/components/ContactSection.tsx#L62)
- **Severity:** LOW (By Design)
- **Issue:** Contact form only simulates sending
- **Fix:** Integrate withEmailJS, Formspree, or backend API

### 28. **Missing Viewport Configuration Meta Tags**
- **Location:** [index.html](index.html)
- **Severity:** LOW
- **Current:** Present and correct
- **Status:** ✅ GOOD

---

## 🔒 Security Best Practices Checklist

| Issue | Current | Status | Priority |
|-------|---------|--------|----------|
| HTTPS Enforcement | ❌ No | Add HSTS header | CRITICAL |
| CSP Headers | ❌ No | Add in Vite config | CRITICAL |
| Credentials Exposed | ❌ Yes (.env) | Rotate keys | CRITICAL |
| Input Validation | ✅ Yes (Zod) | Good | - |
| XSS Protection | ⚠️ Partial | Add CSP | HIGH |
| Clickjacking | ❌ No | Add X-Frame-Options | HIGH |
| CORS Handling | ✅ Not needed | N/A | - |
| Error Boundaries | ❌ No | Add | HIGH |
| Error Logging | ⚠️ Unsafe | Sanitize | MEDIUM |
| Rate Limiting | ❌ No | Implement | MEDIUM |
| Type Safety | ❌ No (strict: false) | Enable strict mode | HIGH |
| Dependency Scanning | ❌ No | Run npm audit | MEDIUM |

---

## 🔍 Dependency Security Check

Run these commands to check for vulnerabilities:

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check specific high-risk packages
npm ls @supabase/supabase-js
npm ls react
npm ls framer-motion
```

**Known Safe Versions (Approximately):**
- `@supabase/supabase-js`: ^2.97.0 ✅
- `react`: ^18.3.1 ✅
- `typescript`: ^5.8.3 ✅
- `vite`: ^5.4.19 ✅

---

## 📋 Remediation Roadmap

### Phase 1: CRITICAL (Do Immediately)
- [ ] Rotate Supabase credentials
- [ ] Remove `.env` from git history
- [ ] Update `.gitignore`
- [ ] Enable JWT verification in edge functions
- [ ] Add CSP headers

### Phase 2: HIGH (Within 1 week)
- [ ] Enable TypeScript strict mode
- [ ] Add error boundaries
- [ ] Add HTTP security headers
- [ ] Fix dangerouslySetInnerHTML
- [ ] Reconsider hardcoded contact info

### Phase 3: MEDIUM (Within 1 month)
- [ ] Sanitize console logging
- [ ] Add SRI integrity hashes
- [ ] Implement rate limiting
- [ ] Remove ESLint disable rules
- [ ] Either remove or properly integrate Supabase

### Phase 4: LOW (Enhance)
- [ ] Add service worker / PWA
- [ ] Optimize font loading
- [ ] Create proper robots.txt
- [ ] Add 404 page enhancements

---

## 📚 References & Tools

**Security Testing:**
- OWASP Top 10: https://owasp.org/Top10/
- CSP Evaluator: https://csp-evaluator.withgoogle.com/
- SecurityHeaders: https://securityheaders.com/

**Dependency Scanning:**
- npm audit: `npm audit`
- Snyk: https://snyk.io/
- Dependabot: GitHub built-in

**TypeScript:**
- Enable strict: https://www.typescriptlang.org/tsconfig#strict
- Best practices: https://www.typescriptlang.org/docs/handbook/2/narrowing.html

---

## ✅ Conclusion

Your portfolio is **functionally complete** but has **critical security gaps** that must be addressed before production deployment. The most urgent actions are:

1. ✋ **STOP** - Rotate Supabase credentials immediately
2. 🔐 **Secure** - Add CSP and security headers
3. 🏗️ **Harden** - Enable strict mode and error handling
4. 📦 **Verify** - Run dependency scans

After remediation, this will be a secure, production-ready portfolio.

---

**Audit Conducted By:** GitHub Copilot  
**Report Generated:** April 15, 2026  
**Repository:** nanchong-nexus-works  
**Severity Assessment:** 🔴 CRITICAL ISSUES PRESENT
