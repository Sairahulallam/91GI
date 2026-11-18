/**
 * Befach — backend + stats API (Google Apps Script)
 * ------------------------------------------------------------------
 * Stores what the site collects and serves it to the /admin dashboard.
 * 100% free, no server.
 *
 *   • Responses tab  — one row per yes/no answer (landing page survey)
 *   • Likes tab      — one row per heart tap (so you can count likes
 *                      and how many people tapped, even if they don't finish)
 *   • Quotes tab     — one row per "Request a Quote" from a product page.
 *                      Every new quote is emailed to QUOTE_NOTIFY_EMAIL and
 *                      listed under Quotations in /admin.
 *
 * ADMIN PASSWORD — kept in Script properties, never in this file
 *   This repository is public, so anything written here can be read by
 *   anyone (and with it every buyer's name, email and phone). Set it in
 *   Apps Script → ⚙ Project Settings → Script properties →
 *   Add script property:  ADMIN_KEY  =  <the /admin password>.
 *   To change the password later, edit that value. No redeploy needed.
 *
 * UPDATING AN EXISTING DEPLOYMENT (keeps the same URL)
 *   1. Paste this file over the old code, Save.
 *   2. Make sure the ADMIN_KEY script property above exists.
 *   3. Run sendTestQuoteEmail once from the editor: it asks Google for
 *      permission to send email, and confirms the notification arrives.
 *   4. Deploy → Manage deployments → ✏️ Edit → Version: "New version" → Deploy.
 *
 * FIRST-TIME SETUP (about 5 minutes)
 * 1. Create a new Google Sheet (sheet.new).
 * 2. Extensions → Apps Script. Delete the sample, paste THIS file, Save.
 * 3. Add the ADMIN_KEY script property (see above).
 * 4. Deploy → New deployment → gear → "Web app".
 *      • Execute as     : Me
 *      • Who has access : Anyone
 *    Deploy, authorise, and COPY the "Web app URL".
 * 5. Paste that URL into landing/script.js (SURVEY_ENDPOINT),
 *    admin/script.js (BACKEND_URL) and assets/js/quote.js (QUOTE_ENDPOINT).
 * 6. Open /admin/ and log in with the ADMIN_KEY password. Done.
 *
 * Note: every heart tap writes a row. For a normal validation campaign
 * that's fine; if you expect huge traffic you can stop logging likes by
 * removing the sendToBackend(likePing) line in script.js.
 */

const SHEET_RESPONSES = "Responses";
const SHEET_LIKES     = "Likes";
const SHEET_QUOTES    = "Quotes";

const QUOTE_NOTIFY_EMAIL = "sanjana.nadiwade@befach.com";  // gets an email for every quote
const SITE_URL           = "https://exporters.befach.com";  // used for the admin link in that email
const QUOTE_STATUSES     = ["New", "Contacted", "Quoted", "Closed"];
const QUOTE_HEADER = ["Timestamp", "Quote ID", "Status", "Product", "Product ID", "Pack",
                      "Indicative price (USD)", "Quantity", "Unit", "Name", "Company", "Email",
                      "Phone / WhatsApp", "Country", "Message", "Page"];

/* ---------- write (landing page survey, product-page quotes, admin) ---------- */
function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); }
  catch (err) { return out({ ok: false, error: "Bad request." }, null); }

  if (data.type === "quote") return saveQuote(data);
  if (data.type === "quoteStatus") return setQuoteStatus(data);
  if (data.type === "quoteDelete") return deleteQuote(data);

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "like") {
      tab(ss, SHEET_LIKES, ["Timestamp", "Session", "Product", "Action"])
        .appendRow([new Date(), data.session || "", data.product || "", data.action || "like"]);
    } else {
      tab(ss, SHEET_RESPONSES, ["Timestamp", "Session", "Would buy?", "# liked", "Products they'd buy", "Contact", "Contact type"])
        .appendRow([new Date(), data.session || "", data.verdict || "", data.likedCount || 0,
                    (data.liked || []).join(", "), data.contact || "", data.contactType || ""]);
    }
    return out({ ok: true }, null);
  } catch (err) {
    return out({ ok: false, error: String(err) }, null);
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

/* ---------- read (from the /admin dashboard) ---------- */
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!p.quotes && !p.stats) return ContentService.createTextOutput("Befach backend is live.");
  const denied = authError(p.key);
  if (denied) return out({ ok: false, error: denied }, p.callback);
  return out(p.quotes ? listQuotes() : buildStats(), p.callback);
}

