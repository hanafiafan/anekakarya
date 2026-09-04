# Aneka Karya — Boyolali Export Platform

Bilingual (EN/ID) B2B export platform connecting Boyolali's UMKM to global buyers.
Model: **inquiry / RFQ** (no checkout/payment). Built with **Vite + React + TS + Tailwind v4 + React Router**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/ (also regenerates public/sitemap.xml)
```

## Production activation (env vars)

Set these in Coolify → the app → Environment, then redeploy. Both are optional —
without them the site still works (forms accept + log in demo mode; no analytics).

| Variable | What it does | How to get it |
| --- | --- | --- |
| `VITE_WEB3FORMS_KEY` | Delivers RFQ / inquiry / registration form submissions to your inbox by email (no backend needed). | Free access key from https://web3forms.com (enter your email, copy the key). |
| `VITE_PLAUSIBLE_DOMAIN` | Enables privacy-friendly page analytics. Set to `anekakarya.run-web.tech`. | A Plausible account (plausible.io) with the domain added. |

These are `VITE_`-prefixed, so they're read at **build time** — redeploy after changing.

## Add the real photos (one step)

The app looks for 12 images in `public/photos/`. Until they're present, it shows
tasteful on-brand gradient placeholders. Copy your Midjourney assets in with these
exact names (run in **your own Terminal**, which has Downloads access):

```bash
SRC="$HOME/Downloads/aneka karya moodboard"
DEST="$HOME/aneka-karya/public/photos"
mkdir -p "$DEST"
cp "$SRC"/*Aerial_view*ee95355c*_3.png "$DEST/highlands-a.png"
cp "$SRC"/*Aerial_view*67a42245*_0.png "$DEST/highlands-b.png"
cp "$SRC"/*Dairy_cows*_3.png            "$DEST/dairy-cows.png"
cp "$SRC"/*dairy_farmer*_1.png          "$DEST/farmer.png"
cp "$SRC"/*warehouse*_1.png             "$DEST/warehouse.png"
cp "$SRC"/*seaport*_3.png               "$DEST/seaport.png"
cp "$SRC"/*Soft_abstract*_1.png         "$DEST/gradient.png"
cp "$SRC"/*artisan_hands*_1.png         "$DEST/copper-hands.png"
cp "$SRC"/*copper_handicraft_vessels*_1.png "$DEST/copper-vessels.png"
cp "$SRC"/*processed_food*_3.png        "$DEST/food.png"
cp "$SRC"/*handwoven_textiles*_3.png    "$DEST/textiles.png"
cp "$SRC"/*Texture_study*_2.png         "$DEST/linen.png"
```

Refresh the browser — the real photos replace the placeholders everywhere,
including the cinematic landing scenes.

## Structure

```
src/
  data.ts            catalog seed: categories, UMKM, products (bilingual)
  i18n.tsx           EN/ID dictionary + provider + useI18n()
  components/
    CinematicStory   scroll-driven landing hero (highlands -> warehouse -> port -> ocean -> globe)
    RoutesGlobe      lightweight SVG globe + animated shipping routes
    rfq.tsx          RFQ modal + global open() context
    Layout, cards, ui
  pages/             Home, Catalog, Category, Umkm, Product, About, HowItWorks, Contact
```

## Next steps

- **RFQ**: currently logs the payload and shows success. Wire an email provider
  (e.g. Resend) or a form endpoint in `src/components/rfq.tsx` -> `submit()`.
- **Cinematic**: scene images can later be swapped for exported Midjourney video
  frame-sequences for true scroll-scrubbing.
- **Globe**: SVG stand-in; swap for `globe.gl` if real-time 3D is wanted.
- **Deploy (SPA routing)**: add a catch-all rewrite to `index.html`
  (Vercel: `{"rewrites":[{"source":"/(.*)","destination":"/"}]}`).
