/* ==========================================================
   მშენპარკი – progressive enhancement only.

   All real content (header, footer, products, phone, address,
   FAQ, structured data) is plain HTML, so search engines and
   AI assistants can read it WITHOUT running JavaScript.
   This file only adds behaviour: mobile menu, product search /
   filter, quick-view popup, scroll animation.
   ========================================================== */

function initMenu() {
  const burger = document.getElementById("burger");
  const mnav = document.getElementById("mobileNav");
  if (!burger || !mnav) return;
  burger.addEventListener("click", () => {
    const open = mnav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  mnav.addEventListener("click", (e) => { if (e.target.tagName === "A") burger.click(); });
}

function initYear() {
  const y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- products: search + category filter + quick view ---------- */
function initProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".card"));
  const search = document.getElementById("search");
  const chips = document.getElementById("chips");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  let cat = "all";

  function render() {
    const q = search.value.trim().toLowerCase();
    let n = 0;
    cards.forEach((c) => {
      const ok = (cat === "all" || c.dataset.cat === cat) && (!q || c.textContent.toLowerCase().includes(q));
      c.hidden = !ok;
      if (ok) n++;
    });
    count.textContent = `${n} პროდუქტი`;
    empty.hidden = n > 0;
  }
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    cat = b.dataset.cat;
    chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === b));
    render();
  });
  search.addEventListener("input", render);

  // quick-view modal (filled from the card that was clicked)
  const modal = document.getElementById("modal");
  const close = () => { modal.hidden = true; document.body.style.overflow = ""; };
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]"); if (!b) return;
    const c = b.closest(".card");
    const img = c.querySelector("img");
    const title = c.querySelector("h3").textContent;
    const shots = c.dataset.images ? c.dataset.images.split("|") : [img.getAttribute("src")];
    const mImg = document.getElementById("mImg");
    const thumbs = document.getElementById("mThumbs");
    const show = (i) => {
      mImg.src = shots[i];
      mImg.alt = img.alt + (shots.length > 1 ? " – ფოტო " + (i + 1) : "");
      thumbs.querySelectorAll("button").forEach((t, k) => t.classList.toggle("active", k === i));
    };
    thumbs.innerHTML = "";
    shots.forEach((src, i) => {
      const t = document.createElement("button");
      t.type = "button";
      t.setAttribute("aria-label", "ფოტო " + (i + 1));
      const ti = document.createElement("img");
      ti.src = src; ti.alt = ""; ti.loading = "lazy";
      t.appendChild(ti);
      t.addEventListener("click", () => show(i));
      thumbs.appendChild(t);
    });
    thumbs.hidden = shots.length < 2;
    show(0);
    document.getElementById("mCat").textContent = c.querySelector(".tag").textContent;
    document.getElementById("mTitle").textContent = title;
    document.getElementById("mDesc").textContent = c.querySelector("p").textContent;
    const more = c.querySelector(".more");
    const mMore = document.getElementById("mMore");
    mMore.textContent = more ? more.textContent : "";
    mMore.hidden = !more;
    document.getElementById("mLink").href = "contact.html?product=" + encodeURIComponent(title);
    modal.hidden = false; document.body.style.overflow = "hidden";
  });
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
}

/* ---------- contact page: note when arriving from a product ---------- */
function initContact() {
  const note = document.getElementById("productNote");
  if (!note) return;
  const product = new URLSearchParams(location.search).get("product");
  if (product) {
    note.textContent = `თქვენ გაინტერესებთ: ${product}. დაგვირეკეთ ან მოგვწერეთ Facebook-ზე და გიპასუხებთ.`;
    note.hidden = false;
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
  initMenu();
  initYear();
  initProducts();
  initContact();
  initReveal();
});
