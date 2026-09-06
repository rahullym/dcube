import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Overridden by the Pages workflow, which builds for rahullym.github.io/dcube.
// Local dev and a custom-domain build both serve from the root.
const SITE = process.env.SITE_URL || "https://dcubesalon.com";
const BASE = process.env.BASE_PATH || "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  devToolbar: { enabled: false },

  // Astro already builds `/about/index.html`; saying so explicitly keeps the
  // canonical tags, the sitemap and the internal links on one spelling.
  trailingSlash: "always",
  build: { format: "directory" },

  // The GoDaddy site these pages replace is indexed under its own URLs. Without
  // these, every link and every ranking pointing at /about-us lands on a 404 the
  // day the domain switches over, and the salon starts again from nothing.
  //
  // A static build emits these as meta-refresh pages, which Google follows but
  // treats as weaker than a real 301. `public/_redirects` carries the same map
  // for hosts that do server-side redirects (Netlify, Cloudflare Pages) — use
  // one of those for the cutover if you can.
  redirects: {
    "/about-us": "/about/",
    "/contact-us": "/contact/",
    "/blog": "/",
    "/blog/f/nanoplastia": "/services/",
  },

  integrations: [
    sitemap({
      // Redirect stubs are not real pages; a sitemap should list only the URLs
      // that are meant to be indexed.
      filter: page =>
        !["/about-us", "/contact-us", "/blog", "/blog/f/nanoplastia", "/404"].some(p =>
          new URL(page).pathname.replace(/\/$/, "").endsWith(p),
        ),
      changefreq: "monthly",
      lastmod: new Date(),
      serialize(item) {
        // The home page is the one we most want crawled; the work gallery
        // changes most often.
        // Strip the deploy's base path so /dcube/ and / are both "the home page".
        const path = new URL(item.url).pathname
          .replace(/\/$/, "")
          .replace(BASE.replace(/\/$/, ""), "");
        if (path === "") return { ...item, priority: 1.0, changefreq: "weekly" };
        if (path.endsWith("/gallery")) return { ...item, priority: 0.9, changefreq: "weekly" };
        if (path.endsWith("/services") || path.endsWith("/contact"))
          return { ...item, priority: 0.9 };
        return { ...item, priority: 0.7 };
      },
    }),
  ],
});
