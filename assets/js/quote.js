// Befach — Request a Quote
// Buyers ask for a quote instead of buying through a cart. Each request is
// POSTed to the Apps Script backend (landing/survey-backend.gs), which saves
// it to the "Quotes" sheet, emails the sales team, and lists it in /admin.
// Needs main.js (formatPriceRange, QUOTE_ICON) loaded first.

const QUOTE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw5Q-OKgN0QHkxGEhrgiqZyCjBMpJIv7hPRQfFM59lytb6ZRVakDA7bWy2nya1MDprctw/exec';

// Contact details are remembered on this device so a buyer requesting
// several products doesn't retype them.
const QUOTE_BUYER_KEY = '91gi_quote_buyer';
const QUOTE_BUYER_FIELDS = ['name', 'company', 'email', 'phone', 'country'];

let quoteProduct = null;

function quoteEsc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// p is a catalog product, or a general enquiry that isn't tied to one product:
//   { general: true, id, name (saved as the product), heading, subtitle }
// A general enquiry has no price and asks the buyer which products they need.
function renderQuoteDialog(p) {
  const sub = p.general
    ? quoteEsc(p.subtitle || '')
    : `${quoteEsc(p.region)}, ${quoteEsc(p.state)} · Indicative ${formatPriceRange(p)}`;
  const msgLabel = p.general ? 'Which products do you need?' : 'Requirements (optional)';
  const msgHint = p.general
    ? 'e.g. Kashmir saffron, Lakadong turmeric. Add packaging, destination port and timeline if you know them.'
    : 'Packaging, grade, certifications, destination port, timeline…';
  return `
    <dialog class="quote-dialog" id="quoteDialog" aria-labelledby="quoteTitle">
      <button type="button" class="quote-close" onclick="closeQuote()" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <form class="quote-form" id="quoteForm">
        <span class="eyebrow">${p.general ? 'Bulk &amp; trade enquiry' : 'Request a quote'}</span>
        <h2 id="quoteTitle">${quoteEsc(p.heading || p.name)}</h2>
        <p class="quote-sub">${sub}</p>

        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="qName">Full name</label>
            <input type="text" id="qName" name="name" class="form-input" autocomplete="name" required maxlength="120" />
          </div>
          <div class="form-field">
            <label class="form-label" for="qCompany">Company (optional)</label>
            <input type="text" id="qCompany" name="company" class="form-input" autocomplete="organization" maxlength="160" />
          </div>
        </div>
        <!-- Email or phone: at least one is needed, neither is required on its own -->
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="qEmail">Email</label>
            <input type="email" id="qEmail" name="email" class="form-input" autocomplete="email" maxlength="160" aria-describedby="qContactHint" />
          </div>
          <div class="form-field">
            <label class="form-label" for="qPhone">Phone / WhatsApp</label>
            <input type="tel" id="qPhone" name="phone" class="form-input" autocomplete="tel" maxlength="40" placeholder="+1 555 010 2030" aria-describedby="qContactHint" />
          </div>
        </div>
        <p class="quote-hint" id="qContactHint">Fill in your email, your phone number, or both.</p>
        <div class="form-field">
          <label class="form-label" for="qCountry">Country</label>
          <input type="text" id="qCountry" name="country" class="form-input" autocomplete="country-name" required maxlength="80" />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label" for="qQty">Quantity</label>
            <input type="number" id="qQty" name="qty" class="form-input" min="1" step="any" inputmode="decimal" required placeholder="e.g. 500" />
          </div>
          <div class="form-field">
            <label class="form-label" for="qUnit">Unit</label>
            <select id="qUnit" name="qtyUnit" class="form-input">
              <option value="kg">kg</option>
              <option value="MT">Metric tonnes (MT)</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label" for="qMessage">${msgLabel}</label>
          <textarea id="qMessage" name="message" class="form-input" maxlength="3000" placeholder="${quoteEsc(msgHint)}"${p.general ? ' required' : ''}></textarea>
        </div>

        <!-- Honeypot: hidden from people, filled in by spam bots -->
        <div class="quote-hp" aria-hidden="true">
          <label for="qWebsite">Website</label>
          <input type="text" id="qWebsite" name="website" tabindex="-1" autocomplete="off" />
        </div>

        <p class="quote-error" id="quoteError" role="alert"></p>
        <button type="submit" class="btn-quote" id="quoteSubmit">${QUOTE_ICON} Send quote request</button>
        <p class="quote-fineprint">Our export team gets back to you with pricing for your volume and destination.</p>
      </form>

      <div class="quote-done" id="quoteDone" hidden>
        <div class="quote-done-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2>Request received</h2>
        <p class="quote-done-ref">Reference <strong id="quoteRef"></strong></p>
        <p class="quote-done-text">We'll get back to you at <strong id="quoteDoneContact"></strong> with a quote for <strong id="quoteDoneQty"></strong>.</p>
        <button type="button" class="btn btn-primary" onclick="closeQuote()">Done</button>
      </div>
    </dialog>
  `;
}

