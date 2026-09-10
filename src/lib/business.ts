// Single source of truth for the salon's name, address, phone and hours (its
// "NAP"). Search engines and AI assistants cross-check these against Google
// Business Profile, Justdial, Fresha and Facebook; when the numbers disagree,
// confidence in the listing drops and it gets shown less. So every place these
// details appear — page copy, the footer, the JSON-LD — reads from here, and
// changing them anywhere means changing them once, here, then updating the
// external profiles to match.

export interface OpeningHours {
  /** Schema.org day names, e.g. "Monday". */
  days: string[];
  /** 24-hour "HH:MM". */
  opens: string;
  closes: string;
}

export const business = {
  /** The name to use everywhere, verbatim. Must match Google Business Profile. */
  name: "D Cube Family Salon",

  /** Other names the salon is genuinely listed under, so the entity resolves to
   *  one business rather than four. Not keyword filler — only real variants. */
  alternateNames: [
    "DCUBE Salon",
    "DCUBE Unisex Salon",
    "Dcube Family Beauty Salon",
    /** The name on the Google Business Profile itself. */
    "DCube Beauty Salon",
  ],

  legalName: "D Cube Family Salon",
  description:
    "A unisex family salon in Chalakudy, Thrissur — bridal and party makeup, hair cutting and colour, facials, spa treatments, waxing, threading and nails, across ten purpose-built rooms.",

  telephone: "+91 99460 07990",
  /** E.164, for tel: links and schema. */
  telephoneE164: "+919946007990",
  whatsapp: "https://wa.me/919946007990",
  email: "dcubesalon@gmail.com",

  address: {
    // Verbatim from the Google Business Profile, which formats it
    // "Kidangan's Arcade, Near, St. James Hospital, Chalakudy, Kerala 680307".
    // Matching it exactly is the point — this is the string Google compares the
    // site against. The floor and room numbers live in `addressDetail` below so
    // that visitors get them without the NAP string drifting from the listing.
    streetAddress: "Kidangan's Arcade, near St. James Hospital",
    addressLocality: "Chalakudy",
    /** Google reads addressRegion as the state for Indian addresses. */
    addressRegion: "Kerala",
    postalCode: "680307",
    addressCountry: "IN",
  },

  /** The registered LLP detail from the salon's own card — the floor and room
   *  numbers. Shown to visitors as a wayfinding line; deliberately kept out of
   *  `streetAddress` so the schema keeps matching Google. */
  addressDetail: "Second Floor — Rooms 301/V, 301/T and T1–T3",

  /** Google plus code for the building, as an unambiguous fallback for anyone
   *  whose maps app cannot find the arcade by name. */
  plusCode: "887P+C3 Chalakudy",

  /** The pin Google itself holds for the Kidangan's Arcade building, read off
   *  the live Business Profile — not an approximation. */
  geo: { latitude: 10.313526, longitude: 76.335154 },

  /** The canonical Google listing. Everything that links to the map uses this.
   *  Confirmed to still be the right listing after the move: the profile now
   *  carries the Kidangan's Arcade address, so site and listing agree. */
  placeId: "ChIJYSspWmwCCDsR0xCaMNPVWWA",
  get mapUrl() {
    return `https://www.google.com/maps/place/?q=place_id:${this.placeId}`;
  },

  // Confirmed by the owner. The Google Business Profile, Justdial and the old
  // GoDaddy site still say Mon–Sat 9am–9pm, closed Sunday — those are stale and
  // need updating to match, or the disagreement costs local ranking.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:30" },
    { days: ["Sunday"], opens: "10:00", closes: "19:00" },
  ] satisfies OpeningHours[],

  /** Human-readable, one entry per opening-hours block. Page copy reads from
   *  here so the hours can never drift from the schema above. */
  get hoursLines(): string[] {
    const short = (d: string) => d.slice(0, 3);
    const clock = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      const suffix = h < 12 ? "am" : "pm";
      const hour = h % 12 === 0 ? 12 : h % 12;
      return m ? `${hour}.${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
    };
    return this.openingHours.map(h => {
        const days =
          h.days.length > 1
            ? `${short(h.days[0])} – ${short(h.days[h.days.length - 1])}`
            : short(h.days[0]);
        return `${days} · ${clock(h.opens)} – ${clock(h.closes)}`;
      });
  },

  /** The same, collapsed to a single line. */
  get hoursLine(): string {
    return this.hoursLines.join(" · ");
  },

  /** Rough per-visit spend, as Google asks for it. Keep it honest. */
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Debit Card",

  /** Towns people actually travel from. Used for areaServed and page copy. */
  areaServed: [
    "Chalakudy",
    "Koratty",
    "Kodakara",
    "Angamaly",
    "Irinjalakuda",
    "Athirappilly",
    "Thrissur",
  ],

  /** Every profile that describes this same business. `sameAs` is how a search
   *  engine knows the Justdial page and this site are one entity — which is
   *  also what AI assistants use to decide the business is real. */
  sameAs: [
    "https://www.instagram.com/dcube_unisexsalon/",
    "https://www.facebook.com/dcubesalon/",
    "https://www.justdial.com/Thrissur/Dcube-Family-Beauty-Salon-Opposite-Fass-Auditorium-Chalakudi/9999PX487-X487-131030185345-Q9R9_BZDET",
    "https://www.fresha.com/a/dcube-unisex-salon-india-chalakudy-koodapuzha-dacpwp5u",
    "https://davinesindia.com/pages/store-location/d-cube-unisex-salon-chalakudy",
  ],
} as const;
