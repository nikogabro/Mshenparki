/* ==========================================================
   მშენპარკი – site config + shared behaviour
   EDIT THE CONFIG AND PRODUCTS BELOW. Everything else updates itself.
   ========================================================== */
const SITE = {
  name: "მშენპარკი",
  tagline: "ბეტონის დეკორატიული ნაკეთობები",
  url: "https://mshenparki.vercel.app", // no trailing slash; change if you get a custom domain
  logo: "images/logo-192.webp", // round logo shown top-left in the header
  ogImage: "images/og-cover.jpg", // 1200x630 JPG photo, used for Facebook/Google previews
  phone: "+995 595 53 36 73", // display
  phoneHref: "+995595533673", // used for tel: links (tap to call)
  address: "ქუთაისი, სულხან-საბას #8", // shown on the site
  street: "სულხან-საბას #8", // street only, used for Google structured data
  city: "ქუთაისი",
  mapsLink: "https://maps.app.goo.gl/Hobdk3vgTHUfjnFu5", // opens Google Maps (app on phones)
  hours: "ორშაბათი – შაბათი, 10:00 – 18:00", // TODO
  facebook: "https://www.facebook.com/p/Mshenparki-%E1%83%91%E1%83%94%E1%83%A2%E1%83%9D%E1%83%9C%E1%83%98%E1%83%A1-%E1%83%93%E1%83%94%E1%83%99%E1%83%9D%E1%83%A0%E1%83%90%E1%83%A2%E1%83%98%E1%83%A3%E1%83%9A%E1%83%98-%E1%83%9C%E1%83%90%E1%83%99%E1%83%94%E1%83%97%E1%83%9D%E1%83%91%E1%83%90%E1%83%9C%E1%83%98-61594973662312/",
  instagram: "", // optional – leave empty to hide
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2807.31949592681!2d42.66557937592496!3d42.247477771203535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405cf39ccd3ff287%3A0x21be64933b7b8598!2zTXNoZW5wYXJraSAtIOGDkeGDlOGDouGDneGDnOGDmOGDoSDhg5Phg5Thg5nhg53hg6Dhg5Dhg6Lhg5jhg6Phg5rhg5gg4YOc4YOQ4YOZ4YOU4YOX4YOd4YOR4YOQ4YOc4YOY!5e1!3m2!1ska!2sge!4v1792091716881!5m2!1ska!2sge", // Google Maps embed src
  founded: "", // optional, e.g. "2018"
};

const CATEGORIES = {
  garden: "ბაღი და ეზო",
  fence: "ღობე და მოაჯირი",
  paving: "მოპირკეთება",
};

// TODO: replace with the real product list + real photos in /images
const PRODUCTS = [
  { id: "pot", cat: "garden", name: "ყვავილის ქოთნები", img: "images/pot.svg", desc: "სხვადასხვა ზომის დეკორატიული ბეტონის ქოთნები ეზოსა და ტერასისთვის." },
  { id: "urn", cat: "garden", name: "ურნები", img: "images/urn.svg", desc: "კლასიკური ფორმის ურნები შესასვლელისა და ბაღის გასალამაზებლად." },
  { id: "bench", cat: "garden", name: "ბაღის სკამები", img: "images/bench.svg", desc: "გამძლე ბეტონის სკამები პარკებისა და ეზოებისთვის." },
  { id: "fence", cat: "fence", name: "ღობის პანელები", img: "images/fence.svg", desc: "დეკორატიული ღობის სექციები და ბოძები სხვადასხვა ფაქტურით." },
  { id: "baluster", cat: "fence", name: "მოაჯირი", img: "images/baluster.svg", desc: "ბეტონის კოლონები და მოაჯირები კიბეებისა და ტერასებისთვის." },
  { id: "block", cat: "fence", name: "დეკორატიული ბლოკი", img: "images/block.svg", desc: "ორნამენტული ბლოკები ღობეებისა და ფასადებისთვის." },
  { id: "tile", cat: "paving", name: "ქვაფენილი", img: "images/tile.svg", desc: "ეზოსა და ტროტუარისთვის განკუთვნილი დეკორატიული ფილები." },
  { id: "curb", cat: "paving", name: "ბორდიური", img: "images/curb.svg", desc: "საბორდიურე ქვები ბილიკებისა და გზის ზოლებისთვის." },
  { id: "panel", cat: "paving", name: "კედლის პანელები", img: "images/panel.svg", desc: "ქვის იმიტაციის ბეტონის პანელები ფასადის მოსაპირკეთებლად." },
];

