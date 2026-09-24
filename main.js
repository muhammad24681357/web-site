/* ============================================
   REVOX - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Sticky Header ----
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile Menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll to Top ----
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Count-up Animation ----
  function countUp(el, target, duration = 1800) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 16);
  }

  // ---- Intersection Observer for Animations ----
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Trigger count-up for stat numbers
        if (entry.target.classList.contains('count-up')) {
          const target = parseInt(entry.target.dataset.count, 10);
          countUp(entry.target, target);
        }

        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  // Observe animated elements
  document.querySelectorAll('.fade-up, .count-up, .service-card, .work-card, .testi-card, .process-step').forEach(el => {
    animObserver.observe(el);
  });

  // ---- Marquee duplicate for seamless loop ----
  const track = document.querySelector('.marquee-track');
  if (track) {
    const items = track.innerHTML;
    track.innerHTML = items + items; // duplicate for seamless loop
  }

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));
});
