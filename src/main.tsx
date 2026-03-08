// ─── Application Entry Point ───
// Mounts the root React component into the DOM

import { createRoot } from "react-dom/client"; // React 18 createRoot API for concurrent rendering
import App from "./App.tsx"; // Root application component
import "./index.css"; // Global styles, design tokens, and Tailwind directives

// Find the #root div in index.html and render the App component into it
createRoot(document.getElementById("root")!).render(<App />);
