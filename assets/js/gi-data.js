/* =====================================================================
   91GI — Per-product GI registration data
   Source: Government of India GI Registry
   (search.ipindia.gov.in/GIRPublicSearch), verified 16 Nov 2026.

   Keyed by product id from products.js. Kept separate from products.js
   so it can be re-verified against the Registry independently.

   status   : "registered" | "pre-examination" | "examination"
   app      : GI application number
   cert     : certificate number (omitted when not published)
   valid    : registration valid-up-to date, YYYY-MM-DD (omitted when absent)
   register : name in the GI Register, only when it differs from the site name
   spec     : true when assets/docs/gi/<id>-gi-specification.pdf exists — the
              product's GI Journal entry (Rule 41(1) advertisement), extracted
              from the Journal issue the Registry serves
   ===================================================================== */
(function () {
  window.GI_DATA = {
    "lakadong-turmeric": { status: "registered", app: 741, cert: 575, valid: "2031-02-14", spec: true },
    "kashmiri-long-chilli": { status: "pre-examination", app: 1295 },
    "kashmir-saffron": { status: "registered", app: 635, cert: 366, valid: "2028-12-02", spec: true },
    "goa-cashew": { status: "registered", app: 714, cert: 506, valid: "2030-10-25", register: "Goa Cashew (Kaju Or Caju)", spec: true },
    "araku-valley-coffee": { status: "registered", app: 607, cert: 334, valid: "2027-12-31", spec: true },
    "mithila-makhana": { status: "registered", app: 696, cert: 421, valid: "2030-08-13", spec: true },
    "badri-cow-ghee": { status: "registered", app: 1390, spec: true },
    "basmati-rice": { status: "registered", app: 145, cert: 238, valid: "2028-11-25", register: "Basmati", spec: true },
    "seeraga-samba": { status: "examination", app: 617 },
    "ambemohar-rice": { status: "registered", app: 478, cert: 279, valid: "2034-03-25", spec: true },
    "gobindobhog-rice": { status: "registered", app: 531, cert: 297, valid: "2035-08-23", register: "Gobindabhog Rice", spec: true },
    "sharbati-gehu": { status: "registered", app: 699, cert: 438, valid: "2030-09-07", spec: true },
    "dagdi-jowar-jalna": { status: "registered", app: 953, cert: 604, valid: "2032-08-28", spec: true },
    "mangalwedha-jowar": { status: "registered", app: 472, cert: 249, valid: "2034-03-25", spec: true },
    "gurez-rajmash": { status: "pre-examination", app: 1333 },
    "thalanadan-grambu": { status: "registered", app: 1038, cert: 668, valid: "2032-12-27", spec: true },
    "amravati-chana": { status: "registered", app: 1307, cert: 672, valid: "2034-07-07", spec: true },
    "borsuri-tur-dal": { status: "registered", app: 826, cert: 590, valid: "2032-02-06", spec: true },
    "gulbarga-tur-dal": { status: "registered", app: 593, cert: 353, valid: "2027-09-25", spec: true },
    "mokama-masoor": { status: "pre-examination", app: 1553 },
    "tandur-redgram": { status: "registered", app: 706, cert: 430, spec: true },
    "armoor-turmeric": { status: "examination", app: 1624 },
    "kandhamal-haladi": { status: "registered", app: 610, cert: 344, valid: "2028-01-10", spec: true },
    "nandurbar-mirchi": { status: "registered", app: 787, cert: 579, valid: "2031-10-19", register: "Nandurbar Mirchi (Chilli)", spec: true },
    "arunachal-bebo": { status: "pre-examination", app: 1664 },
    "himachali-kala-zeera": { status: "registered", app: 432, cert: 336, valid: "2033-07-16", spec: true },
    "kanniyakumari-clove": { status: "registered", app: 675, cert: 406, valid: "2029-10-29", register: "Kanniyakumari Cloves", spec: true },
    "kasti-coriander": { status: "registered", app: 827, cert: 591, valid: "2032-02-06" },
    "kolli-hills-pepper": { status: "pre-examination", app: 1272 },
    "pollachi-nutmeg": { status: "pre-examination", app: 1673 },
    "rajasthan-jeera": { status: "examination", app: 1588 },
    "rani-pepper": { status: "examination", app: 1472 },
    "sikkim-large-cardamom": { status: "registered", app: 376, cert: 222, valid: "2032-01-26", spec: true },
    "jammu-kashmir-walnut": { status: "pre-examination", app: 1294 },
    "ladakh-apricot": { status: "pre-examination", app: 1468 },
    "sangli-raisins": { status: "registered", app: 490, cert: 263, valid: "2034-07-21", spec: true },
    "kachchhi-kharek": { status: "registered", app: 761, cert: 539, valid: "2031-06-14", spec: true },
    "kishtwar-chilgoga": { status: "pre-examination", app: 1304, register: "Kishtwar Chilgoga (Pine Nuts) Of Jammu & Kashmir" },
    "kishtwar-hazlenuts": { status: "pre-examination", app: 1762, register: "Kishtwar Hazlenuts" },
    "pangi-ki-thangi": { status: "examination", app: 1103 },
    "pollachi-tall-coconut": { status: "pre-examination", app: 1526, register: "Pollachi Tall Coconut (Pollachi Nettai Thennai)" },
    "jagtial-sesame": { status: "examination", app: 1577 },
    "onattukara-ellu": { status: "registered", app: 736, cert: 427, spec: true },
    "ananthapuramu-groundnuts": { status: "pre-examination", app: 1799 },
    "chikmagalur-coffee": { status: "registered", app: 606, cert: 333, valid: "2027-12-31", spec: true },
    "coorg-coffee": { status: "registered", app: 604, cert: 331, valid: "2027-12-31", spec: true },
    "himalayan-nettle-tea": { status: "pre-examination", app: 1264 },
    "ladakh-seabuckthorn": { status: "registered", app: 727, cert: 484, valid: "2030-12-09", spec: true },
    "nagori-ashwagandha": { status: "registered", app: 1143, register: "Fringes of the 'Thar Desert' and 'Nagori' Ashwagandha" },
    "himalayan-snow-garlic": { status: "pre-examination", app: 957, register: "Himalayan Garlic / Snow Mountain Garlic" },
    "lasalgaon-onion": { status: "registered", app: 491, cert: 258, valid: "2034-07-21", spec: true },
    "karbi-anglong-ginger": { status: "registered", app: 435, cert: 226, valid: "2033-08-28", spec: true },
    "baruasagar-adrak": { status: "examination", app: 1145 },
    "chettikulam-small-onion": { status: "registered", app: 920, cert: 694, valid: "2032-07-03", spec: true },
    "farrukhabad-fulwa-aloo": { status: "examination", app: 1521 },
    "sikar-pyaj": { status: "pre-examination", app: 1608 },
    "assam-supari": { status: "examination", app: 1870 },
    "bastar-tamarind": { status: "examination", app: 1389 },
    "madanapalle-tamarind": { status: "pre-examination", app: 1790 },
    "sindhudurg-ratnagiri-kokum": { status: "registered", app: 474, cert: 250, valid: "2034-03-25", spec: true },
    "sirsi-supari": { status: "registered", app: 464, cert: 337, valid: "2033-12-09", spec: true }
  };

  window.GI_SPEC_BASE = "/assets/docs/gi/";

  window.GI_ACT_URL = "https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_49_1_gi-act-1999.pdf";

  window.GI_REGISTRY_URL = function (app) {
    return "https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/" + app;
  };

  function record(productId) {
    return Object.prototype.hasOwnProperty.call(window.GI_DATA, productId)
      ? window.GI_DATA[productId]
      : null;
  }

  window.giIsRegistered = function (productId) {
    const r = record(productId);
    return !!r && r.status === "registered";
  };

  window.giBadge = function (productId) {
    const r = record(productId);
    if (!r) return null;
    return r.status === "registered" ? "GI Registered" : "GI Application Filed";
  };

  window.giSpecUrl = function (productId) {
    const r = record(productId);
    return r && r.spec ? window.GI_SPEC_BASE + productId + "-gi-specification.pdf" : null;
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // "2028-12-02" -> "02 Dec 2028". Parsed by hand to avoid timezone shifts.
  function formatDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
    if (!m) return String(iso);
    return m[3] + " " + MONTHS[Number(m[2]) - 1] + " " + m[1];
  }

  function row(label, valueHtml) {
    return '<div class="pd-info-row"><dt>' + esc(label) + "</dt><dd>" + valueHtml + "</dd></div>";
  }

  window.renderGICertificationPanel = function (productId) {
    const r = record(productId);
    if (!r) return "";

    const registered = r.status === "registered";
    let status;
    if (registered) {
      status = "Registered under the Geographical Indications of Goods (Registration and Protection) Act, 1999";
    } else if (r.status === "examination") {
      status = "GI application filed and under examination — not yet registered";
    } else {
      status = "GI application filed — not yet examined or registered";
    }

    const rows = [row("GI status", esc(status))];
    if (r.register) rows.push(row("Name in GI Register", esc(r.register)));
    rows.push(row("GI application no.", esc(r.app)));
    if (registered && r.cert != null) rows.push(row("Certificate no.", esc(r.cert)));
    if (registered && r.valid) rows.push(row("Registration valid up to", esc(formatDate(r.valid))));
    const specUrl = window.giSpecUrl(productId);
    if (specUrl) {
      rows.push(row("Product specification",
        '<a href="' + esc(specUrl) + '" target="_blank" rel="noopener noreferrer">GI Journal entry — official product specification (PDF)</a>'));
    }

    const registryUrl = window.GI_REGISTRY_URL(r.app);
    let html = '<dl class="pd-info">' + rows.join("") + "</dl>";
    html += '<p class="pd-allergens"><strong>Verify at source:</strong> ' +
      '<a href="' + esc(registryUrl) + '" target="_blank" rel="noopener noreferrer">GI Registry record for application ' + esc(r.app) + "</a>" +
      ' · <a href="' + esc(window.GI_ACT_URL) + '" target="_blank" rel="noopener noreferrer">GI Act, 1999</a></p>';

    if (!registered) {
      html += '<p class="pd-allergens">This product is sourced from its traditional region, but its GI application is still pending, so it is not sold as a GI-registered product.</p>';
    }

    return html;
  };
})();
