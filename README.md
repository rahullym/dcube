# DCUBE Salon

Marketing site for DCUBE Salon — unisex beauty, bridal, and family salon.

Built with [Astro](https://astro.build).

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

## Build

```bash
npm run build      # outputs static site to ./dist
npm run preview    # preview the production build locally
```

## Deploy

The output in `./dist` is a fully static site — deploy to any static host:

- **Netlify / Vercel / Cloudflare Pages**: connect the repo; build command `npm run build`, publish directory `dist`.
- **GitHub Pages / S3**: upload the contents of `dist`.

## Structure

```
src/
  layouts/Layout.astro         # base HTML shell, fonts, header/footer
  components/
    Header.astro               # sticky nav + mobile menu
    Footer.astro               # footer + scroll-reveal + lightbox script
    PageHeader.astro           # interior page banner
    ServiceCard.astro          # reusable service tile
  pages/
    index.astro                # home
    services.astro             # services & pricing
    about.astro                # about / values
    gallery.astro              # gallery grid (click to lightbox)
    contact.astro              # booking form + studio info
  styles/global.css            # design system
public/
  favicon.svg
```

## Next steps

- Wire the booking form to a backend (Formspree, Netlify Forms, or a custom endpoint).
- Replace stock Unsplash imagery in `gallery.astro` and the home hero with real salon photos.
- Optional: add a blog using Astro Content Collections (`src/content/blog`).
- Optional: add account/auth + real booking with a service like Calendly, Square Appointments, or a custom backend.
