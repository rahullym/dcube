// Photography of the craft itself, as opposed to the rooms in `zones.ts`.
//
// IMPORTANT: the files in /public/work are licensed stock photographs standing
// in until real work from the salon is available. They are generic by nature —
// swapping in your own clients is the single biggest upgrade this site can get.
// To replace one, drop a file into /public/work and point the entry at it.
// Nothing else needs to change.

export interface Shot {
  src: string;
  alt: string;
  label: string;
  /** false for the real interior renders, which need no warming */
  stock?: boolean;
}

export const lookbook: Shot[] = [
  { src: "/work/stylist-blowdry.jpg", alt: "A stylist blow-drying a client's hair", label: "Hair Studio", stock: true },
  { src: "/work/makeup-application.jpg", alt: "Makeup being applied to a client", label: "Makeup", stock: true },
  { src: "/work/hair-styling.jpg", alt: "Long hair being curled and styled", label: "Styling", stock: true },
  { src: "/work/nails-service.jpg", alt: "A technician working at the nail bar", label: "Nail Bar", stock: true },
  { src: "/work/mens-grooming.jpg", alt: "A client having a beard shaped", label: "Grooming", stock: true },
  { src: "/work/hair-long.jpg", alt: "Long styled hair after treatment", label: "Hair Spa", stock: true },
];

// One image per service house on the home page. Where no photograph of the
// craft exists yet, the real room stands in — which is honest and on-brand.
export const serviceMedia: Record<string, Shot> = {
  bridal:  { src: "/work/makeup-application.jpg", alt: "Bridal makeup being applied", label: "Bridal", stock: true },
  hair:    { src: "/work/stylist-blowdry.jpg", alt: "A stylist at work in the hair studio", label: "Hair", stock: true },
  skin:    { src: "/interiors/facial-double.jpg", alt: "The double-bed facial room", label: "Skin" },
  spa:     { src: "/work/hair-long.jpg", alt: "Hair after a spa treatment", label: "Spa", stock: true },
  makeup:  { src: "/work/makeup-products.jpg", alt: "Makeup products laid out", label: "Makeup", stock: true },
  nails:   { src: "/work/nails-hands.jpg", alt: "Manicured nails", label: "Nails", stock: true },
};