/* ---------- shared header / footer ---------- */
const NAV = [
  ["index.html", "home", "მთავარი"],
  ["products.html", "products", "პროდუქცია"],
  ["aboutus.html", "about", "ჩვენ შესახებ"],
  ["contact.html", "contact", "კონტაქტი"],
];

function renderChrome() {
  const page = document.body.dataset.page;
  const links = NAV.map(([href, key, label]) =>
    `<a href="${href}" class="${key === page ? "active" : ""}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <div class="wrap bar">
        <a class="brand" href="index.html" aria-label="${SITE.name}">
          <img src="${SITE.logo}" alt="" width="52" height="52">
          <span>${SITE.name}</span>
        </a>
        <nav class="nav" aria-label="მთავარი ნავიგაცია">${links}</nav>
        <button class="burger" id="burger" aria-label="მენიუ" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
      <nav class="mobile-nav" id="mobileNav">${links}</nav>
    </header>`);

  const social = [
    SITE.facebook && `<a href="${SITE.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>`,
    SITE.instagram && `<a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>`,
  ].filter(Boolean).join("");

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="wrap foot-grid">
        <div>
          <div class="foot-brand">${SITE.name}</div>
          <p>${SITE.tagline}</p>
          <div class="social">${social}</div>
        </div>
        <div>
          <h4>გვერდები</h4>
          <div class="foot-links">${links}</div>
        </div>
        <div>
          <h4>კონტაქტი</h4>
          <p><i class="fa-solid fa-phone"></i> <a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
          <p><i class="fa-solid fa-location-dot"></i> <a href="${SITE.mapsLink}" target="_blank" rel="noopener noreferrer">${SITE.address}</a></p>
        </div>
      </div>
      <div class="copy">© ${new Date().getFullYear()} ${SITE.name}. ყველა უფლება დაცულია.</div>
    </footer>`);

  const burger = document.getElementById("burger");
  const mnav = document.getElementById("mobileNav");
  burger.addEventListener("click", () => {
    const open = mnav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  mnav.addEventListener("click", (e) => { if (e.target.tagName === "A") burger.click(); });

  // fill any [data-site="key"] element
  document.querySelectorAll("[data-site]").forEach((el) => {
    const v = SITE[el.dataset.site];
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-tel]").forEach((el) => (el.href = "tel:" + SITE.phoneHref));
  document.querySelectorAll("[data-map]").forEach((el) => (el.href = SITE.mapsLink));
  document.querySelectorAll("[data-fb]").forEach((el) => {
    if (SITE.facebook) el.href = SITE.facebook; else el.remove();
  });
}

/* ---------- SEO: structured data (JSON-LD) ----------
   Placeholder values (anything containing X) are skipped automatically,
   so fake data never reaches Google. Fill in SITE above and it appears. */
function initSEO() {
  const page = document.body.dataset.page;
  const real = (v) => v && !/X/.test(v);
  const abs = (p) => `${SITE.url}/${p}`;
  const data = [];

  if (page === "home") {
    const biz = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE.name,
      description: `${SITE.tagline}: ქოთნები, ურნები, ღობის პანელები, მოაჯირი, ქვაფენილი და ბორდიური ეზოსა და ფასადისთვის.`,
      url: `${SITE.url}/`,
      image: abs(SITE.ogImage),
      sameAs: [SITE.facebook, SITE.instagram].filter(Boolean),
    };
    if (real(SITE.phoneHref)) biz.telephone = SITE.phoneHref;
    biz.hasMap = SITE.mapsLink;
    if (SITE.street) {
      biz.address = { "@type": "PostalAddress", streetAddress: SITE.street, addressCountry: "GE" };
      if (SITE.city) biz.address.addressLocality = SITE.city;
    }
    if (SITE.founded) biz.foundingDate = SITE.founded;
    data.push(biz);
  } else {
    const item = NAV.find(([, key]) => key === page);
    if (item) {
      data.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAV[0][2], item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: item[2], item: abs(item[0]) },
        ],
      });
    }
  }

  if (page === "products") {
    data.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${SITE.name} – პროდუქცია`,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.desc,
          image: abs(p.img),
          category: CATEGORIES[p.cat],
          brand: { "@type": "Brand", name: SITE.name },
        },
      })),
    });
  }

  data.forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

