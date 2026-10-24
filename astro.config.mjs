import { defineConfig } from "astro/config";

// GitHub Pages serves the site under /<repo>/ unless a custom domain is used.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://michaelromagne.github.io",
  base: process.env.BASE_PATH ?? "/wedding-website",
});
