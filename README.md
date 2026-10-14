# მშენპარკი – ბეტონის დეკორატიული ნაკეთობანი

Static Georgian-language website (plain HTML/CSS/JS, no build step), modeled on the structure of the
Kutaisi Stone Factory site: home, products (search + category filter + quick view), about, contact.

## What to edit

Everything business-specific lives at the top of **`site.js`**:

- `SITE` – phone, email, address, hours, Facebook/Instagram links, optional Google Maps embed URL.
- `CATEGORIES` and `PRODUCTS` – the catalog. Put real photos in `images/` and point `img` at them.

The current `images/*.svg` files are placeholders; replace them with real product photos (JPG/WebP).
Page text in `aboutus.html` (marked `TODO`) is generic and should be replaced with the real company story.

## Run locally

    python3 -m http.server 8000

## Deploy

Works on GitHub Pages, Netlify, Cloudflare Pages or any static host – upload the folder as is.
The contact form has no backend: it opens the visitor's email app prefilled (set a real `email` in `site.js`).
