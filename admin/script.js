/* ===================================================================
   91 GI — Admin
   Two views, switched by the tabs in the top bar (and the URL hash):
     • Quotations  (#quotes, the default) — every "Request a Quote" from
                               product pages: status, reply, delete
     • Survey      (#survey) — aggregated validation stats
   Reads from the Apps Script backend (JSONP, so it works from a static
   site with no CORS headaches), or the survey from this device's
   localStorage in "preview" mode.
   =================================================================== */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const app = $("#app");
  const CFG_KEY = "gi_admin_cfg";
  const SKEY = "gi_admin_key";

  /* ===== BACKEND =====  your Google Apps Script Web App URL (the Sheet).
     The password is the ADMIN_KEY script property of that Apps Script
     project, checked by the server — it is never stored in this repo. */
  const BACKEND_URL = "https://script.google.com/macros/s/AKfycbw5Q-OKgN0QHkxGEhrgiqZyCjBMpJIv7hPRQfFM59lytb6ZRVakDA7bWy2nya1MDprctw/exec";

  let cfg = load();
  let mode = cfg ? "live" : null;     // "live" | "local"
  let timer = null;
  let view = viewFromHash();          // "survey" | "quotes"

  /* ---------------- config ---------------- */
  function load() { try { return JSON.parse(localStorage.getItem(CFG_KEY) || "null"); } catch (_) { return null; } }
  function store(c) { localStorage.setItem(CFG_KEY, JSON.stringify(c)); }
  function clearCfg() { localStorage.removeItem(CFG_KEY); }

  /* ---------------- JSONP fetch ---------------- */
  function fetchLive(url, key, query = "stats=1") {
    return new Promise((resolve, reject) => {
      const cb = "__giStats_" + Math.random().toString(36).slice(2);
      const sep = url.includes("?") ? "&" : "?";
      const s = document.createElement("script");
      const timeout = setTimeout(() => { cleanup(); reject(new Error("Timed out. Check the URL and that the web app is deployed to ‘Anyone’.")); }, 15000);
      function cleanup() { delete window[cb]; clearTimeout(timeout); s.remove(); }
      window[cb] = (data) => { cleanup(); resolve(data); };
      s.onerror = () => { cleanup(); reject(new Error("Couldn't reach the backend URL.")); };
      s.src = url + sep + query + "&key=" + encodeURIComponent(key) + "&callback=" + cb;
      document.body.appendChild(s);
    });
  }

  /* ---------------- local (this-device) aggregation ---------------- */
  function localStats() {
    const likes = JSON.parse(localStorage.getItem("gi_likes") || "[]");
    const resp = JSON.parse(localStorage.getItem("gi_validation") || "[]");
    let yes = 0, no = 0, contacts = 0;
    resp.forEach((r) => {
      const v = (r.verdict || "").toLowerCase();
      if (v === "yes") yes++; else if (v === "no") no++;
      if ((r.contact || "").trim()) contacts++;
    });
    const per = {}, likers = {};
    let likeClicks = 0, unlikeClicks = 0;
    likes.forEach((l) => {
      const pr = l.product || "", action = (l.action || "like").toLowerCase(), ses = l.session || "local";
      if (!per[pr]) per[pr] = { likes: 0, unlikes: 0 };
      if (action === "unlike") { per[pr].unlikes++; unlikeClicks++; }
      else { per[pr].likes++; likeClicks++; likers[ses] = true; }
    });
    const products = Object.keys(per).map((n) => ({ name: n, likes: per[n].likes, net: per[n].likes - per[n].unlikes })).sort((a, b) => b.net - a.net);
    const engaged = {};
    resp.forEach((r) => engaged[r.session || "local"] = true);
    Object.keys(likers).forEach((s) => engaged[s] = true);
    const recent = resp.slice(-15).reverse().map((r) => ({ ts: r.ts, verdict: r.verdict, liked: r.likedCount, contact: (r.contact || "").trim() ? "yes" : "", contactType: r.contactType }));
    return {
      ok: true, updated: new Date().toISOString(), responses: resp.length, yes, no,
      wouldBuyPct: resp.length ? Math.round(yes * 100 / resp.length) : 0,
      contacts, peopleWhoLiked: Object.keys(likers).length, totalLikeClicks: likeClicks,
      totalUnlikes: unlikeClicks, engagedSessions: Object.keys(engaged).length, products, recent
    };
  }

  /* ---------------- top bar controls ---------------- */
  function showControls(on) {
    ["#source", "#refresh", "#settings", "#autoWrap", "#tabs"].forEach((s) => $(s).hidden = !on);
    if (on) {
      const src = $("#source");
      src.textContent = mode === "live" ? "● Live · Google Sheet" : "● Preview · this device";
      src.className = "source " + (mode === "live" ? "source--live" : "source--local");
      document.querySelectorAll(".tabs__tab").forEach((t) => {
        if (t.dataset.view === view) t.setAttribute("aria-current", "page");
        else t.removeAttribute("aria-current");
      });
    }
  }
  $("#refresh").addEventListener("click", refresh);
  $("#settings").addEventListener("click", () => { try { sessionStorage.removeItem(SKEY); } catch (_) {} stopAuto(); renderLogin(); });
  $("#auto").addEventListener("change", (e) => e.target.checked ? startAuto() : stopAuto());
  function startAuto() { stopAuto(); timer = setInterval(refresh, 30000); }
  function stopAuto() { if (timer) clearInterval(timer); timer = null; }

  /* ---------------- views (tabs) ---------------- */
  function viewFromHash() { return location.hash === "#survey" ? "survey" : "quotes"; }
  window.addEventListener("hashchange", () => {
    const next = viewFromHash();
    if (next === view) return;
    view = next;
    if (mode) { showControls(true); refresh(); }
  });

  /* ---------------- flows ---------------- */
  function refresh() {
    if (view === "quotes") return loadQuotes();
    if (mode === "local") return render(localStats());
    app.dataset.loading = "1";
    fetchLive(cfg.url, cfg.key)
      .then((data) => { delete app.dataset.loading; data && data.ok ? render(data) : renderError((data && data.error) || "Unknown error"); })
      .catch((err) => { delete app.dataset.loading; renderError(err.message); });
  }

  function renderSetup(prefill) {
    showControls(false);
    const c = prefill || cfg || {};
    app.innerHTML = `
      <div class="setup">
        <h1>Connect your dashboard</h1>
        <p>Paste the Google Apps Script web-app URL and the admin password (its <code>ADMIN_KEY</code> script property).</p>
        <label for="u">Apps Script web-app URL</label>
        <input id="u" type="url" placeholder="https://script.google.com/macros/s/…/exec" value="${c.url || ""}" />
        <label for="k">Admin password</label>
        <input id="k" type="password" placeholder="••••••••" value="${c.key || ""}" />
        <div class="err" id="setupErr"></div>
        <div class="row">
          <button class="btn" id="connect">Connect</button>
          <button class="btn btn--ghost" id="useLocal">Preview with this device's data</button>
        </div>
        <p class="hint">The dashboard reads aggregated counts only. The admin key keeps the data private —
          anyone with the URL <em>and</em> key can view it, so don't share them. See
          <a href="../landing/survey-backend.gs">survey-backend.gs</a> for setup.</p>
      </div>`;
    $("#connect").addEventListener("click", () => {
      const url = $("#u").value.trim(), key = $("#k").value.trim();
      if (!url || !key) { $("#setupErr").textContent = "Enter both the URL and the admin key."; return; }
      $("#setupErr").textContent = "Connecting…";
      fetchLive(url, key).then((data) => {
        if (data && data.ok) { cfg = { url, key }; store(cfg); mode = "live"; showControls(true); showFirstView(data); }
        else $("#setupErr").textContent = (data && data.error) || "The backend rejected the key.";
      }).catch((e) => $("#setupErr").textContent = e.message);
    });
    $("#useLocal").addEventListener("click", () => { mode = "local"; showControls(true); refresh(); });
  }

  function renderError(msg) {
    showControls(true);
    app.innerHTML = `<div class="setup"><h1>Couldn't load stats</h1><p>${esc(msg)}</p>
      <div class="row"><button class="btn" id="retry">Retry</button>
      <button class="btn btn--ghost" id="reconfig">Change settings</button></div></div>`;
    $("#retry").addEventListener("click", refresh);
    $("#reconfig").addEventListener("click", () => { renderSetup(); showControls(false); });
  }

  /* ---------------- dashboard ---------------- */
  function render(d) {
    showControls(true);
    const maxNet = Math.max(1, ...d.products.map((p) => p.net));
    const bars = d.products.length ? d.products.map((p) => `
      <div class="brow">
        <div class="brow__top"><span class="brow__name">${esc(p.name)}</span><span class="brow__val">${p.net}</span></div>
        <div class="brow__track"><div class="brow__fill" style="width:${Math.round(p.net / maxNet * 100)}%"></div></div>
      </div>`).join("") : `<p class="empty">No likes yet.</p>`;

    const recent = d.recent.length ? d.recent.map((r) => `
      <li>
        <span class="tag tag--${String(r.verdict).toLowerCase() === "yes" ? "yes" : "no"}">${esc(r.verdict || "?")}</span>
        <span class="recent__meta">${r.liked || 0} liked${r.contact ? " · <b>contact</b>" : ""}</span>
        <span class="recent__time">${fmt(r.ts)}</span>
      </li>`).join("") : `<p class="empty">No responses yet.</p>`;

    const yesPct = d.responses ? Math.round(d.yes / d.responses * 100) : 0;

    app.innerHTML = `
      <div class="kpis">
        ${kpi("Responses", d.responses, "people who answered yes/no")}
        ${kpi("Would buy", d.wouldBuyPct + "%", d.yes + " yes · " + d.no + " no", "green")}
        ${kpi("People who liked", d.peopleWhoLiked, "tapped at least one heart", "accent")}
        ${kpi("Total like taps", d.totalLikeClicks, d.totalUnlikes ? d.totalUnlikes + " undone" : "across all products", "accent")}
        ${kpi("Contacts captured", d.contacts, "left a number / email")}
        ${kpi("Engaged people", d.engagedSessions, "liked or answered")}
      </div>

      <div class="cols">
        <section class="panel">
          <h2>Which products people would buy</h2>
          <p class="sub">Net likes per product (likes minus undone). Your demand ranking.</p>
          <div class="bars">${bars}</div>
        </section>

        <div style="display:flex;flex-direction:column;gap:18px">
          <section class="panel">
            <h2>Would you buy these?</h2>
            <p class="sub">The core yes / no signal.</p>
            <div class="split">
              <div class="split__cell split__cell--yes"><div class="split__n">${d.yes}</div><div class="split__l">Yes</div></div>
              <div class="split__cell split__cell--no"><div class="split__n">${d.no}</div><div class="split__l">No</div></div>
            </div>
            <div class="splitbar"><div class="splitbar__yes" style="width:${yesPct}%"></div></div>
          </section>

          <section class="panel">
            <h2>Recent responses</h2>
            <p class="sub">Last ${d.recent.length} answers.</p>
            <ul class="recent">${recent}</ul>
          </section>
        </div>
      </div>

      <div class="updated">Updated ${fmt(d.updated)}${mode === "local" ? " · this device only" : ""}</div>`;
  }

  function kpi(label, num, sub, variant) {
    return `<div class="kpi${variant ? " kpi--" + variant : ""}">
      <div class="kpi__label">${label}</div>
      <div class="kpi__num">${num}</div>
      <div class="kpi__sub">${esc(sub)}</div>
    </div>`;
  }

  /* ---------------- quotations ---------------- */
  const STATUSES = ["New", "Contacted", "Quoted", "Closed"];
  let quotesData = null;               // last reply from ?quotes=1
  const qState = { status: "All", search: "" };
  const saving = new Set();            // quote IDs whose status is being saved

  function loadQuotes() {
    if (mode === "local") return renderQuotesLocal();
    app.dataset.loading = "1";
    fetchLive(cfg.url, cfg.key, "quotes=1")
      .then((d) => {
        delete app.dataset.loading;
        if (d && d.ok) { quotesData = d; renderQuotes(); }
        else renderError((d && d.error) || "Unknown error");
      })
      .catch((err) => {
        delete app.dataset.loading;
        renderError("Couldn't load quotations (" + err.message + ") If this is the first time, check that the updated survey-backend.gs has been deployed as a new version.");
      });
  }

  // Keeps the "New" count on the Quotations tab current while viewing the survey.
  function loadQuoteBadge() {
    if (mode !== "live") return;
    fetchLive(cfg.url, cfg.key, "quotes=1").then((d) => { if (d && d.ok) { quotesData = d; paintBadge(); } }).catch(() => {});
  }

  function paintBadge() {
    const n = quotesData ? quotesData.quotes.filter((q) => (q.status || "New") === "New").length : 0;
    const b = $("#newBadge");
    b.textContent = n;
    b.hidden = n === 0;
    b.title = n + " new quotation" + (n === 1 ? "" : "s");
  }

  function renderQuotesLocal() {
    showControls(true);
    app.innerHTML = `<div class="setup"><h1>Quotations</h1>
      <p>Quote requests live in the Google Sheet, so they're only shown in live mode. Lock and log in with the admin password to see them.</p></div>`;
  }

  // Builds the static frame once; data refreshes only repaint its parts, so
  // the search box keeps focus and its text through auto-refresh.
  function renderQuotes() {
    showControls(true);
    if (!$("#quotesView")) {
      app.innerHTML = `
        <div id="quotesView">
          <div class="kpis" id="qKpis"></div>
          <section class="panel">
            <div class="qbar">
              <div class="chips" id="qChips" role="group" aria-label="Filter by status"></div>
              <input type="search" id="qSearch" class="qsearch" placeholder="Search buyer, company, product, country…" aria-label="Search quotations" />
            </div>
            <div class="qlist" id="qList"></div>
          </section>
          <div class="updated" id="qUpdated"></div>
        </div>`;
      $("#qSearch").value = qState.search;
      $("#qSearch").addEventListener("input", (e) => { qState.search = e.target.value; paintQuotes(); });
      $("#qChips").addEventListener("click", (e) => {
        const chip = e.target.closest("[data-status]");
        if (!chip) return;
        qState.status = chip.dataset.status;
        paintQuotes();
      });
      $("#qList").addEventListener("change", (e) => {
        if (e.target.matches("select[data-id]")) changeStatus(e.target.dataset.id, e.target.value);
      });
      $("#qList").addEventListener("click", (e) => {
        const del = e.target.closest("[data-delete]");
        if (del) deleteQuote(del.dataset.delete);
      });
    }
    paintQuotes();
  }

  function paintQuotes() {
    const all = quotesData.quotes;
    const count = (s) => all.filter((q) => (q.status || "New") === s).length;
    const week = all.filter((q) => Date.now() - new Date(q.ts) < 7 * 864e5).length;
    const byProduct = {};
    all.forEach((q) => { byProduct[q.product] = (byProduct[q.product] || 0) + 1; });
    const top = Object.keys(byProduct).sort((a, b) => byProduct[b] - byProduct[a])[0];

    $("#qKpis").innerHTML = `
      ${kpi("Quote requests", quotesData.total, "since launch")}
      ${kpi("New", count("New"), "waiting for a first reply", "accent")}
      ${kpi("Last 7 days", week, "requests this week", "green")}
      <div class="kpi"><div class="kpi__label">Most requested</div>
        <div class="kpi__text">${top ? esc(top) : "—"}</div>
        <div class="kpi__sub">${top ? byProduct[top] + " request" + (byProduct[top] === 1 ? "" : "s") : "no requests yet"}</div></div>`;

    $("#qChips").innerHTML = ["All"].concat(STATUSES).map((s) => `
      <button type="button" class="chip" data-status="${s}" aria-pressed="${qState.status === s}">
        ${s} <span class="chip__n">${s === "All" ? all.length : count(s)}</span></button>`).join("");

    const needle = qState.search.trim().toLowerCase();
    const shown = all.filter((q) =>
      (qState.status === "All" || (q.status || "New") === qState.status) &&
      (!needle || [q.id, q.name, q.company, q.email, q.product, q.country, q.message]
        .some((v) => String(v || "").toLowerCase().includes(needle))));

    $("#qList").innerHTML = shown.length ? shown.map(quoteCard).join("")
      : `<p class="empty">${all.length ? "No quotations match this filter." : "No quote requests yet. They appear here as soon as a buyer sends one from a product page."}</p>`;
    $("#qUpdated").textContent = "Updated " + fmt(quotesData.updated);
    paintBadge();
  }

  function quoteCard(q) {
    const status = q.status || "New";
    const email = String(q.email || "").replace(/[?&#\s]/g, "");
    const phone = String(q.phone || "");
    const dial = phone.replace(/[^\d+]/g, "");
    const wa = dial.replace(/\D/g, "");
    const subject = "Your 91GI quote " + q.id + " — " + q.product;
    const contact = [
      email && `<a href="mailto:${esc(email)}">${esc(email)}</a>`,
      phone && `<a href="tel:${esc(dial)}">${esc(phone)}</a>`,
      wa.length >= 8 && `<a href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>`
    ].filter(Boolean).join('<span class="dot">·</span>');

    return `
      <article class="quote quote--${status.toLowerCase()}">
        <div class="quote__head">
          <span class="quote__id">${esc(q.id)}</span>
          <span class="quote__time">${fmt(q.ts)}</span>
          <select class="qstatus" data-id="${esc(q.id)}" aria-label="Status of ${esc(q.id)}" ${saving.has(String(q.id)) ? "disabled" : ""}>
            ${STATUSES.map((s) => `<option${s === status ? " selected" : ""}>${s}</option>`).join("")}
          </select>
        </div>
        <div class="quote__product">
          <b>${esc(q.product)}</b>
          <span class="quote__qty">${esc(q.qty)} ${esc(q.qtyUnit)}</span>
        </div>
        ${q.priceRange ? `<div class="quote__range">Indicative ${esc(q.priceRange)}${q.unit ? " per " + esc(q.unit) : ""}</div>` : ""}
        <div class="quote__buyer">${[q.name, q.company, q.country].filter(Boolean).map(esc).join('<span class="dot">·</span>')}</div>
        <div class="quote__contact">${contact}</div>
        ${q.message ? `<p class="quote__msg">${esc(q.message)}</p>` : ""}
        <div class="quote__actions">
          ${email ? `<a class="btn btn--sm" href="mailto:${esc(email)}?subject=${encodeURIComponent(subject)}">Reply by email</a>`
            : wa.length >= 8 ? `<a class="btn btn--sm" href="https://wa.me/${wa}" target="_blank" rel="noopener">Message on WhatsApp</a>` : ""}
          <button type="button" class="btn btn--ghost btn--sm quote__delete" data-delete="${esc(q.id)}">Delete</button>
        </div>
      </article>`;
  }

  function changeStatus(id, status) {
    const q = quotesData.quotes.find((x) => String(x.id) === id);
    if (!q) return;
    const prev = q.status || "New";
    q.status = status;
    saving.add(id);
    paintQuotes();
    fetch(cfg.url, { method: "POST", body: JSON.stringify({ type: "quoteStatus", key: cfg.key, id, status }) })
      .then((r) => r.json())
      .then((d) => { if (!d || !d.ok) throw new Error((d && d.error) || "Not saved"); })
      .catch((err) => {
        q.status = prev;
        alert("Couldn't update " + id + ": " + err.message);
      })
      .finally(() => { saving.delete(id); if ($("#quotesView")) paintQuotes(); });
  }

  // Removes a quote for good (test or spam requests), straight from the admin.
  function deleteQuote(id) {
    if (!confirm("Delete " + id + " permanently? This can't be undone.")) return;
    quotesData.quotes = quotesData.quotes.filter((x) => String(x.id) !== id);
    quotesData.total = Math.max(0, quotesData.total - 1);
    paintQuotes();
    fetch(cfg.url, { method: "POST", body: JSON.stringify({ type: "quoteDelete", key: cfg.key, id }) })
      .then((r) => r.json())
      .then((d) => { if (!d || !d.ok) throw new Error((d && d.error) || "Not deleted"); })
      .catch((err) => {
        alert("Couldn't delete " + id + ": " + err.message);
        if (view === "quotes") loadQuotes();   // put the list back as the server has it
      });
  }

  /* ---------------- utils ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function fmt(ts) {
    if (!ts) return "—";
    const d = new Date(ts);
    if (isNaN(d)) return String(ts);
    return d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  /* ---------------- login (verified by the backend) ---------------- */
  function renderLogin(err) {
    showControls(false);
    app.innerHTML = `
      <div class="setup">
        <h1>Admin login</h1>
        <p>Enter the admin password to open the dashboard.</p>
        <label for="pw">Password</label>
        <input id="pw" type="password" placeholder="••••••••" autocomplete="current-password" />
        <div class="err" id="loginErr">${esc(err || "")}</div>
        <div class="row"><button class="btn" id="enter">Unlock</button></div>
      </div>`;
    const go = () => {
      const pw = $("#pw").value.trim();
      if (!pw) return;
      $("#loginErr").textContent = "Checking…";
      // The password is checked by loading the tab being opened, so one request does both.
      fetchLive(BACKEND_URL, pw, view === "quotes" ? "quotes=1" : "stats=1").then((d) => {
        if (d && d.ok) {
          try { sessionStorage.setItem(SKEY, pw); } catch (_) {}
          cfg = { url: BACKEND_URL, key: pw }; mode = "live";
          showControls(true);
          if (view === "quotes") { quotesData = d; renderQuotes(); }
          else { render(d); loadQuoteBadge(); }
        } else {
          renderLogin((d && d.error) || "Wrong password — try again.");
        }
      }).catch(() => renderLogin("Couldn't reach the admin service. If the Google script was just updated, check that it was deployed as a New version."));
    };
    $("#enter").addEventListener("click", go);
    $("#pw").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    $("#pw").focus();
  }

  // After connecting a custom backend (checked via the survey stats), show
  // whichever tab the URL asked for.
  function showFirstView(stats) {
    if (view === "quotes") return loadQuotes();
    render(stats);
    loadQuoteBadge();
  }

  /* ---------------- boot ---------------- */
  let savedKey = null;
  try { savedKey = sessionStorage.getItem(SKEY); } catch (_) {}
  if (savedKey) {
    cfg = { url: BACKEND_URL, key: savedKey }; mode = "live"; showControls(true); refresh();
    if (view === "survey") loadQuoteBadge();
  }
  else renderLogin();
})();
