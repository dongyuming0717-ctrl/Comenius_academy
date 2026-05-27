// ── State ────────────────────────────────────────────────────────

let currentPapers = [];

// ── DOM refs ─────────────────────────────────────────────────────

const filterSubject = document.getElementById("filterSubject");
const filterYear = document.getElementById("filterYear");
const filterSession = document.getElementById("filterSession");
const searchBtn = document.getElementById("searchBtn");
const paperList = document.getElementById("paperList");
const resultCount = document.getElementById("resultCount");
const sortOrder = document.getElementById("sortOrder");

const previewModal = document.getElementById("previewModal");
const modalTitle = document.getElementById("modalTitle");
const modalFrame = document.getElementById("modalFrame");
const modalClose = document.getElementById("modalClose");

// ── Theme ────────────────────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
}

// ── API ──────────────────────────────────────────────────────────

async function fetchPapers() {
  const params = new URLSearchParams();
  const subject = filterSubject.value;
  const year = filterYear.value;
  const session = filterSession.value;

  if (subject) params.set("subject", subject);
  if (year) params.set("year", year);
  if (session) params.set("season", session);

  const resp = await fetch(`api/papers?${params.toString()}`);
  return resp.json();
}

async function fetchSubjects() {
  const resp = await fetch("api/subjects");
  return resp.json();
}

async function fetchYears() {
  const resp = await fetch("api/years");
  return resp.json();
}

// ── Grouping ─────────────────────────────────────────────────────

/**
 * Group papers by (subject_code, year, season, paper_number).
 * Each group has at most one QP and one MS.
 */
function groupPapers(papers) {
  const map = new Map();
  for (const p of papers) {
    const key = `${p.subject_code}|${p.year}|${p.season}|${p.paper_number}`;
    if (!map.has(key)) {
      map.set(key, {
        subject_code: p.subject_code,
        subject_name: p.subject_name,
        year: p.year,
        season: p.season,
        paper_number: p.paper_number,
        qp: null,
        ms: null,
        er: null,
        ir: null,
        in: null,
      });
    }
    const g = map.get(key);
    if (p.type === "qp") g.qp = p;
    else if (p.type === "ms") g.ms = p;
    else if (p.type === "er") g.er = p;
    else if (p.type === "ir") g.ir = p;
    else if (p.type === "in") g.in = p;
  }
  return [...map.values()];
}

// ── Render ───────────────────────────────────────────────────────

function renderGroupCard(g) {
  const paperId = g.paper_number ? `P${g.paper_number}` : '';
  const code = paperId
    ? `${g.subject_code}/${g.year}/${g.season}/${paperId}`
    : `${g.subject_code}/${g.year}/${g.season}`;
  const hasQP = !!g.qp;
  const hasMS = !!g.ms;

  const viewSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  const dlSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

  let buttons = "";
  if (hasQP) {
    buttons += `
      <button class="btn btn-outline btn-sm preview-btn" data-path="${g.qp.relative_path}" data-title="${code} — Question Paper">
        ${viewSvg} View QP
      </button>
      <a class="btn btn-primary btn-sm" href="api/download/${encodeURI(g.qp.relative_path)}">
        ${dlSvg} Download QP
      </a>`;
  }
  if (hasMS) {
    buttons += `
      <button class="btn btn-outline btn-sm preview-btn" data-path="${g.ms.relative_path}" data-title="${code} — Marking Scheme">
        ${viewSvg} View MS
      </button>
      <a class="btn btn-primary btn-sm" href="api/download/${encodeURI(g.ms.relative_path)}">
        ${dlSvg} Download MS
      </a>`;
  }

  const qpBadge = hasQP ? '<span class="type-badge type-qp">QP</span>' : '';
  const msBadge = hasMS ? '<span class="type-badge type-ms">MS</span>' : '';

  return `
    <div class="paper-card">
      <div class="paper-card-inner">
        <div class="paper-info">
          <span class="paper-code">${code}</span>
          <span class="paper-subject">${g.subject_name}</span>
          <span class="paper-level">${g.subject_code.startsWith("97") || g.subject_code.startsWith("96") ? "A-Level" : "IGCSE"}</span>
          ${qpBadge}${msBadge}
        </div>
        <div class="paper-actions">
          ${buttons}
        </div>
      </div>
    </div>`;
}

function bindEvents() {
  document.querySelectorAll(".paper-code").forEach((el) => {
    el.addEventListener("click", () => {
      // Default: open QP if the card has a QP button, otherwise open the first preview button
      const card = el.closest(".paper-card");
      const previewBtn = card.querySelector(".preview-btn");
      if (previewBtn) {
        openPreview(previewBtn.dataset.path, previewBtn.dataset.title);
      }
    });
  });

  document.querySelectorAll(".preview-btn").forEach((el) => {
    el.addEventListener("click", () => {
      openPreview(el.dataset.path, el.dataset.title);
    });
  });
}

// ── Preview Modal ────────────────────────────────────────────────

function openPreview(path, title) {
  modalTitle.textContent = title;
  modalFrame.src = `api/pdf/${encodeURI(path)}`;
  previewModal.classList.add("open");
}

function closePreview() {
  previewModal.classList.remove("open");
  modalFrame.src = "";
}

modalClose.addEventListener("click", closePreview);
previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) closePreview();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePreview();
});

// ── Search ───────────────────────────────────────────────────────

function sortGroups(groups) {
  const sort = sortOrder.value;
  if (sort === "newest") return [...groups].sort((a, b) => b.year - a.year || a.subject_code.localeCompare(b.subject_code));
  if (sort === "oldest") return [...groups].sort((a, b) => a.year - b.year || a.subject_code.localeCompare(b.subject_code));
  return groups;
}

function renderGroupedList(groups) {
  resultCount.textContent = `Showing ${groups.length} past papers`;
  if (groups.length === 0) {
    paperList.innerHTML = '<div class="empty-state">No papers found matching your filters.</div>';
    return;
  }
  paperList.innerHTML = groups.map(renderGroupCard).join("");
  bindEvents();
}

async function loadAndRender() {
  paperList.innerHTML = '<div class="empty-state">Loading...</div>';
  try {
    currentPapers = await fetchPapers();
    const groups = groupPapers(currentPapers);
    renderGroupedList(sortGroups(groups));
  } catch (e) {
    paperList.innerHTML = '<div class="empty-state">Failed to load. Please try again.</div>';
  }
}

searchBtn.addEventListener("click", loadAndRender);
sortOrder.addEventListener("change", () => {
  if (currentPapers.length) {
    const groups = groupPapers(currentPapers);
    renderGroupedList(sortGroups(groups));
  }
});

// ── Init ─────────────────────────────────────────────────────────

async function init() {
  initTheme();

  const subjects = await fetchSubjects();
  subjects.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.subject_code;
    opt.textContent = `${s.subject_code} — ${s.subject_name}`;
    filterSubject.appendChild(opt);
  });

  const years = await fetchYears();
  years.forEach((y) => {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    filterYear.appendChild(opt);
  });

  // Show placeholder — don't load all papers on init
  resultCount.textContent = 'Use the filters above and click Search to browse past papers';
  paperList.innerHTML = '<div class="empty-state">Select your subject, year, and session, then click <strong>Search</strong> to find past papers.</div>';
}

init();
