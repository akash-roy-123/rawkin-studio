# RawKin — Handmade skincare website

A polished, responsive, editorial-style website for the three-product RawKin handmade skincare collection.

## Stack

- React 19 with TypeScript
- Vite 7
- Custom mobile-first responsive CSS; no component-library dependency
- Static client-side site, suitable for GitHub Pages

## Run locally

Requirements: Node.js 22.12 or newer and internet access to npm.

```bash
npm install
npm run dev
```

Open the localhost URL displayed by Vite (usually http://localhost:5173/).

## Production build

```bash
npm run build
npm run preview
```

`npm run build` runs TypeScript checks and emits the production site to `dist/`.

## Deploy to GitHub Pages

1. Use the `rawkin-studio` public GitHub repository under your account.
2. Push **the contents of this folder**, including `.github/workflows/deploy.yml`, to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Build RawKin responsive storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rawkin-studio.git
   git push -u origin main
   ```

3. In GitHub repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. The `Build and deploy RawKin` GitHub Action will build and deploy the site. Check the Actions tab for build results.
5. For `akash-roy-123/rawkin-studio`, the expected project Pages address (once deployed) is `https://akash-roy-123.github.io/rawkin-studio/`.

The website uses relative asset URLs and a Vite `base: './'` setting, so it can also be deployed to a custom domain.

## Site content and behavior

- Hero and product gallery use **generated, styled studio concept images** of the RawKin product collection, not photographs of the physical products. Packaging appearance is illustrative and may differ from the shipped products.
- Products: Matcha + Chamomile Calming Face Scrub (100 g), Matcha + Peppermint Detoxifying Clay Mask (100 g), Matcha + Vanilla Cooling Lip Balm (5 g).
- Functional responsive mobile menu, homepage section navigation, a dedicated hash-routed `#/contact` page compatible with GitHub Pages, product-detail dialogs, FAQ accordion, and direct Instagram ordering links.
- Order buttons open the brand Instagram profile at `https://www.instagram.com/rawkin.in/`. The Contact page also uses `hellorawkin@gmail.com` from the product label; its form only composes an email draft in the visitor's email app (no hosted forms backend).
- **No prices, checkout, inventory, payment processing, real reviews, or unsupported skincare/medical efficacy claims have been invented.** Order enquiries open the customer's email application.
- Ingredient details for the scrub are limited to the legible packaging supplied. Other product ingredient lists should be confirmed by the brand owner before publishing.

## Before launching publicly

- Have RawKin approve all brand copy, claims, contact information, and photographs.
- Confirm the complete ingredient declarations, directions, batch details, product safety and regulatory label disclosures with the brand owner.
- Confirm the generated studio concept images accurately represent the final shipped packaging; consider adding genuine high-resolution packshots and clearly distinguishing renders where appropriate.
- Add verified pricing, delivery/returns terms, privacy policy and (if required) checkout with an actual commerce provider.
- Use only authentic customer testimonials when obtained with permission.

## Project structure

```text
src/
  App.tsx        # Homepage, contact page, Instagram ordering, product dialogs and FAQ
  main.tsx       # React entry point
  styles.css     # Complete visual design and breakpoints
public/
  images/        # Optimized WebP generated studio concept product visuals
  favicon.svg    # Original RawKin-inspired monogram illustration
.github/workflows/deploy.yml
```