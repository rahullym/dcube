import { defineConfig } from "astro/config";

// Overridden by the Pages workflow, which builds for rahullym.github.io/dcube.
// Local dev and a custom-domain build both serve from the root.
const SITE = process.env.SITE_URL || "https://dcubesalon.com";
const BASE = process.env.BASE_PATH || "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  devToolbar: { enabled: false },
});
