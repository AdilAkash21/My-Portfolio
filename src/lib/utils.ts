// ─── Utility Functions ───

import { clsx, type ClassValue } from "clsx"; // Conditional class name builder
import { twMerge } from "tailwind-merge"; // Merges Tailwind classes, resolving conflicts

// cn() — combines and deduplicates Tailwind CSS class names.
// Example: cn("px-4 py-2", isActive && "bg-primary", className)
// Uses clsx for conditional logic and twMerge to handle conflicting utilities.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
