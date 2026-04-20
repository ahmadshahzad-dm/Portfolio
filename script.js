// ===== script.js =====

// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});

// NAVBAR scroll effect + hamburger
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// TYPEWRITER
const words = ['Digital Marketer', 'E-Commerce Expert', 'AI Enthusiast', 'SEO Specialist', 'Content Strategist'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function typeLoop() {
  if (!tw) return;
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
    setTimeout(typeLoop, 90);
  } else {
    tw.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, 50);
  }
}
if (tw) typeLoop();

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 35);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.s-num').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// SKILL BAR ANIMATION
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.w || bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w + (w.toString().includes('%') ? '' : '%'); }, 150);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid-full, .skills-grid').forEach(el => skillObserver.observe(el));

// Active nav highlight on scroll (single page fallback)
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 200) current = sec.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
