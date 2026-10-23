/* ============================================================
   SHARP STANDARDS — main.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   NAVIGATION — sticky + scroll class
   ---------------------------------------------------------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);

  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.cssText = '';
    spans[1].style.cssText = '';
    spans[2].style.cssText = '';
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.cssText = '';
    spans[1].style.cssText = '';
    spans[2].style.cssText = '';
  });
});

/* ----------------------------------------------------------
   SCROLL REVEAL — IntersectionObserver
   ---------------------------------------------------------- */
const revealElements = document.querySelectorAll(
  '.service-card, .product-card, .testimonial-card, .about__stat, .contact__detail, .booking__perks li'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger delay for grid children
  const delayClass = `reveal-delay-${(i % 4) + 1}`;
  el.classList.add(delayClass);
});

const sectionHeadings = document.querySelectorAll('.section-label, .section-title, .services__intro, .products__intro, .booking__text, .about__text, .contact__text');
sectionHeadings.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ----------------------------------------------------------
   CONTACT FORM — client-side submit handler
   ---------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const requiredFields = contactForm.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e05555';
        valid = false;
      }
    });

    if (!valid) return;

    // Simulate async send — replace with your actual form handler
    // e.g., fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) })
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      formSuccess.classList.add('visible');

      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 1200);
  });
}

/* ----------------------------------------------------------
   SMOOTH ACTIVE NAV LINK highlight on scroll
   ---------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(anchor => {
        anchor.style.color = '';
        if (anchor.getAttribute('href') === `#${id}`) {
          anchor.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ----------------------------------------------------------
   PRODUCT ADD TO CART — feedback animation
   ---------------------------------------------------------- */
document.querySelectorAll('.product-card .btn--gold').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = 'Added!';
    this.style.background = '#4CAF50';
    this.style.borderColor = '#4CAF50';
    this.disabled = true;

    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
      this.style.borderColor = '';
      this.disabled = false;
    }, 1800);
  });
});