// null when `key` is the admin password, otherwise the message to show.
function authError(key) {
  const real = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY");
  if (!real) return "The admin password isn't set up yet. In Apps Script, open Project Settings → Script properties and add ADMIN_KEY.";
  return String(key || "") === real ? null : "Wrong password — try again.";
}

function buildStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Rows without a yes/no aren't real answers (e.g. a request the old
  // script misfiled), so they don't count.
  const R = rows(ss, SHEET_RESPONSES)    // [Timestamp, Session, Verdict, #liked, Products, Contact, ContactType]
    .filter(r => String(r[2]).trim() !== "");
  const L = rows(ss, SHEET_LIKES);       // [Timestamp, Session, Product, Action]

  // responses
  let yes = 0, no = 0, contacts = 0;
  R.forEach(r => {
    const v = String(r[2]).toLowerCase();
    if (v === "yes") yes++; else if (v === "no") no++;
    if (String(r[5]).trim()) contacts++;
  });
  const recent = R.slice(-15).reverse().map(r => ({
    ts: r[0], verdict: r[2], liked: r[3], contact: String(r[5]).trim() ? "yes" : "", contactType: r[6]
  }));

  // likes
  const per = {}, likers = {};
  let likeClicks = 0, unlikeClicks = 0;
  L.forEach(r => {
    const session = String(r[1]), product = String(r[2]), action = String(r[3]).toLowerCase();
    if (!per[product]) per[product] = { likes: 0, unlikes: 0 };
    if (action === "unlike") { per[product].unlikes++; unlikeClicks++; }
    else { per[product].likes++; likeClicks++; likers[session] = true; }
  });
  const products = Object.keys(per).map(name => ({
    name: name, likes: per[name].likes, net: per[name].likes - per[name].unlikes
  })).sort((a, b) => b.net - a.net);

  const engaged = {};
  R.forEach(r => engaged[String(r[1])] = true);
  Object.keys(likers).forEach(s => engaged[s] = true);

  return {
    ok: true,
    updated: new Date(),
    responses: R.length,
    yes: yes, no: no,
    wouldBuyPct: R.length ? Math.round(yes * 100 / R.length) : 0,
    contacts: contacts,
    peopleWhoLiked: Object.keys(likers).length,
    totalLikeClicks: likeClicks,
    totalUnlikes: unlikeClicks,
    engagedSessions: Object.keys(engaged).length,
    products: products,
    recent: recent
  };
}