/* ---------- product card ---------- */
function cardHTML(p) {
  return `
  <article class="card" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name}">
    <button class="card-img" data-open="${p.id}" aria-label="${p.name} – ნახვა">
      <img src="${p.img}" alt="${p.name} – ${CATEGORIES[p.cat]}" width="400" height="300" loading="lazy">
      <span class="tag">${CATEGORIES[p.cat]}</span>
    </button>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a class="btn small" href="contact.html?product=${encodeURIComponent(p.name)}"><i class="fa-solid fa-phone"></i> შეკვეთა</a>
    </div>
  </article>`;
}

/* ---------- home: preview grid ---------- */
function initHome() {
  const g = document.getElementById("homeGrid");
  if (g) g.innerHTML = PRODUCTS.slice(0, 6).map(cardHTML).join("");
}

/* ---------- products: filter + search + modal ---------- */
function initProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  const search = document.getElementById("search");
  const chips = document.getElementById("chips");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  let cat = "all";

  chips.innerHTML =
    `<button class="chip active" data-cat="all">ყველა</button>` +
    Object.entries(CATEGORIES).map(([k, v]) => `<button class="chip" data-cat="${k}">${v}</button>`).join("");

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = PRODUCTS.filter((p) =>
      (cat === "all" || p.cat === cat) &&
      (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
    grid.innerHTML = list.map(cardHTML).join("");
    count.textContent = `${list.length} პროდუქტი`;
    empty.hidden = list.length > 0;
  }
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    cat = b.dataset.cat;
    chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === b));
    render();
  });
  search.addEventListener("input", render);
  render();

  // modal
  const modal = document.getElementById("modal");
  const close = () => { modal.hidden = true; document.body.style.overflow = ""; };
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]"); if (!b) return;
    const p = PRODUCTS.find((x) => x.id === b.dataset.open);
    document.getElementById("mImg").src = p.img;
    document.getElementById("mImg").alt = p.name;
    document.getElementById("mCat").textContent = CATEGORIES[p.cat];
    document.getElementById("mTitle").textContent = p.name;
    document.getElementById("mDesc").textContent = p.desc;
    document.getElementById("mLink").href = "contact.html?product=" + encodeURIComponent(p.name);
    modal.hidden = false; document.body.style.overflow = "hidden";
  });
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
}

/* ---------- contact page: map + product note ---------- */
function initContact() {
  const note = document.getElementById("productNote");
  if (!note) return;
  const product = new URLSearchParams(location.search).get("product");
  if (product) {
    note.textContent = `თქვენ გაინტერესებთ: ${product}. დაგვირეკეთ ან მოგვწერეთ Facebook-ზე და გიპასუხებთ.`;
    note.hidden = false;
  }
  if (SITE.mapEmbed) {
    const m = document.getElementById("map");
    m.innerHTML = `<iframe src="${SITE.mapEmbed}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="მშენპარკის მდებარეობა რუკაზე – ${SITE.address}"></iframe>`;
  }
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver((es) => es.forEach((x) => {
    if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  initSEO();
  initHome();
  initProducts();
  initContact();
  initReveal();
});
