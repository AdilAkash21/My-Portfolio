// ─── Root Application Component ───
// Sets up all global providers, routing, and lazy-loaded pages

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeCrossfade from "@/components/ThemeCrossfade";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";

// Lazy-load secondary pages to reduce initial bundle size
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <ThemeCrossfade />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* BrowserRouter with v7 future flags to suppress deprecation warnings */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
              <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
              <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
