/* ==========================================================================
   LIO'S POV — Interaction layer
   Small, deliberate enhancements only: sticky-nav border, mobile menu,
   scroll reveal, and the current year in the footer. No frameworks.
   ========================================================================== */

document.documentElement.classList.remove('no-js');

/* --------------------------------------------------------------------------
   1. Sticky nav — add a hairline border once the page has scrolled
   -------------------------------------------------------------------------- */
(function stickyNavBorder() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const toggleBorder = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  toggleBorder();
  window.addEventListener('scroll', toggleBorder, { passive: true });
})();

/* --------------------------------------------------------------------------
   2. Mobile navigation toggle
   -------------------------------------------------------------------------- */
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.classList.toggle('is-open', !isOpen);
  });

  // Close the menu after choosing a link, and on outside click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', (event) => {
    if (!links.classList.contains('is-open')) return;
    if (!links.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
})();

/* --------------------------------------------------------------------------
   3. Scroll reveal — subtle fade + rise as sections enter the viewport.
      Skipped entirely for users who prefer reduced motion.
   -------------------------------------------------------------------------- */
(function scrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* --------------------------------------------------------------------------
   4. Footer year
   -------------------------------------------------------------------------- */
(function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
