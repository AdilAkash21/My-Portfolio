// ─── Root Application Component ───
// Sets up all global providers, routing, and lazy-loaded pages

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"; // Radix-based toast notifications
import { Toaster as Sonner } from "@/components/ui/sonner"; // Sonner toast notifications (alternative style)
import { TooltipProvider } from "@/components/ui/tooltip"; // Global tooltip context
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Server state management
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Client-side routing
import { AuthProvider } from "@/contexts/AuthContext"; // Authentication state provider
import { ThemeProvider } from "@/contexts/ThemeContext"; // Theme (dark/batman) state provider
import ThemeCrossfade from "@/components/ThemeCrossfade"; // Full-screen overlay for smooth theme transitions
import Index from "./pages/Index"; // Main landing page (eagerly loaded for fast initial render)

// Lazy-load secondary pages to reduce initial bundle size
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a single QueryClient instance for React Query caching
const queryClient = new QueryClient();

const App = () => (
  // QueryClientProvider — enables data fetching/caching throughout the app
  <QueryClientProvider client={queryClient}>
    {/* ThemeProvider — manages dark/batman theme state and applies CSS class to <html> */}
    <ThemeProvider>
    {/* ThemeCrossfade — renders a brief full-screen color overlay when theme changes */}
    <ThemeCrossfade />
    <TooltipProvider>
      {/* Toast notification containers */}
      <Toaster />
      <Sonner />
      {/* BrowserRouter — enables client-side URL routing */}
      <BrowserRouter>
        {/* AuthProvider — listens to auth state changes and provides user/session context */}
        <AuthProvider>
          {/* Suspense — shows nothing (fallback={null}) while lazy pages load */}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
