/* ============================================================
   AHMAD SHAHZAD PORTFOLIO — main.js
   ============================================================ */

/* ---------- PRELOADER ---------- */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  setTimeout(() => {
    pre.classList.add('hidden');
    setTimeout(() => pre.style.display = 'none', 700);
  }, 2200);
});

/* ---------- NAVBAR ---------- */
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---------- ACTIVE NAV LINK ---------- */
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

/* ---------- TYPEWRITER ---------- */
(function(){
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = ['Digital Marketer','E-Commerce Specialist','AI & Prompt Engineer','Shopify Store Designer'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 60 : 100;
    if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 400; }
    setTimeout(type, delay);
  }
  type();
})();

/* ---------- FADE-IN ON SCROLL ---------- */
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

/* ---------- SKILL BARS ---------- */
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.w;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-bar-item').forEach(el => obs.observe(el));
})();

/* ---------- CAROUSEL ---------- */
(function(){
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let cur = 0, timer;

  function go(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  document.querySelector('.carousel-prev')?.addEventListener('click', () => { go(cur - 1); reset(); });
  document.querySelector('.carousel-next')?.addEventListener('click', () => { go(cur + 1); reset(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));

  function reset() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 4000); }
  const wrap = document.querySelector('.carousel-wrap');
  wrap?.addEventListener('mouseenter', () => clearInterval(timer));
  wrap?.addEventListener('mouseleave', () => reset());
  reset();
})();

/* ---------- CONTACT FORM ---------- */
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg; el.classList.add('show');
  }
  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    ['name','email','message'].forEach(f => clearErr(f + 'Err'));

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (!name) { showErr('nameErr','Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('emailErr','Please enter a valid email.'); valid = false; }
    if (!msg) { showErr('messageErr','Please enter a message.'); valid = false; }
    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const res = await fetch('https://formspree.io/f/mjgjopyw', {
        method: 'POST', headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        form.reset();
        document.getElementById('formSuccess').classList.add('show');
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      } else {
        btn.innerHTML = 'Error — Try Again'; btn.disabled = false;
      }
    } catch {
      btn.innerHTML = 'Error — Try Again'; btn.disabled = false;
    }
  });
})();
