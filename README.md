# Befach — Rooted in India. Respected Globally.

A premium e-commerce storefront for **India's Geographical Indication (GI) products** — 62 heritage foods from 22 states, each sourced direct from its protected region of origin. Built as a fast, dependency-free static site.

> **91** = India's calling code · **GI** = Geographical Indication

🌐 Domain: **befach.com**

---

## ✨ Features

- **62 GI products** across 16 categories (Rice, Spices, Coffee, Makhana, Turmeric, Nuts & Dry Fruits, Ghee, and more)
- **Browse by Category** and **Browse by State** (grouped by region of India)
- **Storytelling product pages** — every product carries the real story of its origin, why it earned its GI tag, and an emotional connection to the place and the people who grow it
- **Full shop experience** — search, multi-filter (category + state + price), and sort
- **Request a Quote instead of a cart** — every product shows an indicative USD price range (discounted price → MRP) and a quote form. Each request is saved to the Google Sheet behind [`landing/survey-backend.gs`](landing/survey-backend.gs), emailed to the sales team, and listed under **Quotations** in `/admin`, where its status can be tracked
- **Befach Low Diabetic Rice** featured as a special product
- **Premium design** — forest-green / cream / vermillion palette drawn from the Befach logo, Playfair Display + DM Sans typography, scroll-reveal animations, responsive down to mobile
- **Accessible & SEO-aware** — associated form labels, per-page meta descriptions, semantic markup

## 🗂️ Project Structure

Pages live in folders so every URL is clean (`/shop`, `/about`) with **no `.html`**:

```
.
├── index.html             # Home  →  /
├── shop/index.html        # Shop all  →  /shop      (filters, search, sort)
├── product/index.html     # Product detail  →  /product?id=…  (story, request a quote)
├── cart/, checkout/       # Old basket links — redirect to /shop
├── admin/                 # Survey stats + Quotations  →  /admin  (password-protected)
├── landing/survey-backend.gs  # Google Apps Script: Sheet storage, quote emails, admin API
├── categories/index.html  # Browse by category  →  /categories
├── states/index.html      # Browse by state  →  /states
├── about/index.html       # The Befach story  →  /about
├── 91GI_logo.png          # Brand logo
└── assets/
    ├── css/style.css      # Design system + components + page transitions
    └── js/
        ├── products.js    # 62-product catalog + stories + helpers
        ├── main.js        # Price ranges, nav/footer injection, prefetch, animations
        └── quote.js       # "Request a Quote" dialog (product page)
```

**App-like navigation:** uses the [View Transitions API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API)
for smooth cross-page fades plus speculative prefetch for instant loads — no framework, still a static site.

## 🚀 Run Locally

No build step. It's a static site — serve the folder with anything:

```bash
# Option A: Node http-server
npx -y http-server . -p 8765

# Option B: Python
python3 -m http.server 8765
```

Then open <http://localhost:8765>.

## 🛠️ Tech

- Vanilla HTML, CSS, and JavaScript — **zero framework, zero dependencies**
- Google Apps Script + Google Sheet as the backend (quotes, survey, admin data)
- Google Fonts (Playfair Display, Cormorant Garamond, DM Sans)

## 📦 Catalog Source

Products are defined in [`assets/js/products.js`](assets/js/products.js). Each entry includes its category, region/city, state, price, pack size, key facts, and a written origin story.

---

© Befach. Built to put protected-origin Indian products — and the farmers behind them — in one honest place.
