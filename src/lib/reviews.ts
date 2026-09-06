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
// Copied verbatim from the salon's Google Business listing (Most relevant tab,
// read 6 Sep 2026): https://maps.app.goo.gl/VYELb44NDVMJ7F8a9
// Rating and count are the figures Google showed on that visit. Only the first
// three are rendered on the home page; keep the strongest three at the top and
// leave the rest as spares.
const CURATED: PlaceData = {
  rating: 4.4,
  totalRatings: 420,

  reviews: [
    {
      author: "Anand ms Ramu",
      rating: 5,
      text:
        "I always get my haircut from Ullash ettan at D Cube Salon, and he does an incredible job every single time. " +
        "What makes him special is how he cuts hair according to your face structure\u2014it just suits you perfectly! " +
        "Even as your hair grows out over time, it remains super easy to style and manage. Highly recommended if you want a perfect, haircut!",
      relativeTime: "a month ago",
    },
    {
      author: "Therase Joshy",
      rating: 5,
      text:
        "I had a wonderful experience for my saree draping and makeup. Everything was done beautifully. " +
        "The look was elegant, and I felt confident and comfortable throughout.",
      relativeTime: "a month ago",
    },
    {
      author: "Prince Francis Thottathil",
      rating: 5,
      text:
        "Highly recommend Nayana! She was friendly, professional, and paid great attention to detail. " +
        "She made me feel comfortable throughout the facial, and my skin has never looked better. Thank you for the wonderful experience!",
      relativeTime: "a month ago",
    },
    {
      author: "Bijoy Thomas",
      rating: 5,
      text:
        "Dcube Family Beauty Salon in Chalakudy has been a trusted place for me for years. Recently, my two daughters received " +
        "beautifully done, professional haircuts, and we were very happy with the results. I regularly visit for both hair and " +
        "skincare services, and they consistently deliver exactly what I expect. Their team listens carefully to customer " +
        "preferences, maintains a high level of professionalism, and provides excellent service every time. In my experience, " +
        "there is no other establishment in Chalakudy that matches their quality and customer care. Highly recommended.",
      relativeTime: "4 months ago",
    },
    {
      author: "Jenson M.G",
      rating: 5,
      text:
        "If you are looking for the best grooming experience in Chalakudy, DCUBE Salon is the perfect choice. The salon offers " +
        "exceptional services for both bride and groom, making every special occasion truly memorable. Their bridal and groom " +
        "packages are handled with great professionalism, ensuring a flawless and elegant look. What I really loved is their " +
        "guest makeover services, which are done beautifully at very reasonable prices without compromising quality.",
      relativeTime: "4 months ago",
    },
    {
      author: "Gokul Prasad",
      rating: 5,
      text:
        "Had a really good experience here for my groom makeup and hairstyling. The stylist was friendly, easy to talk to, and " +
        "gave helpful suggestions that suited me well. Everything was done neatly and on time, and I was happy with how it " +
        "turned out. Would recommend for anyone looking for a simple and reliable service.",
      relativeTime: "5 months ago",
    },
    {
      author: "Sujitha Smijay",
      rating: 4,
      text:
        "I had a wonderful experience with the nanoplastia hair treatment at this salon. My hair feels smooth, shiny, and healthy. " +
        "The staff are extremely friendly and welcoming, and the salon maintains great hygiene. I\u2019m truly impressed with the " +
        "results. I visited with my two kids, and they were well taken care of and comfortable during the entire treatment. Highly recommended!",
      relativeTime: "5 months ago",
    },
    {
      author: "Aleena Chirayath",
      rating: 5,
      text:
        "Loved the threading and facial! The staff was friendly, the service was great, and my skin felt fresh and glowing. " +
        "Definitely coming back!",
      relativeTime: "a month ago",
    },
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
