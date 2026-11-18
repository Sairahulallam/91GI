// Befach — Main JavaScript
// Handles pricing, navigation, animations, and shared UI

// ============================================
// CURRENCY
// Catalog prices in products.js are authored in INR. The storefront shows
// and totals everything in USD, converted at this fixed rate.
// To reprice the whole site, change INR_PER_USD — nothing else.
// ============================================
const INR_PER_USD = 96;

// All money math runs in whole US cents so line items always add up
// exactly to the subtotal/total shown — no floating-point drift.
function inrToCents(inr) {
  return Math.round((inr * 100) / INR_PER_USD);
}

const USD_FORMAT = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// cents → "$4.68"
function formatPrice(cents) {
  return USD_FORMAT.format(cents / 100);
}

function priceCents(p) { return inrToCents(p.price); }
function mrpCents(p) { return p.mrp ? inrToCents(p.mrp) : 0; }

// Buyers request a quote, so the storefront shows an indicative range rather
// than one fixed price: from the discounted price up to the pre-discount MRP.
// A product without an MRP gets a range of up to 20% below its price.
function priceRangeCents(p) {
  const price = priceCents(p);
  const top = p.mrp ? mrpCents(p) : price;
  const bottom = p.mrp ? price : Math.round(price * 0.8);
  return { low: Math.min(bottom, top), high: Math.max(bottom, top) };
}

// product → "$5.72 – $7.28"
function formatPriceRange(p) {
  const { low, high } = priceRangeCents(p);
  return low === high ? formatPrice(low) : `${formatPrice(low)} – ${formatPrice(high)}`;
}

// Static HTML can show a converted amount with <span data-price-inr="999"></span>
function hydrateStaticPrices(root = document) {
  root.querySelectorAll('[data-price-inr]').forEach(el => {
    el.textContent = formatPrice(inrToCents(Number(el.dataset.priceInr)));
  });
}

// ============================================
// MOBILE NAV
// ============================================
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  menu.classList.toggle('open');
  overlay.classList.toggle('show');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// Header search: focus the shop filter input if present, else send the user to the shop page.
function navSearch() {
  const el = document.getElementById('searchInput');
  if (el) {
    el.focus();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    window.location.href = '/shop/';
  }
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

function initReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ============================================
// IMAGE LOADING
// ============================================
function initImageLoad() {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => {
        img.classList.add('loaded');
        // Add fallback styling to parent
        if (img.parentElement && !img.dataset.fallback) {
          img.dataset.fallback = '1';
          img.style.opacity = '0.4';
          img.style.mixBlendMode = 'luminosity';
        }
      });
    }
  });
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============================================
// RENDER HELPERS
// ============================================
const CATEGORY_THEME = {
  'Rice': 'cat-rice',
  'Wheat': 'cat-wheat',
  'Millets & Pseudo-cereals': 'cat-millet',
  'Pulses & Legumes': 'cat-pulse',
  'Turmeric (Haldi)': 'cat-turmeric',
  'Chilli (Dried Spice)': 'cat-chilli',
  'Other Spices': 'cat-spice',
  'Nuts & Dry Fruits': 'cat-nuts',
  'Coconut & Copra': 'cat-coconut',
  'Oilseeds': 'cat-oil',
  'Coffee': 'cat-coffee',
  'Tea': 'cat-tea',
  'Makhana (Fox Nut)': 'cat-makhana',
  'Medicinal & Herbal': 'cat-herbal',
  'Onion, Garlic & Roots': 'cat-roots',
  'Processed / Other': 'cat-processed'
};

function styledProductImage(p, opts = {}) {
  const theme = p.badge && p.badge.includes('Befach') ? 'cat-special' : (CATEGORY_THEME[p.category] || 'cat-spice');
  const cleanState = (p.state || '').replace(' (UT)', '').replace('India (Andhra Pradesh & Odisha)', 'Araku').replace('India (', '').replace(')', '');
  // When a real product photo exists, show it filling the container (the
  // gradient stays behind as a fallback while the image loads or if it fails).
  if (p.image) {
    return `
      <div class="styled-image ${theme}">
        <img class="styled-image-photo" src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
    `;
  }
  return `
    <div class="styled-image ${theme}">
      <div class="styled-image-content">
        <svg class="styled-image-pin" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
        <div class="styled-image-region">${cleanState}</div>
        <div class="styled-image-divider"></div>
        <div class="styled-image-name">${p.name}</div>
      </div>
      <div class="styled-image-tag">Befach · Origin Verified</div>
    </div>
  `;
}

// Document icon shared by every "Request a Quote" button.
const QUOTE_ICON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>`;

function renderProductCard(p) {
  return `
    <a href="/product/?id=${p.id}" class="product-card">
      <div class="product-card-image">
        ${p.badge ? `<span class="product-badge ${p.badge.includes('Befach') ? 'red' : p.badge.includes('Premium') ? 'gold' : ''}">${p.badge}</span>` : ''}
        ${styledProductImage(p)}
        <span class="product-quick-add" onclick="event.preventDefault(); event.stopPropagation(); location.href='/product/?id=${p.id}#quote';">
          ${QUOTE_ICON}
          Request Quote
        </span>
      </div>
      <div class="product-card-meta">${p.state}</div>
      <div class="product-card-title">${p.name}</div>
      <div class="product-card-region">${p.region}</div>
      <div class="product-card-price">
        <span class="price">${formatPriceRange(p)}</span>
      </div>
    </a>
  `;
}

function renderProductGrid(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="color: var(--mute); font-size: 18px;">No products match these filters.</p>
        <button onclick="clearAllFilters()" class="btn btn-ghost btn-sm" style="margin-top: 20px;">Reset Filters</button>
      </div>
    `;
    return;
  }
  container.innerHTML = products.map(renderProductCard).join('');
}

