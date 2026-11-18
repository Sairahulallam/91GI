// Befach GI — "Sold by" seller box on every product page.
//
// The contact details live here, in one place. Change them here and every
// product page picks them up.

const SELLER = {
  name: 'Befach International',
  city: 'Hyderabad, India',
  business: 'Sourcing & Export',
  logo: '/befach_logo.png',
  phone: '+91 92814 42908',          // shown to buyers
  phoneDial: '+919281442908',        // used for the call link
  whatsapp: '919281442908',          // country code + number, digits only
  email: 'sanjana.nadiwade@befach.com',
};

const SELLER_ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.63a20.6 20.6 0 0 0-2.27-.12c-2.24 0-3.78 1.37-3.78 3.89v2.16H7.93v2.94h2.53V21h3.04z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  flagIndia: `<svg class="seller-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#FF9933"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width="0.7"/><circle cx="15" cy="10" r="0.6" fill="#000080"/></svg>`,
};

// A clean link to this product (no extra query bits), used for sharing.
function sellerProductUrl(product) {
  return `${window.location.origin}/product/?id=${encodeURIComponent(product.id)}`;
}

function renderSellerCard(product) {
  const url = sellerProductUrl(product);
  const enc = encodeURIComponent;

  const waText = `Hi ${SELLER.name}, I am interested in ${product.name}. ${url}`;
  const waLink = `https://wa.me/${SELLER.whatsapp}?text=${enc(waText)}`;
  const mailLink = `mailto:${SELLER.email}?subject=${enc(`Enquiry: ${product.name}`)}&body=${enc(`Hi ${SELLER.name},\n\nI am interested in ${product.name}.\n${url}\n\n`)}`;

  const shareText = `${product.name} from ${product.state}, on Befach GI`;
  const share = [
    { key: 'whatsapp', label: 'Share on WhatsApp', href: `https://wa.me/?text=${enc(`${shareText}: ${url}`)}` },
    { key: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { key: 'x', label: 'Share on X (Twitter)', href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}` },
  ];

  return `
    <aside class="seller-card" aria-label="Seller">
      <div class="seller-head">
        <a href="/about/" class="seller-logo" aria-label="About ${SELLER.name}">
          <img src="${SELLER.logo}" alt="${SELLER.name} logo" loading="lazy" />
        </a>
        <div class="seller-id">
          <span class="seller-label">Sold by</span>
          <a href="/about/" class="seller-name">${SELLER.name}</a>
          <span class="seller-place">${SELLER_ICONS.flagIndia}${SELLER.city}</span>
        </div>
      </div>
      <p class="seller-ops">Business: <strong>${SELLER.business}</strong></p>

      <ul class="seller-contacts">
        <li>
          <a href="tel:${SELLER.phoneDial}">
            <span class="seller-contact-icon">${SELLER_ICONS.phone}</span>
            <span><span class="seller-contact-label">Call</span>${SELLER.phone}</span>
          </a>
        </li>
        <li>
          <a href="${waLink}" target="_blank" rel="noopener">
            <span class="seller-contact-icon is-whatsapp">${SELLER_ICONS.whatsapp}</span>
            <span><span class="seller-contact-label">WhatsApp</span>${SELLER.phone}</span>
          </a>
        </li>
        <li>
          <a href="${mailLink}">
            <span class="seller-contact-icon">${SELLER_ICONS.mail}</span>
            <span><span class="seller-contact-label">Email</span><span class="seller-email">${SELLER.email.replace('@', '<wbr>@')}</span></span>
          </a>
        </li>
      </ul>

      <a class="btn-contact-seller" href="${waLink}" target="_blank" rel="noopener">
        ${SELLER_ICONS.whatsapp}
        Contact Seller
      </a>

      <div class="seller-share">
        <span>Share on:</span>
        ${share.map(s => `
          <a class="seller-share-btn is-${s.key}" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${SELLER_ICONS[s.key]}</a>
        `).join('')}
        <button type="button" class="seller-share-btn is-link" id="sellerCopyLink" data-url="${url}" aria-label="Copy link" title="Copy link">${SELLER_ICONS.link}</button>
        <span class="seller-copied" id="sellerCopied" role="status" aria-live="polite"></span>
      </div>
    </aside>
  `;
}

function initSellerCard() {
  const btn = document.getElementById('sellerCopyLink');
  const note = document.getElementById('sellerCopied');
  if (!btn || !note) return;

  let timer;
  const show = (msg) => {
    note.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(() => { note.textContent = ''; }, 2500);
  };

  // Older browsers / non-https pages: copy through a hidden text box.
  const fallbackCopy = (text) => {
    const box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('readonly', '');
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.appendChild(box);
    box.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    box.remove();
    return ok;
  };

  btn.addEventListener('click', async () => {
    const url = btn.dataset.url;
    try {
      await navigator.clipboard.writeText(url);
      show('Link copied');
    } catch (e) {
      show(fallbackCopy(url) ? 'Link copied' : 'Could not copy the link');
    }
  });
}
