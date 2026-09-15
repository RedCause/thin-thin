const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
const nav = document.getElementById("nav");
const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
const sections = [...document.querySelectorAll("section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

const dots = Array.from({ length: 70 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.4 + 0.3,
  s: Math.random() * 0.25 + 0.05,
}));

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function draw() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(100, 240, 255, 0.05)";
  ctx.lineWidth = 1;
  const gap = 72;
  for (let x = 0; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  dots.forEach((d) => {
    d.y -= d.s / h;
    if (d.y < 0) d.y = 1;
    ctx.fillStyle = d.r > 1 ? "rgba(255, 92, 168, 0.55)" : "rgba(100, 240, 255, 0.55)";
    ctx.beginPath();
    ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

function setActive() {
  const y = window.scrollY + (nav.offsetHeight + 72);
  let current = "home";
  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("is-active", a.dataset.section === current);
  });
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
}

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

navAnchors.forEach((a) => {
  a.addEventListener("click", () => links.classList.remove("is-open"));
});

window.addEventListener("scroll", setActive, { passive: true });
window.addEventListener("resize", resize);
resize();
setActive();
requestAnimationFrame(draw);
