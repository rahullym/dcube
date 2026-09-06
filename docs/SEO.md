# SEO

What the site does for search, and what still has to happen outside it.

The salon competes in one small market: people within a short drive of
Chalakudy who are about to book a haircut, a facial, or a wedding morning.
Almost all of that traffic arrives through Google's local pack and map — not
through a national keyword — so the work splits into two halves. The site
handles one half. The Google Business Profile handles the other, and it is
the larger of the two.

## What the site now does

**One canonical address per page.** `trailingSlash: "always"` in
`astro.config.mjs`, `withBase()` returning trailing-slashed page links, and a
`<link rel="canonical">` on every page all agree on one spelling of each URL.
Without that agreement the same page accumulates ranking signal under two
addresses and ranks as well as neither.

**A sitemap and a robots.txt.** `sitemap-index.xml` lists only the five real
pages — no redirect stubs, no 404. `robots.txt` is generated at build time
(`src/pages/robots.txt.ts`) so its sitemap line always names the domain the
build is for, and it names the AI crawlers explicitly so nobody later tightens
the file and silently cuts the salon out of AI answers.

**Structured data.** `src/lib/seo.ts` emits one `@graph` per page: the salon as
a `BeautySalon` (the specific subtype, not generic `LocalBusiness`), the
Halifax studio as its own entity, the site, the page, a breadcrumb trail, an
`OfferCatalog` of all 101 services, and an `FAQPage` on the contact page.

There is deliberately **no `aggregateRating` or `review`** in the markup.
Google does not show star snippets for a business that reviews itself on its
own site, and the real rating lives on the Google listing that `sameAs` points
at. If you want the stars, earn them on Google — not in JSON.

**One source of truth for the salon's details.** `src/lib/business.ts`. Name,
address, phone, hours, service area, profile links. Page copy, the footer and
the JSON-LD all read from it, so the site can never disagree with itself.

**The address in text.** The contact page and the footer print the street
address rather than only linking to a map pin. A crawler cannot read what is
behind a Maps link, and the address is the strongest local signal a page has.

**Answer-shaped content.** The contact page's FAQ answers each question in
full sentences that stand on their own, and names the town in the answer. That
is the shape a featured snippet or an AI assistant can lift verbatim.
`llms.txt` states the same facts in the shortest quotable form.

**A preview that stays out of the index.** The GitHub Pages deploy sets
`PUBLIC_NOINDEX=true`, which forces `noindex` and a `Disallow: /` robots.txt.
Two indexable copies of one site compete with each other; drop the flag (along
with `SITE_URL` and `BASE_PATH`) when the site moves to the real domain.

**Redirects for the URLs the old site is indexed under.** `/about-us`,
`/contact-us`, `/blog` and `/blog/f/nanoplastia` all point at their new homes,
in `astro.config.mjs` and in `public/_redirects`.

## Before the domain switches over

`dcubesalon.com` currently serves a GoDaddy Website Builder site. That site,
not this one, is what Google has indexed. Switching the domain over is the
single riskiest moment in this whole plan.

1. **Serve the redirects properly.** GitHub Pages can only emit meta-refresh
   stubs, which Google follows but discounts. Netlify or Cloudflare Pages will
   serve `public/_redirects` as real 301s. Prefer one of those for the cutover.
2. **Verify the domain in Google Search Console** before the switch, so you can
   watch the transition instead of guessing at it.
3. **Submit `https://dcubesalon.com/sitemap-index.xml`** in Search Console the
   day the new site goes live.
4. **Update the website link on Google Business Profile** and on every
   directory listed under `sameAs` in `src/lib/business.ts`.
5. **Expect a dip.** Rankings wobble for two to six weeks after a rebuild on
   the same domain. That is normal; it is not a reason to start changing things.

## Two facts to confirm first

**Opening hours.** `src/lib/business.ts` says Mon–Sat 10am–8pm and Sunday
11am–6pm. Google Business Profile, Justdial and the old GoDaddy site all say
Mon–Sat 9am–9pm, closed Sunday. Both cannot be right, and a site that
contradicts its own Google listing is treated as less trustworthy. Decide
which is true, change it in `business.ts`, and change the listings to match.

**The business name.** The salon is currently listed as "DCUBE SALON",
"Dcube Family Beauty Salon", "Dcube unisex salon India", "D Cube Unisex
Salon" and — on the old site's own page title — "Wella Beauty Salon". Pick
one, put it in `business.ts`, and rename every listing to match it exactly.
Name consistency across citations is a direct local ranking factor.

**The map pin.** `business.geo` is anchored on FAS Auditorium, which the salon
sits opposite — accurate to within a hundred metres or so. Replace it with the
exact coordinates from Google Business Profile when convenient.

## The half of local SEO that is not in this repo

Google Business Profile signals carry roughly a third of local pack ranking —
more than everything on this site combined. In rough order of return:

1. **Complete the Google Business Profile.** Primary category "Beauty salon",
   secondary categories for hair salon, makeup artist, nail salon, waxing
   service. Every service listed. Correct hours, including holidays. A
   complete profile outranks an incomplete one even when the incomplete one is
   physically closer to the searcher.
2. **Post photographs regularly.** Google can see when a photo was uploaded,
   and a profile with recent activity ranks above a dormant one. The salon
   already produces this content for Instagram; it costs nothing to also post
   it to the profile.
3. **Ask for reviews, consistently.** Review count, average and recency all
   feed both ranking and the booking decision. Roughly nine in ten people read
   reviews before choosing a local business. Ask at the chair, after the
   service, while the guest is happy.
4. **Reply to every review**, including the critical ones. The Justdial
   reviews mention delays from booking mix-ups — a public, specific reply to
   that does more good than another five-star review does.
5. **Fix the citations.** Justdial, Fresha, Sulekha, Quickerala, Bharatibiz,
   Facebook and the Davines store locator all carry a version of the salon's
   details. Make the name, address, phone and hours identical across all of
   them. Inconsistency here is what makes an AI assistant leave a business out
   of a recommendation entirely.

## Worth doing next, on the site

- **Dedicated pages for the money queries.** "Bridal makeup in Chalakudy" is
  the single highest-value search this salon can win, and it currently has no
  page of its own — only a section on the home page. A real page, with real
  bridal work, real prices and real answers, would outrank a section. The same
  argument applies to keratin and smoothing, and to hydra facials.
- **Publish prices.** The about page promises "rates on the wall", but the
  menu carries no numbers. Prices are what people search for, and a page with
  them beats one without.
- **An image sitemap.** The gallery is the salon's strongest asset and Google
  Images is a real source of local discovery. `@astrojs/sitemap` does not emit
  image entries; a small custom route could.
- **Serve images through `astro:assets`.** Everything in `public/` bypasses
  Astro's image pipeline — no WebP, no AVIF, no `srcset`. Moving the gallery
  into `src/assets/` would cut the page weight substantially, and Core Web
  Vitals are a ranking factor on the mobile connections most of these visitors
  are on.

## A note on dependencies

`@astrojs/sitemap` is pinned to exactly `3.2.1`. Version 3.7.x reads a `routes`
argument that Astro 4's `astro:build:done` hook does not pass, and the build
fails with `Cannot read properties of undefined (reading 'reduce')`. Unpin it
only together with an upgrade to Astro 5.
