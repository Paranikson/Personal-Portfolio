// Mobile nav toggle and basic interaction helpers.
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal animation on scroll.
const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Update footer year.
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Simple photo slider for the About section.
const sliderTrack = document.querySelector('.slider-track');
const slides = sliderTrack ? Array.from(sliderTrack.children) : [];
const sliderButtons = document.querySelectorAll('.slider-btn');
const sliderDots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;

const updateSlider = (index) => {
  if (!sliderTrack || !slides.length) return;

  const clampedIndex = (index + slides.length) % slides.length;
  sliderTrack.style.transform = `translateX(-${clampedIndex * 100}%)`;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === clampedIndex);
  });
  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === clampedIndex);
    dot.setAttribute('aria-selected', dotIndex === clampedIndex ? 'true' : 'false');
  });
  currentSlide = clampedIndex;
};

if (slides.length) {
  sliderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction === 'next' ? 1 : -1;
      updateSlider(currentSlide + direction);
    });
  });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateSlider(index));
  });
}
