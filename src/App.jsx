import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeCrossfade from "@/components/ThemeCrossfade";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScroll>
          <ThemeCrossfade />
          <CustomCursor />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SmoothScroll>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>;
var stdin_default = App;
export {
  stdin_default as App
};

