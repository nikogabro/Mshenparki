/* ==========================================================
   მშენპარკი – site config + shared behaviour
   EDIT THE CONFIG AND PRODUCTS BELOW. Everything else updates itself.
   ========================================================== */
const SITE = {
  name: "მშენპარკი",
  tagline: "ბეტონის დეკორატიული ნაკეთობანი",
  phone: "+995 5XX XX XX XX", // TODO: real phone (display)
  phoneHref: "+9955XXXXXXXX", // TODO: real phone (digits only, with +995)
  email: "info@example.ge", // TODO
  address: "მისამართი დაზუსტდება", // TODO: street + city
  hours: "ორშაბათი – შაბათი, 10:00 – 18:00", // TODO
  facebook: "https://www.facebook.com/", // TODO: company Facebook page URL
  instagram: "", // optional – leave empty to hide
  mapEmbed: "", // optional – Google Maps "Embed a map" iframe src URL
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
  { id: "tile", cat: "paving", name: "ქვაფენილი", img: "images/tile.svg", desc: "ეზოსა და ტროტუარის დეკორატიული ფილები." },
  { id: "curb", cat: "paving", name: "ბორდიური", img: "images/curb.svg", desc: "საბორდიურე ქვები ბილიკებისა და საგზაო ზოლებისთვის." },
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
    `<a href="${href}" class="${key === page ? "active" : ""}">${label}</a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <div class="wrap bar">
        <a class="brand" href="index.html" aria-label="${SITE.name}">
          <img src="images/favicon.svg" alt="" width="40" height="40">
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
          <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${SITE.email}">${SITE.email}</a></p>
          <p><i class="fa-solid fa-location-dot"></i> ${SITE.address}</p>
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
  document.querySelectorAll("[data-mail]").forEach((el) => (el.href = "mailto:" + SITE.email));
  document.querySelectorAll("[data-fb]").forEach((el) => {
    if (SITE.facebook) el.href = SITE.facebook; else el.remove();
  });
}

/* ---------- product card ---------- */
function cardHTML(p) {
  return `
  <article class="card" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name}">
    <button class="card-img" data-open="${p.id}" aria-label="${p.name} – ნახვა">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
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

/* ---------- contact form ---------- */
function initContact() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const product = new URLSearchParams(location.search).get("product");
  if (product) form.message.value = `გამარჯობა, მაინტერესებს: ${product}\n`;
  if (SITE.mapEmbed) {
    const m = document.getElementById("map");
    m.innerHTML = `<iframe src="${SITE.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="რუკა"></iframe>`;
  }
  // No backend: opens the visitor's mail app with the message prefilled.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("შეკვეთა / შეკითხვა – " + SITE.name);
    const body = encodeURIComponent(`${form.message.value}\n\nსახელი: ${form.name.value}\nტელეფონი: ${form.phone.value}`);
    location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  });
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
  initHome();
  initProducts();
  initContact();
  initReveal();
});
