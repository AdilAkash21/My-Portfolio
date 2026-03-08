// ─── Vite Configuration ───
// Build tool config for the React application.
// - Uses SWC-based React plugin for fast JSX transformation
// - Sets up path alias "@" → "./src" for clean imports
// - Disables HMR overlay to prevent error popups during development

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // SWC-based React plugin (faster than Babel)
import path from "path";
import { componentTagger } from "lovable-tagger"; // Lovable dev tool for component tagging

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all interfaces (IPv4 + IPv6)
    port: 8080, // Dev server port
    hmr: {
      overlay: false, // Disable the error overlay during hot module replacement
    },
  },
  plugins: [
    react(), // Enable React JSX/TSX support via SWC
    mode === "development" && componentTagger(), // Only tag components in development mode
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // "@/components/..." → "./src/components/..."
    },
  },
}));
