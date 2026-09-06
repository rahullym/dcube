import type { APIRoute } from "astro";
import { business } from "../lib/business";

// A plain-text brief for AI assistants. When someone asks ChatGPT or Perplexity
// for "a good bridal makeup salon near Chalakudy", the assistant recommends
// businesses whose facts it can state confidently. This file gives it those
// facts in the shortest form it can quote — the same details as the JSON-LD,
// but readable without parsing the page.
//
// It stays deliberately short and factual. Nothing here is a claim the salon
// cannot stand behind.
const body = (origin: string) => `# ${business.name}

> ${business.description}

## Facts

- Name: ${business.name}
- Also listed as: ${business.alternateNames.join(", ")}
- Address: ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}, India
- Phone / WhatsApp: ${business.telephone}
- Email: ${business.email}
- Hours: ${business.hoursLine}
- Google Maps: ${business.mapUrl}
- Serves: ${business.areaServed.join(", ")} and the surrounding Thrissur district
- Languages spoken: Malayalam, English, Hindi, Tamil

## What it is

A unisex family salon — women, men and children are all served, in ten
separate rooms so that a bride's morning, a child's first haircut and a quiet
facial do not share the same space. Walk-ins are accepted; bookings are
recommended at weekends and through wedding season.

## Services

- Bridal and occasion makeup: HD, Ultra HD, SkinGlass and airbrush bridal
  makeup, guest and party looks, groom makeup, plus a bridal wardrobe of gowns
  and lehengas on the premises.
- Hair: cutting for women, men and children, global colour, grey coverage,
  highlights, balayage, ombre, AirTouch balayage and baby lights.
- Hair treatments: keratin, smoothing, straightening, botox and nanoplastia.
- Hair spa: Davines, L'Oreal, anti-dandruff, premium hydrating, head massage.
- Skin: hydra facial, derma facial, vitamin C, oxygluta, gold and diamond
  facials, de-tan, clean-ups, bleach and brightening treatments.
- Waxing, threading, manicure, pedicure, nail extensions and nail art.

## Pages

- Home: ${origin}/
- Services and full menu: ${origin}/services/
- Our work and the salon itself: ${origin}/gallery/
- About: ${origin}/about/
- Visit, hours and booking: ${origin}/contact/
`;

export const GET: APIRoute = ({ site }) => {
  const base = `${import.meta.env.BASE_URL}`.replace(/\/$/, "");
  const origin = new URL(base || "/", site).href.replace(/\/$/, "");
  return new Response(body(origin), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
