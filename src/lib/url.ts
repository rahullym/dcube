// GitHub Pages serves a project repo from a sub-path (/dcube), while a custom
// domain serves from the root. Every internal link and asset goes through this
// helper so switching between the two is a single config change, not a rewrite.
//
// Page links also come back with a trailing slash, because that is the form
// Astro builds (`/about/index.html`) and the form the sitemap and the canonical
// tags use. Linking to `/about` instead would make every internal click take a
// redirect hop, and would split the signal between two spellings of one URL.
// Assets are left alone — a filename has an extension and never a trailing slash.
export const withBase = (path: string): string => {
  const joined = `${import.meta.env.BASE_URL}/${path}`.replace(/\/{2,}/g, "/");
  const isFile = /\.[a-z0-9]+$/i.test(joined);
  return isFile || joined.endsWith("/") ? joined : `${joined}/`;
};