// Mounts the dialog for this product and opens it straight away when the
// page was reached through a "Request Quote" link (…#quote).
function initQuote(p) {
  quoteProduct = p;
  document.body.insertAdjacentHTML('beforeend', renderQuoteDialog(p));
  const dialog = document.getElementById('quoteDialog');
  document.getElementById('quoteForm').addEventListener('submit', submitQuote);
  // Typing in either contact field clears the "email or phone" message.
  ['qEmail', 'qPhone'].forEach(id => document.getElementById(id).addEventListener('input', clearContactErrors));
  dialog.addEventListener('close', () => {
    if (location.hash === '#quote') history.replaceState(null, '', location.pathname + location.search);
  });
  // Clicking the dimmed backdrop (outside the panel) closes the dialog.
  dialog.addEventListener('click', (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) closeQuote();
  });
  if (location.hash === '#quote') openQuote();
  window.addEventListener('hashchange', () => { if (location.hash === '#quote') openQuote(); });
}

function openQuote() {
  const dialog = document.getElementById('quoteDialog');
  if (!dialog || dialog.open) return;
  const form = document.getElementById('quoteForm');
  // Start fresh after a previous request was sent.
  if (form.hidden) {
    form.reset();
    form.hidden = false;
    document.getElementById('quoteDone').hidden = true;
  }
  prefillBuyer(form);
  clearContactErrors();
  document.getElementById('quoteError').textContent = '';
  dialog.showModal();
  // Start at the first thing still to fill in (returning buyers skip to quantity).
  const f = form.elements;
  const next = [f.name, (f.email.value || f.phone.value) ? null : f.email, f.country, f.qty].find(el => el && !el.value);
  (next || f.name).focus();
}

function clearContactErrors() {
  document.getElementById('qEmail').setCustomValidity('');
  document.getElementById('qPhone').setCustomValidity('');
}

// Email and phone are each optional, but the buyer must give at least one,
// and a phone number must be a full number. Returns false (and shows the
// browser's message on the field) when the check fails.
function checkContact(f) {
  clearContactErrors();
  const email = f.email.value.trim();
  const phone = f.phone.value.trim();
  if (!email && !phone) {
    f.email.setCustomValidity('Please enter your email or your phone number.');
    f.email.reportValidity();
    return false;
  }
  if (phone && phone.replace(/\D/g, '').length < 7) {
    f.phone.setCustomValidity('Please enter a full phone number, with country code.');
    f.phone.reportValidity();
    return false;
  }
  return true;
}

function closeQuote() {
  const dialog = document.getElementById('quoteDialog');
  if (dialog && dialog.open) dialog.close();
}

function prefillBuyer(form) {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(QUOTE_BUYER_KEY) || 'null'); } catch (_) {}
  if (!saved) return;
  QUOTE_BUYER_FIELDS.forEach(f => {
    const el = form.elements[f];
    if (el && !el.value && saved[f]) el.value = saved[f];
  });
}

function rememberBuyer(data) {
  const buyer = {};
  QUOTE_BUYER_FIELDS.forEach(f => { buyer[f] = data[f]; });
  try { localStorage.setItem(QUOTE_BUYER_KEY, JSON.stringify(buyer)); } catch (_) {}
}

async function submitQuote(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('quoteSubmit');
  const errorEl = document.getElementById('quoteError');
  const p = quoteProduct;
  const f = form.elements;
  if (!checkContact(f)) return;
  const data = {
    type: 'quote',
    productId: p.id,
    product: p.name,
    // Pack size is never shown to buyers; it goes to the sales team only,
    // because the catalog price range is per pack.
    unit: p.unit || '',
    priceRange: p.general ? '' : formatPriceRange(p),
    qty: f.qty.value.trim(),
    qtyUnit: f.qtyUnit.value,
    name: f.name.value.trim(),
    company: f.company.value.trim(),
    email: f.email.value.trim(),
    phone: f.phone.value.trim(),
    country: f.country.value.trim(),
    message: f.message.value.trim(),
    website: f.website.value,
    page: location.origin + location.pathname + location.search
  };

  errorEl.textContent = '';
  btn.disabled = true;
  btn.classList.add('is-sending');
  let out = null;
  try {
    // A plain-text body keeps this a "simple" CORS request (no preflight),
    // which Apps Script web apps can answer.
    const res = await fetch(QUOTE_ENDPOINT, { method: 'POST', body: JSON.stringify(data) });
    out = await res.json();
  } catch (_) { /* network failure or a non-JSON reply — handled below */ }
  btn.disabled = false;
  btn.classList.remove('is-sending');

  // Only a reply carrying a quote ID means the request was saved.
  if (out && out.ok && out.quoteId) {
    rememberBuyer(data);
    showQuoteDone(out.quoteId, data);
  } else {
    errorEl.textContent = (out && out.error) || "We couldn't send your request. Please check your connection and try again.";
  }
}

function showQuoteDone(quoteId, data) {
  document.getElementById('quoteRef').textContent = quoteId;
  document.getElementById('quoteDoneContact').textContent = data.email || data.phone;
  document.getElementById('quoteDoneQty').textContent = quoteProduct.general
    ? `${data.qty} ${data.qtyUnit}`
    : `${data.qty} ${data.qtyUnit} of ${data.product}`;
  document.getElementById('quoteForm').hidden = true;
  document.getElementById('quoteDone').hidden = false;
}
