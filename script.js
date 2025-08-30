/* ===========================
   Theme: dark/light with persistence
=========================== */
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const savedTheme = localStorage.getItem("theme");
const root = document.documentElement;

function setTheme(mode) {
  // Add a fade class temporarily
  root.classList.add("theme-fade");
  
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");

  localStorage.setItem("theme", mode);

  // Remove fade class after transition
  setTimeout(() => root.classList.remove("theme-fade"), 500);
}


document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "theme-toggle") {
    const next = root.classList.contains("light") ? "dark" : "light";
    setTheme(next);
  }
});

/* ===========================
   Mobile nav
=========================== */
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ===========================
   Hero demo controls
=========================== */
document.querySelectorAll("[data-demo]").forEach(btn => {
  btn.addEventListener("click", () => {
    const meter = document.querySelector(".meter span");
    if (!meter) return;
    if (btn.dataset.demo === "pulse") {
      let pct = 10 + Math.floor(Math.random() * 85);
      meter.style.width = pct + "%";
    } else {
      meter.style.width = "72%";
    }
  });
});

/* ===========================
   Pricing toggle
=========================== */
const toggle = document.getElementById("billing-toggle");
function setPrices(yearly) {
  document.querySelectorAll(".amount").forEach(el => {
    const month = el.getAttribute("data-month");
    const year = el.getAttribute("data-year");
    el.textContent = yearly ? year : month;
  });
  document.querySelectorAll(".period").forEach(el => {
    el.textContent = yearly ? "/yr" : "/mo";
  });
}
if (toggle) {
  toggle.addEventListener("change", () => setPrices(toggle.checked));
}

/* ===========================
   Footer year
=========================== */
document.querySelectorAll("#year").forEach(el => (el.textContent = new Date().getFullYear()));

/* ===========================
   Newsletter (demo)
=========================== */
const nlForm = document.getElementById("newsletter-form");
if (nlForm) {
  nlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = nlForm.querySelector("input[type=email]");
    const feedback = document.getElementById("nl-feedback");
    if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
      feedback.textContent = "Please enter a valid email.";
      feedback.style.color = "#ff7b7b";
      email.focus();
      return;
    }
    feedback.textContent = "Subscribed! Check your inbox.";
    feedback.style.color = "inherit";
    nlForm.reset();
  });
}

/* ===========================
   Contact form validation (demo)
=========================== */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const message = contactForm.querySelector("#message");
    let ok = true;

    // simple validations
    const setErr = (id, msg) => {
      const el = document.getElementById(id);
      if (el) el.textContent = msg || "";
    };

    if (!name.value.trim()) { setErr("err-name", "Name is required"); ok = false; } else setErr("err-name");
    if (!/^\S+@\S+\.\S+$/.test(email.value)) { setErr("err-email", "Enter a valid email"); ok = false; } else setErr("err-email");
    if (!message.value.trim() || message.value.trim().length < 10) { setErr("err-message", "Message must be at least 10 characters"); ok = false; } else setErr("err-message");

    const feedback = document.getElementById("contact-feedback");
    if (!ok) {
      feedback.textContent = "Please fix the errors above.";
      return;
    }
    // demo submit
    feedback.textContent = "Thanks! Your message has been sent (demo).";
    contactForm.reset();
  });
}

/* ===========================
   Blog renderer (static JSON)
=========================== */
const posts = [
  {
    title: "Designing Accessible Components",
    date: "2025-08-20",
    tags: ["a11y", "ui"],
    excerpt: "Practical tips to make interactive widgets usable for everyone.",
    body: "Use semantic HTML elements, ensure focus styles are visible, and test with a keyboard. Provide ARIA only when semantics fall short."
  },
  {
    title: "Performance-First CSS Architecture",
    date: "2025-08-15",
    tags: ["css", "performance"],
    excerpt: "Keep CSS small, predictable, and cacheable.",
    body: "Use CSS variables, avoid heavy libraries, and ship only what you use. Prefer utility-like patterns for consistency."
  },
  {
    title: "From Idea to Launch in a Weekend",
    date: "2025-08-10",
    tags: ["product", "startup"],
    excerpt: "Scope small, ship fast, iterate smarter.",
    body: "Define a tiny MVP, ruthlessly cut scope, and focus on one magical feature. Gather feedback early."
  }
];

function renderBlog() {
  const list = document.getElementById("blog-list");
  if (!list) return;
  list.innerHTML = "";
  posts.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.padding = "16px";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="post-meta">
        <span>${new Date(p.date).toLocaleDateString()}</span>
        <span>•</span>
        <span>${p.tags.join(", ")}</span>
      </div>
      <p class="muted">${p.excerpt}</p>
      <details>
        <summary>Read more</summary>
        <p class="post-body">${p.body}</p>
      </details>
    `;
    list.appendChild(card);
  });
}
renderBlog();

/* ===========================
   Accessibility enhancements
=========================== */
// Close mobile nav when a link is clicked
document.querySelectorAll(".primary-nav a").forEach(a=>{
  a.addEventListener("click", ()=>{
    if (primaryNav && primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded","false");
    }
  });
});
