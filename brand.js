/* Adds the round logo next to the site name in the header, if the header has a brand element.
   Safe to keep: if nothing matches, it does nothing. */
(function () {
  function addLogo() {
    var el = document.querySelector('header .brand, header .logo, .nav .brand, .nav .logo, .navbar-brand, a.brand, a.logo');
    if (!el || el.querySelector('.brand-logo')) return true;
    var img = new Image();
    img.className = 'brand-logo';
    img.src = 'images/logo-96.webp';
    img.width = 44; img.height = 44;
    img.alt = '';
    el.style.display = el.style.display || 'inline-flex';
    el.style.alignItems = 'center';
    el.insertBefore(img, el.firstChild);
    return true;
  }
  function run() {
    if (addLogo()) return;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(run, 0); });
  else setTimeout(run, 0);
})();