/* ---------- quotes ---------- */
// A buyer's "Request a Quote" from a product page: save it, then email it.
function saveQuote(d) {
  // Honeypot field: people never see it, bots fill it. Pretend success, store nothing.
  if (clean(d.website, 200)) return out({ ok: true, quoteId: "received" }, null);

  const q = {
    product:    clean(d.product, 200),
    productId:  clean(d.productId, 100),
    unit:       clean(d.unit, 50),
    priceRange: clean(d.priceRange, 60),
    qty:        clean(d.qty, 30),
    qtyUnit:    clean(d.qtyUnit, 60),
    name:       clean(d.name, 120),
    company:    clean(d.company, 160),
    email:      clean(d.email, 160),
    phone:      clean(d.phone, 40),
    country:    clean(d.country, 80),
    message:    clean(d.message, 3000, true),
    page:       clean(d.page, 300)
  };
  // Email and phone are each optional, but at least one is needed; whichever
  // is given must look real.
  const emailOk = !q.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email);
  const phoneOk = !q.phone || q.phone.replace(/\D/g, "").length >= 7;
  if (!q.product || !q.name || !q.country || !(Number(q.qty) > 0) ||
      !(q.email || q.phone) || !emailOk || !phoneOk) {
    return out({ ok: false, error: "Please fill in your name, your email or phone number, your country and the quantity." }, null);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = tab(SpreadsheetApp.getActiveSpreadsheet(), SHEET_QUOTES, QUOTE_HEADER);
    // Sequential IDs from a stored counter, so deleting a sheet row never reuses one.
    const props = PropertiesService.getScriptProperties();
    const seq = Number(props.getProperty("quoteSeq") || sh.getLastRow() - 1) + 1;
    props.setProperty("quoteSeq", String(seq));
    q.id = "Q-" + String(seq).padStart(4, "0");
    q.ts = new Date();
    sh.appendRow([q.ts, q.id, "New"].concat([
      q.product, q.productId, q.unit, q.priceRange, q.qty, q.qtyUnit, q.name,
      q.company, q.email, q.phone, q.country, q.message, q.page
    ].map(asText)));
  } catch (err) {
    console.error("Quote not saved: " + err);
    return out({ ok: false, error: "We couldn't save your request just now. Please try again in a minute." }, null);
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }

  // Sent after the lock is released; the quote is already safe in the sheet
  // and in /admin even if the email fails (e.g. daily mail quota reached).
  try { notifyQuote(q); } catch (err) { console.error("Quote email failed for " + q.id + ": " + err); }
  return out({ ok: true, quoteId: q.id }, null);
}

function notifyQuote(q) {
  const fields = [
    ["Product", q.product],
    ["Quantity", q.qty + " " + q.qtyUnit],
    ["Indicative price", q.priceRange + (q.unit ? " per " + q.unit : "")],
    ["Name", q.name],
    ["Company", q.company],
    ["Email", q.email],
    ["Phone / WhatsApp", q.phone],
    ["Country", q.country],
    ["Requirements", q.message]
  ].filter(function (f) { return f[1]; });
  const adminUrl = SITE_URL + "/admin/#quotes";
  const when = Utilities.formatDate(q.ts, Session.getScriptTimeZone(), "d MMM yyyy, h:mm a");
  // Buyers may leave only a phone number; then there's no one to reply to by email.
  const howToReply = q.email
    ? "Reply to this email to answer the buyer directly"
    : "The buyer left no email. Contact them on " + q.phone + " (phone / WhatsApp)";

  const text = "New quote request " + q.id + " (" + when + ")\n\n" +
    fields.map(function (f) { return f[0] + ": " + f[1]; }).join("\n") +
    "\n\n" + howToReply + ".\nAll quotations: " + adminUrl;

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0F1F17;max-width:560px">' +
      '<h2 style="margin:0 0 4px;font-size:20px">New quote request ' + q.id + '</h2>' +
      '<p style="margin:0 0 18px;color:#6B6F6C">' + when + '</p>' +
      '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">' +
        fields.map(function (f) {
          return '<tr><td style="padding:7px 16px 7px 0;color:#6B6F6C;vertical-align:top;white-space:nowrap">' + htmlEsc(f[0]) + '</td>' +
                 '<td style="padding:7px 0;white-space:pre-wrap">' + htmlEsc(f[1]) + '</td></tr>';
        }).join("") +
      '</table>' +
      '<p style="margin:22px 0 0">' + htmlEsc(howToReply) + ', or ' +
        '<a href="' + adminUrl + '" style="color:#1B4332">open all quotations in the admin</a>.</p>' +
    '</div>';

  const mail = {
    to: QUOTE_NOTIFY_EMAIL,
    name: "Befach Quotes",
    subject: oneLine("New quote " + q.id + ": " + q.product + " — " + q.qty + " " + q.qtyUnit + " (" + q.country + ")"),
    body: text,
    htmlBody: html
  };
  if (q.email) mail.replyTo = q.email;
  MailApp.sendEmail(mail);
}