// ============================================
// NAV / FOOTER INJECTION (so we don't repeat HTML)
// ============================================
function injectNav(activePage) {
  return `
    <nav class="nav">
      <div class="container">
        <div class="nav-inner">
          <a href="/" class="nav-logo">
            <img src="/befach_logo.png" alt="Befach International">
          </a>
          <div class="nav-links">
            <a href="/" class="${activePage==='home'?'active':''}">Home</a>
            <a href="/shop/" class="${activePage==='shop'?'active':''}">Shop All</a>
            <a href="/categories/" class="${activePage==='categories'?'active':''}">Categories</a>
            <a href="/states/" class="${activePage==='states'?'active':''}">By State</a>
            <a href="/about/" class="${activePage==='about'?'active':''}">Our Story</a>
            <a href="/gi-story/" class="${activePage==='gi-story'?'active':''}">India's GI Story</a>
            <a href="/landing/" class="${activePage==='landing'?'active':''}">Take the Survey</a>
          </div>
          <div class="nav-actions">
            <button class="nav-icon-btn" onclick="navSearch()" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            <button class="mobile-toggle" onclick="toggleMobileMenu()" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-overlay" id="mobileOverlay" onclick="toggleMobileMenu()"></div>
    <aside class="mobile-menu" id="mobileMenu">
      <a href="/">Home</a>
      <a href="/shop/">Shop All</a>
      <a href="/categories/">Categories</a>
      <a href="/states/">By State</a>
      <a href="/about/">Our Story</a>
      <a href="/gi-story/">India's GI Story</a>
      <a href="/landing/">Take the Survey</a>
    </aside>
  `;
}

function injectFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>Befach GI</h3>
            <p>Rooted in India. Respected Globally. Every product on Befach GI is sourced direct from the GI region it belongs to — protected origin, unbroken authenticity, fair price for the farmer.</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="/shop/">All Products</a></li>
              <li><a href="/categories/">Categories</a></li>
              <li><a href="/states/">By State</a></li>
              <li><a href="/shop/?category=Rice">Rice</a></li>
              <li><a href="/shop/?category=Other%20Spices">Spices</a></li>
              <li><a href="/shop/?category=Coffee">Coffee</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about/">Our Story</a></li>
              <li><a href="/gi-story/">India's GI Story</a></li>
              <li><a href="/about/#mission">Mission</a></li>
              <li><a href="/about/#farmers">Farmers</a></li>
              <li><a href="/about/#gi">What is GI?</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="mailto:sanjana.nadiwade@befach.com">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Policy</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Befach GI. All rights reserved.</span>
          <span><a href="/about/">About</a> · <a href="#">Privacy</a> · <a href="#">Terms</a> · exports.befach.com</span>
        </div>
      </div>
    </footer>
  `;
}

// ============================================
// INSTANT NAVIGATION — speculative prefetch
// Prefetches same-site pages on hover/pointer-down so they
// open instantly. Gracefully ignored by unsupported browsers.
// ============================================
function initPrefetch() {
  try {
    if (typeof HTMLScriptElement !== 'undefined' &&
        HTMLScriptElement.supports &&
        HTMLScriptElement.supports('speculationrules')) {
      const rules = {
        prefetch: [{
          source: 'document',
          where: { href_matches: '/*' },
          eagerness: 'moderate'
        }]
      };
      const s = document.createElement('script');
      s.type = 'speculationrules';
      s.textContent = JSON.stringify(rules);
      document.head.appendChild(s);
      return;
    }
  } catch (e) { /* fall through to manual prefetch */ }

  // Fallback: prefetch internal links on hover via <link rel="prefetch">
  const prefetched = new Set();
  const prefetch = (url) => {
    if (prefetched.has(url)) return;
    prefetched.add(url);
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = url;
    document.head.appendChild(l);
  };
  document.addEventListener('pointerover', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (a.target === '_blank') return;
    prefetch(a.href);
  }, { passive: true });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav and footer
  const navMount = document.getElementById('navMount');
  const footerMount = document.getElementById('footerMount');
  const activePage = document.body.dataset.page;

  if (navMount) navMount.innerHTML = injectNav(activePage);
  if (footerMount) footerMount.innerHTML = injectFooter();

  hydrateStaticPrices();
  initNavScroll();
  initReveal();
  initImageLoad();
  initPrefetch();

  // Add reveal class to common elements (NOT .product-grid — it's too tall and would never trigger)
  document.querySelectorAll('.section-header, .category-grid, .state-grid, .features-strip, .about-grid').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });
  setTimeout(initReveal, 50);
});
