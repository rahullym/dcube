// The salon floor, room by room — mirrors the built interior
// (Ar. Sneha Raju, final interior views, Jan 2026).

export interface Zone {
  slug: string;
  name: string;
  blurb: string;
  image: string;
}

export const zones: Zone[] = [
  {
    slug: "reception",
    name: "Reception & Lobby",
    blurb: "Terracotta walls, a lit D CUBE signage wall and long cushioned benches — the room you wait in without minding the wait.",
    image: "/interiors/reception-01.jpg",
  },
  {
    slug: "hair",
    name: "Hair Studio",
    blurb: "Backlit organic mirrors along a lime-washed wall, each station its own pool of warm light.",
    image: "/interiors/hair-01.jpg",
  },
  {
    slug: "wash",
    name: "Wash Lounge",
    blurb: "A raised terracotta plinth of reclining basins beneath the Choose Your Shade colour wall.",
    image: "/interiors/wash-lounge.jpg",
  },
  {
    slug: "spa",
    name: "Hair Spa",
    blurb: "Three arched mirrors, brass sconces and a single reclining chair. Quiet by design.",
    image: "/interiors/hair-spa.jpg",
  },
  {
    slug: "treatment",
    name: "Treatment Room",
    blurb: "Low light, halo-lit arches and deep seating for keratin, botox and scalp therapies.",
    image: "/interiors/treatment-02.jpg",
  },
  {
    slug: "vip",
    name: "VIP Suites",
    blurb: "Two private rooms with wave-edged backlit mirrors and a basin of your own.",
    image: "/interiors/vip-01.jpg",
  },
  {
    slug: "facial",
    name: "Facial Rooms",
    blurb: "Single and double-bed rooms in soft sand plaster — for facials, peels and skin therapy.",
    image: "/interiors/facial-double.jpg",
  },
  {
    slug: "makeup",
    name: "Makeup Studio",
    blurb: "A row of wavy terracotta mirrors under pendant globes, with a planted garden wall opposite.",
    image: "/interiors/makeup-01.jpg",
  },
  {
    slug: "nails",
    name: "Nails & Photo Corner",
    blurb: "A nail bar beside a full lighting setup, so the look leaves with you in pictures.",
    image: "/interiors/nail-photo.jpg",
  },
  {
    slug: "bridal",
    name: "Bridal Wardrobe",
    blurb: "A glass-fronted boutique of gowns and lehengas, attached to the salon floor.",
    image: "/interiors/bridal-02.jpg",
  },
];

export interface Shot {
  src: string;
  alt: string;
  zone: string;
}

export const shots: Shot[] = [
  { src: "/interiors/reception-01.jpg", alt: "Reception desk and lit D CUBE signage wall", zone: "reception" },
  { src: "/interiors/reception-02.jpg", alt: "Arched brand niches over the lobby benches", zone: "reception" },
  { src: "/interiors/reception-03.jpg", alt: "View through the lobby arches into the salon floor", zone: "reception" },
  { src: "/interiors/hair-01.jpg", alt: "Backlit organic mirrors along the hair studio wall", zone: "hair" },
  { src: "/interiors/hair-02.jpg", alt: "Styling stations with arched display shelving", zone: "hair" },
  { src: "/interiors/hair-03.jpg", alt: "Hair studio looking towards the wash lounge", zone: "hair" },
  { src: "/interiors/hair-04.jpg", alt: "Kids station beside the bridal wardrobe entrance", zone: "hair" },
  { src: "/interiors/hair-05.jpg", alt: "Styling row with framed artwork", zone: "hair" },
  { src: "/interiors/wash-lounge.jpg", alt: "Reclining wash basins under the Choose Your Shade wall", zone: "wash" },
  { src: "/interiors/hair-spa.jpg", alt: "Hair spa with arched mirrors and brass sconces", zone: "spa" },
  { src: "/interiors/treatment-01.jpg", alt: "Treatment room seating under halo-lit arches", zone: "treatment" },
  { src: "/interiors/treatment-02.jpg", alt: "Treatment room arch detail", zone: "treatment" },
  { src: "/interiors/vip-01.jpg", alt: "VIP suite with wave-edged backlit mirror", zone: "vip" },
  { src: "/interiors/vip-02.jpg", alt: "Second VIP suite with pendant globes", zone: "vip" },
  { src: "/interiors/facial-double.jpg", alt: "Double-bed facial room in sand plaster", zone: "facial" },
  { src: "/interiors/facial-single.jpg", alt: "Single-bed facial room with terracotta joinery", zone: "facial" },
  { src: "/interiors/makeup-01.jpg", alt: "Makeup studio mirrors beside the planted wall", zone: "makeup" },
  { src: "/interiors/makeup-02.jpg", alt: "Row of wavy makeup mirrors under pendant globes", zone: "makeup" },
  { src: "/interiors/nail-photo.jpg", alt: "Nail bar and photoshoot corner", zone: "nails" },
  { src: "/interiors/bridal-01.jpg", alt: "Bridal wardrobe storefront with D CUBE signage", zone: "bridal" },
  { src: "/interiors/bridal-02.jpg", alt: "Bridal wardrobe rails and display island", zone: "bridal" },
  { src: "/interiors/bridal-03.jpg", alt: "Bridal wardrobe with circular wall detail", zone: "bridal" },
];
