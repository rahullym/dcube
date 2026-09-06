// Reels from the salon's own Instagram, @dcube_unisexsalon.
//
// Instagram has no public, key-free API for a profile's own grid, so this list
// is refreshed by hand rather than at build time. To add a reel:
//
//   1. Open https://www.instagram.com/dcube_unisexsalon/ and copy the
//      shortcode out of the reel's URL — the segment after `/reel/`.
//   2. Pull its poster frame:
//        curl -L "https://www.instagram.com/p/<shortcode>/media/?size=l" \
//          -o public/reels/<name>.jpg
//   3. Add an entry below, newest first.
//
// The poster is served from our own domain, so the rail costs one small image
// per card and makes no third-party request. Instagram's player is only
// fetched once a visitor actually taps a card to watch.

export interface Reel {
  /** Instagram shortcode — the segment after `/reel/` in the permalink. */
  id: string;
  /** Poster frame, mirrored into `public/reels/`. Portrait, roughly 9:16. */
  poster: string;
  label: string;
  alt: string;
}

export const instagramHandle = "dcube_unisexsalon";
export const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;

/** The permalink for a reel, for the "watch on Instagram" fallback. */
export const reelUrl = (id: string): string => `https://www.instagram.com/reel/${id}/`;

/** The bare player, without Instagram's comment furniture. */
export const reelEmbedUrl = (id: string): string => `https://www.instagram.com/reel/${id}/embed/`;

// Newest first — the rail reads left to right.
export const reels: Reel[] = [
  {
    id: "Dc8IlLQNkJg",
    poster: "/reels/hazelnut-brown.jpg",
    label: "Hazelnut Brown",
    alt: "Long hazelnut-brown hair colour, blow-dried out at D Cube",
  },
  {
    id: "Dc5QZF4NZ0e",
    poster: "/reels/beard-shape.jpg",
    label: "Beard & Curls",
    alt: "A shaped beard and natural curls finished in the men's chair",
  },
  {
    id: "DcsYsJsI7GH",
    poster: "/reels/saree-waves.jpg",
    label: "Saree Glam",
    alt: "Occasion makeup and soft waves with an orange and gold saree",
  },
  {
    id: "DcnJ961o0rA",
    poster: "/reels/occasion-drape.jpg",
    label: "Occasion Drape",
    alt: "A guest styled and draped in an orange and gold saree at reception",
  },
  {
    id: "DclQojcJz8k",
    poster: "/reels/layered-cut.jpg",
    label: "Layered Cut",
    alt: "A long layered cut blow-dried into soft movement",
  },
];
