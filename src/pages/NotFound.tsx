// ─── 404 Not Found Page ───
// Shown when the user navigates to a route that doesn't exist.
// Logs the attempted path to the console for debugging.
// Provides a link back to the homepage.

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // ✅ SECURITY: Only log in development mode, don't expose paths in production
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404 Error: Page not found at path:", location.pathname);
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
