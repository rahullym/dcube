import type { APIRoute } from "astro";

// Generated rather than dropped in `public/` so the sitemap line always points
// at the domain this build is for — the GitHub Pages preview and the live
// custom domain would otherwise advertise each other's sitemap.
//
// The named AI crawlers are listed explicitly because they are the ones that
// decide whether an assistant can recommend the salon by name. A default-allow
// robots.txt already permits them; naming them is a deliberate, readable "yes"
// so nobody later tightens the file and silently cuts the salon out of AI
// answers. Split into two groups: the ones that fetch a page to answer a live
// question, and the ones that crawl for model training.
const robots = (sitemap: string) => `# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Search crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

# Answer engines — these fetch pages to cite them in live answers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Google-Extended
Allow: /

# Training crawlers — allowed, so the salon is known and not only looked up
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: meta-externalagent
Allow: /

Sitemap: ${sitemap}
`;

// A preview deploy says so plainly, rather than inviting crawlers into a
// second copy of the site.
const previewRobots = `# Preview build — not the live site.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = ({ site }) => {
  if (import.meta.env.PUBLIC_NOINDEX === "true") {
    return new Response(previewRobots, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  // On a sub-path deploy the sitemap lands under the base, not at the origin
  // root. (Crawlers only ever read robots.txt from the origin root, so this
  // file is really for the custom-domain build — it just stays correct either way.)
  const path = `${import.meta.env.BASE_URL}/sitemap-index.xml`.replace(/\/{2,}/g, "/");
  return new Response(robots(new URL(path, site).href), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
