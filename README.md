# მშენპარკი – ბეტონის დეკორატიული ნაკეთობები

Static Georgian-language website (plain HTML/CSS/JS, no build step) – Home, Products, About, Contact.
Live: https://mshenparki.vercel.app

## How the site is built (important for Google + AI search)

All real content – header, footer, phone, address, product cards, FAQ and the structured data (JSON-LD) –
is **plain HTML**, so search engines and AI assistants can read it without running JavaScript.
`site.js` only adds behaviour (mobile menu, product search/filter, quick-view popup, animations).

Crawler / AI files in the root:

| File | Purpose |
|---|---|
| `robots.txt` | allows all crawlers (incl. AI search bots), points to the sitemap |
| `sitemap.xml` | the 4 pages with `lastmod` – update the date when a page changes |
| `llms.txt` | plain-text summary of the business for AI assistants (Georgian + English) |

## Where to edit

- **Phone / address / links** – they appear in each page's header-footer block and the contact page.
  Search the project for `595 53 36 73` and `სულხან-საბას` and change every match, and update the
  `LocalBusiness` JSON-LD in each page `<head>`, plus `llms.txt`.
- **Products** – each product is a `<article class="card">` in `products.html` (and the first 6 on `index.html`).
  When you add or change one, also update: the `Product` node + `ItemList` in the `products.html` JSON-LD,
  the catalog in the `index.html` JSON-LD, and the product list in `llms.txt`.
- **FAQ** – on `index.html`. The visible questions/answers and the `FAQPage` JSON-LD must stay identical.
- **Opening hours** – not published yet (see the commented-out block in `contact.html`). Once confirmed, add the
  row there and add `openingHoursSpecification` to the `LocalBusiness` JSON-LD.
- **Photos** – `images/*.svg` are placeholders for the product cards; replace with real photos (WebP/JPG),
  then add `image` to each `Product` node in the JSON-LD.

## Moving to your own domain

Search & replace `mshenparki.vercel.app` in all `.html` files, `robots.txt`, `sitemap.xml` and `llms.txt`
(canonical, og:url, JSON-LD and sitemap all use it), then re-submit the sitemap in Google Search Console.

## Run locally

    python3 -m http.server 8000
