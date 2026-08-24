// GitHub Pages serves a project repo from a sub-path (/dcube), while a custom
// domain serves from the root. Every internal link and asset goes through this
// helper so switching between the two is a single config change, not a rewrite.
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL}/${path}`.replace(/\/{2,}/g, "/");
