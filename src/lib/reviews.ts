// Fetches Google Places reviews at build time using the New Places API.
// Falls back to curated defaults if PLACES_API_KEY is not set or the request fails.

export interface Review {
  author: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime?: string;
}

export interface PlaceData {
  /** null until a real figure is confirmed — the UI hides the rating line rather than inventing one. */
  rating: number | null;
  totalRatings: number | null;
  reviews: Review[];
}

const PLACE_ID = "ChIJYSspWmwCCDsR0xCaMNPVWWA"; // DCUBE Beauty Salon, Chalakudy

// Reviews shown when no API key is set.
//
// TODO: replace these with real reviews copied from the Google listing.
// Paste the reviewer's name and their own words — do not paraphrase. Set
// `rating` and `totalRatings` below only once the real figures are confirmed;
// while they are null the site simply omits the star line instead of
// publishing a number nobody has verified.
const CURATED: PlaceData = {
  // Fill these in from the Google listing header, e.g. rating: 4.8, totalRatings: 127.
  // Left null, the site omits the star line rather than showing an unverified figure.
  rating: null,
  totalRatings: null,

  // Paste real reviews here — the reviewer's name and their own wording.
  // Three is the number the home page grid is built for.
  reviews: [
    // {
    //   author: "Name as shown on Google",
    //   rating: 5,
    //   text: "Their review, copied exactly.",
    //   relativeTime: "2 months ago",   // optional
    // },
  ],
};

export async function getPlaceReviews(): Promise<PlaceData> {
  const apiKey = import.meta.env.PLACES_API_KEY;
  if (!apiKey) {
    console.warn("[reviews] PLACES_API_KEY not set — using curated reviews.");
    return CURATED;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });

    if (!res.ok) {
      console.warn(`[reviews] Places API ${res.status} — using curated reviews.`);
      return CURATED;
    }

    const data = await res.json() as any;
    const reviews: Review[] = (data.reviews || []).slice(0, 6).map((r: any) => ({
      author: r.authorAttribution?.displayName ?? "Google Review",
      authorPhoto: r.authorAttribution?.photoUri,
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
    })).filter((r: Review) => r.text);

    if (!reviews.length) return CURATED;

    return {
      rating: data.rating ?? null,
      totalRatings: data.userRatingCount ?? null,
      reviews,
    };
  } catch (err) {
    console.warn("[reviews] fetch failed — using curated reviews:", err);
    return CURATED;
  }
}
