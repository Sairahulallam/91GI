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
   spec     : set only when assets/docs/gi/<id>-gi-specification.pdf exists —
              the product's GI Journal entry (Rule 41(1) advertisement),
              extracted from the Journal issue the Registry serves.
              { journal: issue no., date: issue date YYYY-MM-DD, pages }
   ===================================================================== */
(function () {
  window.GI_DATA = {
    "lakadong-turmeric": { status: "registered", app: 741, cert: 575, valid: "2031-02-14", spec: { journal: 185, date: "2023-11-29", pages: 11 } },
    "kashmiri-long-chilli": { status: "pre-examination", app: 1295 },
    "kashmir-saffron": { status: "registered", app: 635, cert: 366, valid: "2028-12-02", spec: { journal: 127, date: "2020-01-01", pages: 19 } },
    "goa-cashew": { status: "registered", app: 714, cert: 506, valid: "2030-10-25", register: "Goa Cashew (Kaju Or Caju)", spec: { journal: 175, date: "2023-05-31", pages: 16 } },
    "araku-valley-coffee": { status: "registered", app: 607, cert: 334, valid: "2027-12-31", spec: { journal: 111, date: "2018-10-29", pages: 9 } },
    "mithila-makhana": { status: "registered", app: 696, cert: 421, valid: "2030-08-13", spec: { journal: 153, date: "2022-04-13", pages: 9 } },
    "badri-cow-ghee": { status: "registered", app: 1390, spec: { journal: 203, date: "2025-07-04", pages: 20 } },
    "basmati-rice": { status: "registered", app: 145, cert: 238, valid: "2028-11-25", register: "Basmati", spec: { journal: 34, date: "2010-05-31", pages: 9 } },
    "seeraga-samba": { status: "examination", app: 617 },
    "ambemohar-rice": { status: "registered", app: 478, cert: 279, valid: "2034-03-25", spec: { journal: 88, date: "2016-07-28", pages: 11 } },
    "gobindobhog-rice": { status: "registered", app: 531, cert: 297, valid: "2035-08-23", register: "Gobindabhog Rice", spec: { journal: 96, date: "2017-06-15", pages: 19 } },
    "sharbati-gehu": { status: "registered", app: 699, cert: 438, valid: "2030-09-07", spec: { journal: 165, date: "2022-10-21", pages: 12 } },
    "dagdi-jowar-jalna": { status: "registered", app: 953, cert: 604, valid: "2032-08-28", spec: { journal: 185, date: "2023-11-29", pages: 6 } },
    "mangalwedha-jowar": { status: "registered", app: 472, cert: 249, valid: "2034-03-25", spec: { journal: 76, date: "2015-11-27", pages: 10 } },
    "gurez-rajmash": { status: "pre-examination", app: 1333 },
    "thalanadan-grambu": { status: "registered", app: 1038, cert: 668, valid: "2032-12-27", spec: { journal: 197, date: "2024-11-27", pages: 12 } },
    "amravati-chana": { status: "registered", app: 1307, cert: 672, valid: "2034-07-07", spec: { journal: 197, date: "2024-11-27", pages: 10 } },
    "borsuri-tur-dal": { status: "registered", app: 826, cert: 590, valid: "2032-02-06", spec: { journal: 185, date: "2023-11-29", pages: 5 } },
    "gulbarga-tur-dal": { status: "registered", app: 593, cert: 353, valid: "2027-09-25", spec: { journal: 120, date: "2019-04-12", pages: 8 } },
    "mokama-masoor": { status: "pre-examination", app: 1553 },
    "tandur-redgram": { status: "registered", app: 706, cert: 430, spec: { journal: 160, date: "2022-08-05", pages: 11 } },
    "armoor-turmeric": { status: "examination", app: 1624 },
    "kandhamal-haladi": { status: "registered", app: 610, cert: 344, valid: "2028-01-10", spec: { journal: 115, date: "2018-11-30", pages: 15 } },
    "nandurbar-mirchi": { status: "registered", app: 787, cert: 579, valid: "2031-10-19", register: "Nandurbar Mirchi (Chilli)", spec: { journal: 185, date: "2023-11-29", pages: 9 } },
    "arunachal-bebo": { status: "pre-examination", app: 1664 },
    "himachali-kala-zeera": { status: "registered", app: 432, cert: 336, valid: "2033-07-16", spec: { journal: 112, date: "2018-10-31", pages: 8 } },
    "kanniyakumari-clove": { status: "registered", app: 675, cert: 406, valid: "2029-10-29", register: "Kanniyakumari Cloves", spec: { journal: 140, date: "2020-08-31", pages: 14 } },
    "kasti-coriander": { status: "registered", app: 827, cert: 591, valid: "2032-02-06" },
    "kolli-hills-pepper": { status: "pre-examination", app: 1272 },
    "pollachi-nutmeg": { status: "pre-examination", app: 1673 },
    "rajasthan-jeera": { status: "examination", app: 1588 },
    "rani-pepper": { status: "examination", app: 1472 },
    "sikkim-large-cardamom": { status: "registered", app: 376, cert: 222, valid: "2032-01-26", spec: { journal: 61, date: "2014-11-21", pages: 13 } },
    "jammu-kashmir-walnut": { status: "pre-examination", app: 1294 },
    "ladakh-apricot": { status: "pre-examination", app: 1468 },
    "sangli-raisins": { status: "registered", app: 490, cert: 263, valid: "2034-07-21", spec: { journal: 78, date: "2016-01-14", pages: 12 } },
    "kachchhi-kharek": { status: "registered", app: 761, cert: 539, valid: "2031-06-14", spec: { journal: 178, date: "2023-08-31", pages: 11 } },
    "kishtwar-chilgoga": { status: "pre-examination", app: 1304, register: "Kishtwar Chilgoga (Pine Nuts) Of Jammu & Kashmir" },
    "kishtwar-hazlenuts": { status: "pre-examination", app: 1762, register: "Kishtwar Hazlenuts" },
    "pangi-ki-thangi": { status: "examination", app: 1103 },
    "pollachi-tall-coconut": { status: "pre-examination", app: 1526, register: "Pollachi Tall Coconut (Pollachi Nettai Thennai)" },
    "jagtial-sesame": { status: "examination", app: 1577 },
    "onattukara-ellu": { status: "registered", app: 736, cert: 427, spec: { journal: 159, date: "2022-07-29", pages: 15 } },
    "ananthapuramu-groundnuts": { status: "pre-examination", app: 1799 },
    "chikmagalur-coffee": { status: "registered", app: 606, cert: 333, valid: "2027-12-31", spec: { journal: 111, date: "2018-10-29", pages: 11 } },
    "coorg-coffee": { status: "registered", app: 604, cert: 331, valid: "2027-12-31", spec: { journal: 111, date: "2018-10-29", pages: 9 } },
    "himalayan-nettle-tea": { status: "pre-examination", app: 1264 },
    "ladakh-seabuckthorn": { status: "registered", app: 727, cert: 484, valid: "2030-12-09", spec: { journal: 171, date: "2023-02-21", pages: 10 } },
    "nagori-ashwagandha": { status: "registered", app: 1143, register: "Fringes of the 'Thar Desert' and 'Nagori' Ashwagandha" },
    "himalayan-snow-garlic": { status: "pre-examination", app: 957, register: "Himalayan Garlic / Snow Mountain Garlic" },
    "lasalgaon-onion": { status: "registered", app: 491, cert: 258, valid: "2034-07-21", spec: { journal: 77, date: "2015-11-30", pages: 9 } },
    "karbi-anglong-ginger": { status: "registered", app: 435, cert: 226, valid: "2033-08-28", spec: { journal: 62, date: "2014-11-25", pages: 12 } },
    "baruasagar-adrak": { status: "examination", app: 1145 },
    "chettikulam-small-onion": { status: "registered", app: 920, cert: 694, valid: "2032-07-03", spec: { journal: 200, date: "2024-11-30", pages: 12 } },
    "farrukhabad-fulwa-aloo": { status: "examination", app: 1521 },
    "sikar-pyaj": { status: "pre-examination", app: 1608 },
    "assam-supari": { status: "examination", app: 1870 },
    "bastar-tamarind": { status: "examination", app: 1389 },
    "madanapalle-tamarind": { status: "pre-examination", app: 1790 },
    "sindhudurg-ratnagiri-kokum": { status: "registered", app: 474, cert: 250, valid: "2034-03-25", spec: { journal: 76, date: "2015-11-27", pages: 16 } },
    "sirsi-supari": { status: "registered", app: 464, cert: 337, valid: "2033-12-09", spec: { journal: 112, date: "2018-10-31", pages: 10 } }
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

  const ICON_SEAL =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 2l7 3v6c0 4.6-3 8.7-7 11-4-2.3-7-6.4-7-11V5l7-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>';
  const ICON_CLOCK =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const ICON_REGISTRY =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8"/><path d="M3 21h18"/></svg>';
  const ICON_DOC =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M14 3H6.5A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h11a1.5 1.5 0 001.5-1.5V8l-5-5z"/><path d="M14 3v5h5"/><path d="M8.5 13h7M8.5 16.5h5"/></svg>';
  const ICON_OUT =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>';

  function proofCard(href, icon, kicker, title, meta, cta) {
    return '<a class="gi-doc" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="gi-doc-icon">' + icon + "</span>" +
      '<span class="gi-doc-body">' +
      '<span class="gi-doc-kicker">' + esc(kicker) + "</span>" +
      '<span class="gi-doc-title">' + esc(title) + "</span>" +
      '<span class="gi-doc-meta">' + esc(meta) + "</span>" +
      "</span>" +
      '<span class="gi-doc-cta">' + esc(cta) + ICON_OUT + "</span>" +
      "</a>";
  }

  window.renderGICertificationPanel = function (productId) {
    const r = record(productId);
    if (!r) return "";

    const registered = r.status === "registered";
    let label, text;
    if (registered) {
      label = "GI Registered";
      text = "Registered under the Geographical Indications of Goods (Registration and Protection) Act, 1999";
    } else if (r.status === "examination") {
      label = "GI Application Filed";
      text = "GI application filed and under examination — not yet registered";
    } else {
      label = "GI Application Filed";
      text = "GI application filed — not yet examined or registered";
    }

    let html = '<div class="gi-proof">';
    html += '<div class="gi-status ' + (registered ? "is-registered" : "is-pending") + '">' +
      '<span class="gi-status-icon">' + (registered ? ICON_SEAL : ICON_CLOCK) + "</span>" +
      '<span><span class="gi-status-label">' + esc(label) + "</span>" +
      '<span class="gi-status-text">' + esc(text) + "</span></span></div>";

    const rows = [];
    if (r.register) rows.push(row("Name in GI Register", esc(r.register)));
    rows.push(row("GI application no.", esc(r.app)));
    if (registered && r.cert != null) rows.push(row("Certificate no.", esc(r.cert)));
    if (registered && r.valid) rows.push(row("Registration valid up to", esc(formatDate(r.valid))));
    html += '<dl class="pd-info">' + rows.join("") + "</dl>";

    html += '<p class="gi-proof-heading">Check it yourself</p><div class="gi-docs">';
    html += proofCard(
      window.GI_REGISTRY_URL(r.app), ICON_REGISTRY,
      "Government of India · GI Registry",
      registered ? "Official registration record" : "Official application record",
      "Application " + r.app + " · search.ipindia.gov.in",
      "Verify"
    );
    const specUrl = window.giSpecUrl(productId);
    if (specUrl) {
      const s = r.spec;
      const kicker = (s && s.journal ? "GI Journal No. " + s.journal : "GI Journal") +
        (s && s.date ? " · " + formatDate(s.date) : "");
      const meta = "Published by the GI Registry · PDF" + (s && s.pages ? ", " + s.pages + " pages" : "");
      html += proofCard(specUrl, ICON_DOC, kicker, "Official product specification", meta, "View");
    }
    html += "</div>";

    if (registered) {
      html += '<p class="gi-note">The Government record above is the authoritative, always-current proof of this GI. ' +
        "The Certificate of Registration is issued to the registered proprietor (the producer body or state agency), " +
        "and the GI Journal entry is the official specification the product must meet. " +
        'Law: <a href="' + esc(window.GI_ACT_URL) + '" target="_blank" rel="noopener noreferrer">GI Act, 1999</a>.</p>';
    } else {
      html += '<p class="gi-note">This product is sourced from its traditional region, but its GI application is still pending, so it is not sold as a GI-registered product. ' +
        'Law: <a href="' + esc(window.GI_ACT_URL) + '" target="_blank" rel="noopener noreferrer">GI Act, 1999</a>.</p>';
    }

    html += "</div>";
    return html;
  };
})();
