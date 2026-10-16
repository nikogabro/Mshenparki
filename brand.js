/* Replaces the placeholder cube in the header with the Mshenparki logo.
   Works on every page that includes this script (no other CSS needed). */
(function () {
  var LOGO = 'images/logo-96.webp';

  function apply() {
    var cube = document.querySelector('.fa-cube');
    var link = cube ? cube.closest('a') : null;
    if (!link) {
      // fallback: header link that contains the site name
      var links = document.querySelectorAll('header a, nav a, .nav a');
      for (var i = 0; i < links.length; i++) {
        if (links[i].textContent.indexOf('მშენპარკი') !== -1) { link = links[i]; break; }
      }
    }
    if (!link) return false;
    if (link.querySelector('img[data-brand-logo]')) return true;

    var img = new Image();
    img.src = LOGO;
    img.width = 48; img.height = 48;
    img.alt = 'მშენპარკის ლოგო';
    img.setAttribute('data-brand-logo', '');
    img.decoding = 'async';
    img.style.cssText = 'width:48px;height:48px;border-radius:50%;flex:none;display:block;object-fit:cover';

    if (cube) {
      // the cube normally sits inside a small square wrapper; swap the whole wrapper
      var wrap = cube.parentElement;
      if (wrap && wrap !== link && wrap.textContent.trim() === '') {
        wrap.parentNode.replaceChild(img, wrap);
      } else {
        cube.parentNode.replaceChild(img, cube);
      }
    } else {
      link.insertBefore(img, link.firstChild);
    }
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.gap = '12px';
    return true;
  }

  function start() {
    if (apply()) return;
    // header is built by site.js, so watch briefly until it appears
    var obs = new MutationObserver(function () { if (apply()) obs.disconnect(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 5000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
