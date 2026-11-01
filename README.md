# AIRA Africa — Official Website

Static website for the **African Institute for Research Advancement & Innovation Ltd/GTE** (RC 9646490), a non-profit research institute based in Kano, Nigeria.

Built with plain HTML, CSS, and JavaScript — no build tools required. Hosted on **GitHub Pages** at [airaafrica.com](https://airaafrica.com).

**Editorial rule:** the public site must stay honest about the founding phase. Do not add partner logos, impact stats, news items, or programme “launches” that have not happened.

Founders: see [`docs/STARTUP-PLAYBOOK.md`](docs/STARTUP-PLAYBOOK.md) for the blunt operating plan (volunteers, visibility, grants, first 90 days).

---

## 1. File Structure

```
aira-africa/
├── index.html            # Home (honest founding-phase messaging)
├── about.html            # About, mission/vision/values, leadership, legal details
├── focus-areas.html      # Five domains; priority = health + agriculture
├── programs.html         # Roadmap; mentorship launching first
├── publications.html     # Honest empty state until real outputs exist
├── get-involved.html     # Membership, concrete volunteer roles, partnerships
├── news.html             # Updates (only real items)
├── contact.html          # Email / WhatsApp; registered address (not walk-in office)
├── docs/
│   └── STARTUP-PLAYBOOK.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── img/
        ├── logo.png, logo-mark.png, logo-full.png, favicon.png
        ├── team/         # Replace placeholder-person.jpg
        └── placeholders/ # Prefer real photos over these as soon as you have them
```

---

## 2. How to Replace Placeholder Images

1. Prepare your photo (JPG recommended; roughly **1200×800 px** for activities, **800×1000 px** for team portraits).
2. Rename to the **exact** placeholder filename (e.g. `activity-1.jpg`) or update the `src` in HTML if you add new files.
3. Prefer **real programme photos with consent** over decorative placeholders. Until then, the site uses logo artwork rather than fake partner marks.

**Text updates:** edit the HTML directly. Search for status pills like `Launching first` or `Founding phase` when programmes move forward.

---

## 3. Deploying / Updating on GitHub Pages

The custom domain `airaafrica.com` is set via the `CNAME` file. Push to `main` to publish.

### Updating the site later
Edit files on GitHub or push from git — changes go live within a minute or two after Pages builds.

---

## 4. Configuration Notes

| Setting | Where to change it |
|---|---|
| WhatsApp number (hidden from visitors) | `js/main.js` → `AIRA.whatsapp` |
| Official email | `js/main.js` → `AIRA.email`, plus visible addresses in each page |
| Colors & fonts | `css/style.css` → `:root` |
| Leadership bios | `about.html` → Leadership section |
| Volunteer roles | `get-involved.html` → `#roles` |

**Contact form:** opens the visitor's email app (mailto). Optional later: Formspree or similar.

**WhatsApp chat:** visitors enter name + message; WhatsApp opens pre-filled. The number is never printed on the page.

---

## 5. Legal Identity (shown on the site)

- African Institute for Research Advancement & Innovation Ltd/Gte
- RC 9646490 · Incorporated 30 June 2026 under CAMA 2020
- Private company limited by guarantee (non-profit)
- Registered address: No. 157 Hausawa Danfulani, Liman Street, Zoo Road, Kano, Kano State, Nigeria
- Operations: digital-first until a funded office is justified