// Admin: change a quote's status (New → Contacted → Quoted → Closed).
function setQuoteStatus(d) {
  const denied = authError(d.key);
  if (denied) return out({ ok: false, error: denied }, null);
  const status = String(d.status || "");
  if (QUOTE_STATUSES.indexOf(status) < 0) return out({ ok: false, error: "Unknown status." }, null);

  return withQuoteRow(d.id, function (sh, row) {
    sh.getRange(row, 3).setValue(status);
    return { ok: true, id: String(d.id), status: status };
  });
}

// Admin: permanently remove a quote (test or spam requests).
function deleteQuote(d) {
  const denied = authError(d.key);
  if (denied) return out({ ok: false, error: denied }, null);
  return withQuoteRow(d.id, function (sh, row) {
    sh.deleteRow(row);
    return { ok: true, id: String(d.id), deleted: true };
  });
}

// Finds the Quotes sheet row for a quote ID (under the script lock) and
// hands it to `fn`, whose return value becomes the JSON reply.
function withQuoteRow(id, fn) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_QUOTES);
    if (sh && sh.getLastRow() >= 2) {
      const ids = sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === String(id)) return out(fn(sh, i + 2), null);
      }
    }
    return out({ ok: false, error: "Quote " + String(id) + " not found." }, null);
  } catch (err) {
    return out({ ok: false, error: String(err) }, null);
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

// Admin: every quote, newest first (capped so the JSONP reply stays small).
function listQuotes() {
  const Q = rows(SpreadsheetApp.getActiveSpreadsheet(), SHEET_QUOTES);
  const quotes = Q.slice(-1000).reverse().map(function (r) {
    return {
      ts: r[0], id: r[1], status: r[2] || "New", product: r[3], productId: r[4], unit: r[5],
      priceRange: r[6], qty: r[7], qtyUnit: r[8], name: r[9], company: r[10], email: r[11],
      phone: r[12], country: r[13], message: r[14]
    };
  });
  return { ok: true, updated: new Date(), total: Q.length, statuses: QUOTE_STATUSES, quotes: quotes };
}

// Run this once from the Apps Script editor (select it → ▶ Run). It asks for
// permission to send email and sends a sample notification to QUOTE_NOTIFY_EMAIL.
// Nothing is written to the sheet.
function sendTestQuoteEmail() {
  notifyQuote({
    id: "Q-TEST", ts: new Date(), product: "Kashmir Saffron", unit: "1 g", priceRange: "$3.11 – $4.16",
    qty: "500", qtyUnit: "kg", name: "Test Buyer", company: "Test Imports Ltd", email: QUOTE_NOTIFY_EMAIL,
    phone: "+1 555 010 2030", country: "United States", message: "This is a test notification from survey-backend.gs."
  });
}

/* ---------- helpers ---------- */
// Trim, drop control characters, cap the length; newlines only where allowed.
function clean(v, max, multiline) {
  let s = String(v == null ? "" : v);
  s = multiline ? s.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
                : s.replace(/[\u0000-\u001F\u007F]+/g, " ");
  return s.trim().slice(0, max);
}
function oneLine(s) { return String(s).replace(/\s+/g, " ").trim(); }
// Store visitor text as plain text, so "+44 20…" keeps its "+" and "=…" can never run as a formula.
function asText(v) { return v === "" ? v : "'" + v; }
function htmlEsc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function tab(ss, name, header) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(header);
  return sh;
}
function rows(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}
function out(obj, callback) {
  const body = JSON.stringify(obj);
  if (callback) return ContentService.createTextOutput(callback + "(" + body + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
