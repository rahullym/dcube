// Real work from the salon. Every image here is D Cube's own photography —
// no stock. Rooms live separately in `zones.ts`.

export interface Shot {
  src: string;
  alt: string;
  label: string;
}

// The look book leads the home page: what people come here for.
export const lookbook: Shot[] = [
  { src: "/work/bridal-kanjeevaram.jpg", alt: "A bride in a cream and violet Kanjeevaram saree with temple jewellery", label: "Bridal" },
  { src: "/work/bridal-kundan.jpg", alt: "Bridal makeup with a green and gold kundan maang tikka", label: "Bridal Makeup" },
  { src: "/work/party-curls.jpg", alt: "Soft curls and party makeup in a blue embroidered outfit", label: "Party Look" },
  { src: "/work/groom-beard.jpg", alt: "A groom with shaped beard and styled hair in an embroidered kurta", label: "Groom" },
  { src: "/work/reception-gown.jpg", alt: "A reception gown look with a sleek braided updo", label: "Reception" },
  { src: "/work/bridal-navy.jpg", alt: "A bride in navy and gold with a gold choker and mehendi", label: "Bridal" },
  { src: "/work/groom-kurta.jpg", alt: "A groom in a cream kurta with a sharp cut and trimmed beard", label: "Grooming" },
];

// One image per service. Where there is no photograph of the work yet, the
// real room stands in — honest, and still ours.
export const serviceMedia: Record<string, Shot> = {
  bridal: { src: "/work/bridal-kanjeevaram.jpg", alt: "A bride in a Kanjeevaram saree with temple jewellery", label: "Bridal" },
  hair:   { src: "/work/party-curls.jpg", alt: "Soft curls styled at the salon", label: "Hair" },
  makeup: { src: "/work/bridal-kundan.jpg", alt: "Makeup finished with a kundan maang tikka", label: "Makeup" },
  groom:  { src: "/work/groom-beard.jpg", alt: "A groom with shaped beard and styled hair", label: "Groom" },
  skin:   { src: "/interiors/facial-double.jpg", alt: "The double-bed facial room", label: "Skin" },
  nails:  { src: "/interiors/nail-photo.jpg", alt: "The nail bar and photo corner", label: "Nails" },
};
