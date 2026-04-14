/**
 * Contact Configuration
 * This file stores contact information in a centralized location.
 * Sensitive data can be moved to environment variables in production.
 */

export const CONTACT_CONFIG = {
  location: "Nanchong, China",
  location_map_url: "https://maps.google.com/?q=Nanchong,China",
  email: "adilakash23@gmail.com",
  email_mailto: "mailto:adilakash23@gmail.com",
  github_username: "AdilAkash21",
  github_url: "https://github.com/AdilAkash21",
  phone: "+86 17390219212",
  phone_tel: "tel:+8617390219212",
} as const;

// Batman mode (privacy mode) variants
export const BATMAN_MODE_CONFIG = {
  location: "Gotham City",
  location_map_url: undefined,
  email: "████████@████.███",
  email_mailto: undefined,
  github_username: "██████████",
  github_url: undefined,
  phone: "███ ████████████",
  phone_tel: undefined,
} as const;
