const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('#site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (menuButton.getAttribute('aria-expanded') === 'true' &&
      !siteNav.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.documentElement.classList.add('js-enabled');

const revealItems = document.querySelectorAll(
  'main > section:not(.hero), .profile-card, .skill-item, .achievement-card, .contact-links a'
);

if ('IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .14, rootMargin: '0px 0px -24px 0px' });

  revealItems.forEach((item) => {
    item.classList.add('reveal-on-scroll');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
