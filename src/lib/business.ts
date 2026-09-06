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
  ],

  legalName: "D Cube Family Salon",
  description:
    "A unisex family salon in Chalakudy, Thrissur — bridal and party makeup, hair cutting and colour, facials, spa treatments, waxing, threading and nails, across ten purpose-built rooms.",

  telephone: "+91 99460 07990",
  /** E.164, for tel: links and schema. */
  telephoneE164: "+919946007990",
  whatsapp: "https://wa.me/919946007990",
  email: "hello@dcubesalon.com",

  address: {
    streetAddress: "Athirappilly Road, opposite FAS Auditorium, Koodapuzha",
    addressLocality: "Chalakudy",
    /** Google reads addressRegion as the state for Indian addresses. */
    addressRegion: "Kerala",
    postalCode: "680307",
    addressCountry: "IN",
  },

  /** Approximate — anchored on FAS Auditorium, which the salon sits opposite.
   *  Replace with the exact pin from Google Business Profile when convenient;
   *  five decimal places is the precision Google asks for. */
  geo: { latitude: 10.31193, longitude: 76.34230 },

  /** The canonical Google listing. Everything that links to the map uses this. */
  placeId: "ChIJYSspWmwCCDsR0xCaMNPVWWA",
  get mapUrl() {
    return `https://www.google.com/maps/place/?q=place_id:${this.placeId}`;
  },

  // NOTE: these are the hours the site currently advertises. Google Business
  // Profile, Justdial and the old GoDaddy site all say Mon–Sat 9am–9pm, closed
  // Sunday. One of the two is wrong, and a mismatch between the site and the
  // Google listing costs local ranking. Confirm the real hours and make all of
  // them agree.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:00" },
    { days: ["Sunday"], opens: "11:00", closes: "18:00" },
  ] satisfies OpeningHours[],

  /** Human-readable, for page copy. Derived from the block above so the two
   *  can never disagree. */
  get hoursLine() {
    const short = (d: string) => d.slice(0, 3);
    const clock = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      const suffix = h < 12 ? "am" : "pm";
      const hour = h % 12 === 0 ? 12 : h % 12;
      return m ? `${hour}.${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
    };
    return this.openingHours
      .map(h => {
        const days =
          h.days.length > 1
            ? `${short(h.days[0])} – ${short(h.days[h.days.length - 1])}`
            : short(h.days[0]);
        return `${days} · ${clock(h.opens)} – ${clock(h.closes)}`;
      })
      .join(" · ");
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

/** The Halifax studio. A separate place with its own address and phone, so it
 *  is marked up as its own business rather than folded into the Kerala one. */
export const canadaStudio = {
  name: "D Cube Studio Halifax",
  telephone: "+1 902 412 7235",
  telephoneE164: "+19024127235",
  email: "dcubeca@gmail.com",
  address: {
    streetAddress: "3434 Dutch Village Road",
    addressLocality: "Halifax",
    addressRegion: "NS",
    postalCode: "B3N 2S7",
    addressCountry: "CA",
  },
  hoursNote: "By appointment only",
} as const;
