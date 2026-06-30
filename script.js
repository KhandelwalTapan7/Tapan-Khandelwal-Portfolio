/* ================================================================
   TAPAN KHANDELWAL — PORTFOLIO SCRIPT
   Companion to index.html  |  Theme: Deep-Space Indigo
   ================================================================ */

/* ── STARFIELD CANVAS BACKGROUND ── */
(function () {
  const c = document.getElementById('starfield');
  if (!c) return;

  const ctx = c.getContext('2d');
  let stars = [];

  function resize() {
    c.width = innerWidth;
    c.height = innerHeight;
  }

  function init() {
    stars = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.001
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      s.a += s.speed;
      ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(s.a));
      ctx.fillStyle = '#818cf8';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  resize();
  init();
  draw();
})();

/* ── NAV SCROLL STATE (sticky shadow + back-to-top visibility) ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const btt = document.getElementById('btt');
  if (navbar) navbar.classList.toggle('scrolled', scrollY > 60);
  if (btt) btt.classList.toggle('visible', scrollY > 400);
});

/* ── MOBILE MENU TOGGLE ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

/* ── HERO ROLE TYPEWRITER ── */
(function () {
  const roles = [
    'AI/ML Engineer',
    'Deep Learning Developer',
    'NLP Practitioner',
    'Generative AI Builder',
    'Python Enthusiast'
  ];

  const el = document.getElementById('typedRole');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const role = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = role.slice(0, charIndex) + '|';
      if (charIndex === role.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = role.slice(0, charIndex) + '|';
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? 60 : 90);
  }

  tick();
})();

/* ── HERO STAT COUNT-UP ── */
function countUp(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;

  let start = 0;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(start);
  }, 16);
}

setTimeout(() => {
  countUp('s1', 2, 1000);   // Internships
  countUp('s2', 8, 1200);   // Projects
  countUp('s3', 34, 1400);  // Repositories
}, 600);

/* ── SCROLL-REVEAL ANIMATIONS ── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── CONTACT FORM SUBMIT (demo — shows toast, no backend wired) ── */
function handleSubmit(e) {
  e.preventDefault();

  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  e.target.reset();
}