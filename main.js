/* =========================================
   main.js — NAMA_KLINIK Website Scripts
========================================= */

// -------- Navbar scroll effect --------
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// -------- Mobile menu --------
function toggleMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const burger  = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  burger.classList.toggle('active', isOpen);
  // Lock body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close menu on overlay click (also wired in HTML, kept here for safety)
(function initOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', toggleMenu);
})();

// -------- Scroll Reveal --------
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// -------- Floating Petals --------
(function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const count = window.innerWidth < 480 ? 6 : 12; // fewer on mobile
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left            = (Math.random() * 100) + 'vw';
    petal.style.width           = (8  + Math.random() * 10) + 'px';
    petal.style.height          = (12 + Math.random() * 14) + 'px';
    petal.style.animationDuration = (8 + Math.random() * 10) + 's';
    petal.style.animationDelay  = (Math.random() * 12) + 's';
    petal.style.transform       = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(petal);
  }
})();

// -------- Active nav link highlight on scroll --------
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.style.color = href === '#' + current ? 'var(--pink-deep)' : '';
    });
  }, { passive: true });
})();

// -------- Smooth close mobile menu on anchor click --------
(function initMobileAnchorClose() {
  const mobileLinks = document.querySelectorAll('#mobileMenu a[href^="#"]');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu    = document.getElementById('mobileMenu');
      const overlay = document.getElementById('overlay');
      const burger  = document.getElementById('hamburger');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
})();
