# AIRA Africa — Official Website

Static website for the **African Institute for Research Advancement & Innovation Ltd/GTE** (RC 9646490), a non-profit research institute based in Kano, Nigeria.

Built with plain HTML, CSS, and JavaScript — no build tools required. Ready to host free on **GitHub Pages**.

---

## 1. File Structure

```
aira-africa/
├── index.html            # Home
├── about.html            # About, mission/vision/values, leadership, legal details
├── focus-areas.html      # The 5 research domains
├── programs.html         # Mentorship, fellowships, workshops, conferences
├── publications.html     # Journals, reports, policy briefs (placeholders)
├── get-involved.html     # Membership, mentoring, partnerships, support
├── news.html             # News & events (placeholders)
├── contact.html          # Contact info + form + WhatsApp chat
├── css/
│   └── style.css         # All styles (design system)
├── js/
│   └── main.js           # Nav, WhatsApp widget, contact form, animations
└── assets/
    └── img/
        ├── logo.png              # Header/footer logo (map + wordmark, transparent)
        ├── logo-mark.png         # Africa map mark only (favicon + hero)
        ├── logo-full.png         # Original full logo with tagline
        ├── team/
        │   ├── abdulrazaq-zubair.jpg
        │   ├── tahir-ahmad.jpg
        │   └── placeholder-person.jpg   # Secretary photo — REPLACE
        └── placeholders/
            ├── activity-1..4.jpg        # Activity photos — REPLACE
            ├── event-1..3.jpg           # Event photos — REPLACE
            ├── news-1..3.jpg            # News images — REPLACE
            └── partner-1..4.jpg         # Partner logos — REPLACE
```

---

## 2. How to Replace Placeholder Images (Easy)

Every placeholder file is a real image sitting in `assets/img/`. To swap one:

1. Prepare your photo (JPG recommended; roughly **1200×800 px** for activities/news/events, **800×1000 px** portrait for team photos, **600×400 px** for partner logos).
2. Rename your file to **exactly the same name** as the placeholder (e.g. `activity-1.jpg`).
3. Upload it into the same folder, overwriting the placeholder.

The website updates automatically — no code changes needed. Each placeholder image also has its own file path printed on it, so you always know which file to replace.

**Text placeholders** (news headlines, event details, activity captions, the secretary's bio) are edited directly in the HTML files — search for the word `Placeholder` or `Replace` in any `.html` file.

---

## 3. Deploying to GitHub Pages (Step by Step)

1. **Create a GitHub account** (if you don't have one) at https://github.com
2. **Create a new repository:**
   - Click the **+** (top right) → **New repository**
   - Name it e.g. `aira-africa`
   - Leave it **Public**, click **Create repository**
3. **Upload the website files:**
   - On the repository page, click **Add file → Upload files**
   - Drag in **all the files and folders** from this project (the `.html` files, `css/`, `js/`, `assets/`)
   - Click **Commit changes**
4. **Enable GitHub Pages:**
   - Go to **Settings → Pages** (left sidebar)
   - Under **Source**, choose **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → **Save**
5. Wait 1–2 minutes. Your site will be live at:
   `https://<your-username>.github.io/aira-africa/`

**Optional — custom domain (e.g. www.airaafrica.org):** buy the domain from any registrar, then in **Settings → Pages → Custom domain** enter it and follow GitHub's DNS instructions.

### Updating the site later
Edit files directly on GitHub (pencil icon on any file) or upload replacements — changes go live within a minute or two.

---

## 4. Configuration Notes

| Setting | Where to change it |
|---|---|
| WhatsApp number (hidden from visitors) | `js/main.js` → `AIRA.whatsapp` (top of file) |
| Official email | `js/main.js` → `AIRA.email`, plus visible addresses in each page's footer/contact sections |
| Colors & fonts | `css/style.css` → `:root` variables at the top |
| Leadership bios | `about.html` → "Leadership" section |
| Partner logos | `index.html` → "In Collaboration With" strip, images in `assets/img/placeholders/partner-*.jpg` |

**Contact form:** opens the visitor's email app pre-filled (no server needed). If you later want messages delivered without an email app, sign up free at https://formspree.io and point the form's `action` to your Formspree endpoint.

**WhatsApp chat:** visitors tap the green button, enter their name and message, and are redirected to WhatsApp with the message pre-filled. The institute's number is never displayed on the page.

---

## 5. Legal Identity (shown on the site)

- African Institute for Research Advancement & Innovation Ltd/Gte
- RC 9646490 · Incorporated 30 June 2026 under CAMA 2020
- Private company limited by guarantee (non-profit)
- No. 157 Hausawa Danfulani, Liman Street, Zoo Road, Kano, Kano State, Nigeria
