/* ============================================================
   AIRA AFRICA — main.js
   ============================================================ */

/* ---------- Site configuration ---------- */
const AIRA = {
  whatsapp: "2348189817182",          // digits only, country code first — never displayed on the page
  email: "airaafrica001@gmail.com"
};

/* ---------- Header scroll state ---------- */
const header = document.getElementById("siteHeader");
function onScrollHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

/* ---------- Mobile navigation ---------- */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  mainNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      document.body.style.overflow = "";
    })
  );
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ============================================================
   Generative woven-textile canvas
   Vertical stripes + fine horizontal thread hatching, slowly
   shifting sideways like living fabric. Brand palette only.
   ============================================================ */
class Weave {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.offset = 0;
    this.running = true;
    this.palette = [
      "#0e2b46", "#12365a", "#0a2438", "#16406b",
      "#1a4a7c", "#0e2b46", "#12365a",
      "#cea84e", // gold thread line
      "#0a2438", "#16406b", "#12365a"
    ];
    this.buildStripes();
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }
  buildStripes() {
    // deterministic pseudo-random stripe widths
    this.stripes = [];
    let x = 0, i = 0;
    while (x < 4200) {
      const c = this.palette[i % this.palette.length];
      // gold appears as a narrow thread; navy shades carry the fabric
      const w = c === "#cea84e" ? 12 + ((i * 29) % 14) : 34 + ((i * 53) % 78);
      this.stripes.push({ x, w, c });
      x += w; i++;
    }
    this.totalW = x;
  }
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, r.width * dpr);
    this.canvas.height = Math.max(1, r.height * dpr);
    this.dpr = dpr;
    this.renderTile();
  }
  renderTile() {
    // offscreen tile: weave texture drawn once, then shifted
    const h = this.canvas.height;
    this.tile = document.createElement("canvas");
    this.tile.width = this.totalW;
    this.tile.height = h;
    const t = this.tile.getContext("2d");
    this.stripes.forEach((s) => {
      t.fillStyle = s.c;
      t.fillRect(s.x, 0, s.w, h);
      // horizontal thread hatching
      t.strokeStyle = "rgba(248,247,244,0.07)";
      t.lineWidth = 1;
      for (let y = 0; y < h; y += 3) {
        t.beginPath();
        t.moveTo(s.x, y + 0.5);
        t.lineTo(s.x + s.w, y + 0.5);
        t.stroke();
      }
      // darker thread every few lines for woven depth
      t.strokeStyle = "rgba(6,18,30,0.16)";
      for (let y = 1; y < h; y += 9) {
        t.beginPath();
        t.moveTo(s.x, y + 0.5);
        t.lineTo(s.x + s.w, y + 0.5);
        t.stroke();
      }
    });
  }
  loop() {
    if (this.running) {
      this.offset = (this.offset + 0.35) % this.totalW;
      const ctx = this.ctx, W = this.canvas.width, H = this.canvas.height;
      ctx.clearRect(0, 0, W, H);
      let x = -this.offset;
      while (x < W) {
        ctx.drawImage(this.tile, x, 0, this.totalW, H);
        x += this.totalW;
      }
    }
    requestAnimationFrame(this.loop);
  }
  toggle() {
    this.running = !this.running;
    return this.running;
  }
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".weave-canvas").forEach((c) => {
  const weave = new Weave(c);
  if (reduceMotion) weave.running = false;
  const btn = document.querySelector(".weave-toggle");
  if (btn) {
    if (reduceMotion) btn.textContent = "Play background";
    btn.addEventListener("click", () => {
      const running = weave.toggle();
      btn.textContent = running ? "Pause background" : "Play background";
    });
  }
});

/* ============================================================
   WhatsApp chat widget (injected on every page)
   Visitor enters name + what they need; WhatsApp opens with
   the message pre-filled. Number is never printed on the page.
   ============================================================ */
(function whatsappWidget() {
  const floatBtn = document.createElement("button");
  floatBtn.className = "wa-float";
  floatBtn.setAttribute("aria-label", "Chat with AIRA Africa on WhatsApp");
  floatBtn.innerHTML =
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2.7C8.7 2.7 2.8 8.6 2.8 15.9c0 2.6.8 5 2.1 7L2.7 29.3l6.6-2.1c1.9 1.2 4.2 1.8 6.7 1.8 7.3 0 13.2-5.9 13.2-13.1S23.3 2.7 16 2.7zm0 24c-2.3 0-4.4-.7-6.2-1.8l-.4-.3-3.9 1.2 1.2-3.8-.3-.4c-1.2-1.8-1.9-4-1.9-6.3C4.5 9.5 9.7 4.4 16 4.4s11.5 5.2 11.5 11.5S22.3 26.7 16 26.7zm6.3-8.6c-.3-.2-2-1-2.4-1.1-.3-.1-.6-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.8.1-.3-.2-1.5-.5-2.8-1.7-1-.9-1.7-2-1.9-2.4-.2-.3 0-.5.2-.7l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6-.1-.2-.8-2-1.1-2.8-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-1 .5-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"/></svg>';

  const modal = document.createElement("div");
  modal.className = "chat-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Chat with us on WhatsApp");
  modal.innerHTML = `
    <div class="chat-backdrop"></div>
    <div class="chat-panel">
      <button class="chat-close" aria-label="Close chat window">&times;</button>
      <h3>Chat with us</h3>
      <p class="chat-sub">Tell us who you are and what you need — we'll continue the conversation on WhatsApp.</p>
      <form id="waForm">
        <div class="form-field">
          <label for="waName">Your name</label>
          <input type="text" id="waName" name="name" required autocomplete="name" placeholder="e.g. Amina Bello">
        </div>
        <div class="form-field">
          <label for="waMsg">What would you like to discuss?</label>
          <textarea id="waMsg" name="message" required placeholder="e.g. I am a postgraduate student interested in your research mentorship program."></textarea>
        </div>
        <button type="submit" class="btn btn-gold">Continue to WhatsApp</button>
        <p class="form-note">This opens WhatsApp with your message pre-filled. No account or download is needed if you use WhatsApp Web.</p>
      </form>
    </div>`;

  document.body.appendChild(floatBtn);
  document.body.appendChild(modal);

  const open = () => modal.classList.add("open");
  const close = () => modal.classList.remove("open");
  floatBtn.addEventListener("click", open);
  modal.querySelector(".chat-backdrop").addEventListener("click", close);
  modal.querySelector(".chat-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  // any element with data-chat opens the modal too
  document.querySelectorAll("[data-chat]").forEach((el) =>
    el.addEventListener("click", (e) => { e.preventDefault(); open(); })
  );

  modal.querySelector("#waForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = modal.querySelector("#waName").value.trim();
    const msg = modal.querySelector("#waMsg").value.trim();
    const text = `Hello AIRA Africa, my name is ${name}. ${msg}`;
    window.open(`https://wa.me/${AIRA.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    close();
  });
})();

/* ---------- Email inquiry form (composes a mailto) ---------- */
const mailForm = document.getElementById("mailForm");
if (mailForm) {
  mailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("mailName").value.trim();
    const subject = document.getElementById("mailSubject").value.trim();
    const msg = document.getElementById("mailMsg").value.trim();
    const body = `Name: ${name}\n\n${msg}`;
    window.location.href =
      `mailto:${AIRA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ---------- Footer year ---------- */
document.querySelectorAll(".js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
