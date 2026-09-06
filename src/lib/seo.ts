// Builders for the structured data the site publishes.
//
// Two audiences read this. Google uses it to understand that the pages describe
// one salon at one address, and to fill the knowledge panel and local pack. AI
// assistants (AI Overviews, ChatGPT, Perplexity) use it because it is the only
// part of the page that states the facts unambiguously — they recommend
// businesses whose details they can verify, and this is what they verify.
//
// Everything is emitted as one `@graph` per page with stable `@id`s, so the
// salon, the site and the page are cross-referenced rather than repeated.

import { business } from "./business";

const FALLBACK_SITE = "https://dcubesalon.com";

/**
 * Absolute URL for a site-relative path.
 *
 * The base path matters here. On the GitHub Pages deploy the site lives under
 * `/dcube`, so an image referenced as `/logo.png` is really at `/dcube/logo.png`
 * — and an og:image or a schema `image` pointing at the wrong one is a 404 that
 * nothing on the page reveals. Paths that already carry the base are left alone,
 * so callers can pass either form.
 */
export const absolute = (path: string, site: URL | undefined): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const withBase =
    base && !path.startsWith(`${base}/`) && path !== base
      ? `${base}/${path}`.replace(/\/{2,}/g, "/")
      : path;
  return new URL(withBase, site ?? FALLBACK_SITE).href;
};

/** The deployed root — origin plus base path. */
export const siteRoot = (site: URL | undefined): string =>
  absolute("/", site).replace(/\/$/, "");

/** Stable identifiers, anchored on the deployed root so a preview build and the
 *  live site never claim to describe the same node at different addresses. */
export const ids = (site: URL | undefined) => {
  const root = siteRoot(site);
  return {
    salon: `${root}/#salon`,
    website: `${root}/#website`,
  };
};

const postalAddress = (a: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}) => ({ "@type": "PostalAddress", ...a });

/**
 * The salon itself. `BeautySalon` rather than the generic `LocalBusiness`:
 * the specific subtype is what maps the business onto beauty-category queries.
 *
 * Deliberately no `aggregateRating` or `review`. Google does not show star
 * snippets for a business reviewing itself on its own site, and inventing a
 * figure would be worse than omitting one — the real rating lives on the
 * Google listing, which `sameAs` points at.
 */
export const salonSchema = (site: URL | undefined) => {
  const id = ids(site);
  return {
    "@type": "BeautySalon",
    "@id": id.salon,
    name: business.name,
    alternateName: [...business.alternateNames],
    legalName: business.legalName,
    description: business.description,
    url: absolute("/", site),
    telephone: business.telephoneE164,
    email: business.email,
    image: [
      absolute("/interiors/reception-01.jpg", site),
      absolute("/work/bridal-kanjeevaram.jpg", site),
      absolute("/interiors/hair-01.jpg", site),
    ],
    logo: absolute("/logo.png", site),
    address: postalAddress(business.address),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.mapUrl,
    openingHoursSpecification: business.openingHours.map(h => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: business.priceRange,
    currenciesAccepted: business.currenciesAccepted,
    paymentAccepted: business.paymentAccepted,
    areaServed: business.areaServed.map(name => ({ "@type": "City", name })),
    sameAs: [...business.sameAs],
    knowsLanguage: ["ml", "en", "hi", "ta"],
  };
};

export const websiteSchema = (site: URL | undefined) => ({
  "@type": "WebSite",
  "@id": ids(site).website,
  url: absolute("/", site),
  name: business.name,
  inLanguage: "en-IN",
  publisher: { "@id": ids(site).salon },
});

/** Ties the page to the salon and the site, and names its lead image. */
export const webPageSchema = (opts: {
  site: URL | undefined;
  canonical: string;
  title: string;
  description: string;
  image: string;
  breadcrumb?: { name: string; path: string }[];
}) => {
  const id = ids(opts.site);
  const page: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": opts.canonical,
    url: opts.canonical,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": id.website },
    about: { "@id": id.salon },
    primaryImageOfPage: { "@type": "ImageObject", url: opts.image },
    inLanguage: "en-IN",
  };
  if (opts.breadcrumb?.length) {
    page.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        // The last crumb is the current page, which by convention carries no
        // item URL — it is where the reader already is.
        ...(i < opts.breadcrumb!.length - 1
          ? { item: absolute(b.path, opts.site) }
          : {}),
      })),
    };
  }
  return page;
};

/** A published question and its answer, for the FAQ block. Question text has to
 *  appear on the page too — markup that answers something the reader cannot see
 *  is a guidelines violation, not a shortcut. */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** The service menu, as a catalog attached to the salon. This is what lets a
 *  search for "keratin treatment Chalakudy" resolve to this business. */
export const offerCatalogSchema = (
  site: URL | undefined,
  groups: { title: string; items: string[] }[],
) => ({
  "@type": "OfferCatalog",
  name: `Services at ${business.name}`,
  url: absolute("/services/", site),
  provider: { "@id": ids(site).salon },
  itemListElement: groups.map(g => ({
    "@type": "OfferCatalog",
    name: g.title,
    itemListElement: g.items.map(item => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item,
        serviceType: g.title,
        provider: { "@id": ids(site).salon },
        areaServed: { "@type": "City", name: business.address.addressLocality },
      },
    })),
  })),
});
