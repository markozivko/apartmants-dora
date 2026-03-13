/* ============================================================
   APARTMENT DORA — Availability Calendar
   Admin access: click footer logo 5× quickly → enter password
   ============================================================ */

'use strict';

// ── Config ────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'dora2025'; // Change this to your own password

// ── Default booked data (edit these arrays to pre-set bookings)
// Format: 'YYYY-MM-DD' strings
const DEFAULT_BOOKED = {
  apt1: [
    "2026-05-07",
    "2026-05-08",
    "2026-05-09",
    "2026-05-10",
    "2026-05-11",
    "2026-05-12",
    "2026-05-13",
    "2026-05-14",
    "2026-05-15",
    "2026-04-01",
    "2026-04-09",
    "2026-04-02",
    "2026-04-03",
    "2026-04-04",
    "2026-04-05",
    "2026-04-06",
    "2026-04-07",
    "2026-04-08"
  ],
  apt2: [
    "2026-04-16",
    "2026-04-17",
    "2026-04-18",
    "2026-04-19",
    "2026-04-27",
    "2026-04-28",
    "2026-04-29",
    "2026-04-30"
  ]
};





// ── State ─────────────────────────────────────────────────────
let bookedDates = loadDates();
let currentApt  = 'apt1';
let calYear     = new Date().getFullYear();
let calMonth    = new Date().getMonth();
let isAdmin     = false;

// ── Persistence ───────────────────────────────────────────────
function loadDates() {
  try {
    const saved = localStorage.getItem('dora_booked');
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  return { apt1: [...DEFAULT_BOOKED.apt1], apt2: [...DEFAULT_BOOKED.apt2] };
}

function saveDates() {
  localStorage.setItem('dora_booked', JSON.stringify(bookedDates));
}

// ── Helpers ───────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function toDateStr(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function isBooked(apt, ds) {
  return (bookedDates[apt] || []).includes(ds);
}

function toggleDate(apt, ds) {
  if (!bookedDates[apt]) bookedDates[apt] = [];
  const idx = bookedDates[apt].indexOf(ds);
  if (idx >= 0) {
    bookedDates[apt].splice(idx, 1);
  } else {
    bookedDates[apt].push(ds);
  }
  saveDates();
  renderCalendar();
}

// ── Get translations from main.js LOCALES ─────────────────────
function t(key) {
  // LOCALES and currentLang are defined in main.js (loaded before calendar.js)
  try { return LOCALES[currentLang]?.availability?.[key] || key; }
  catch (_) { return key; }
}

// ── Render ────────────────────────────────────────────────────
function renderCalendar() {
  const grid  = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid || !label) return;

  const today    = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const months = t('months');
  const days   = t('days');

  label.textContent = `${Array.isArray(months) ? months[calMonth] : calMonth} ${calYear}`;

  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday-first
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  let html = '';

  // Day headers
  (Array.isArray(days) ? days : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).forEach(d => {
    html += `<div class="cal__day-header">${d}</div>`;
  });

  // Empty cells
  for (let i = 0; i < offset; i++) {
    html += `<div class="cal__day cal__day--empty"></div>`;
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const ds     = toDateStr(calYear, calMonth, d);
    const isPast = ds < todayStr;
    const isToday = ds === todayStr;
    const booked = isBooked(currentApt, ds);

    let cls = 'cal__day';
    if (isPast)        cls += ' cal__day--past';
    else if (booked)   cls += ' cal__day--booked';
    else               cls += ' cal__day--available';
    if (isToday)       cls += ' cal__day--today';
    if (isAdmin && !isPast) cls += ' cal__day--admin';

    const label = isToday ? `<span class="cal__today-dot"></span>${d}` : d;
    html += `<div class="${cls}" data-date="${ds}">${label}</div>`;
  }

  grid.innerHTML = html;

  // Admin: click to toggle
  if (isAdmin) {
    grid.querySelectorAll('.cal__day--admin').forEach(el => {
      el.addEventListener('click', () => toggleDate(currentApt, el.dataset.date));
    });
  }
}

// ── Admin mode ────────────────────────────────────────────────
function enterAdmin() {
  const pw = prompt('Admin password:');
  if (pw === ADMIN_PASSWORD) {
    isAdmin = true;
    document.getElementById('adminBar').classList.add('active');
    renderCalendar();
  } else if (pw !== null) {
    alert('Incorrect password.');
  }
}

function exitAdmin() {
  isAdmin = false;
  document.getElementById('adminBar').classList.remove('active');
  renderCalendar();
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Tab switch
  document.querySelectorAll('.avail__tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.avail__tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentApt = btn.dataset.apt;
      renderCalendar();
    });
  });

  // Month navigation
  document.getElementById('calPrev')?.addEventListener('click', () => {
    if (calMonth === 0) { calMonth = 11; calYear--; }
    else calMonth--;
    renderCalendar();
  });

  document.getElementById('calNext')?.addEventListener('click', () => {
    if (calMonth === 11) { calMonth = 0; calYear++; }
    else calMonth++;
    renderCalendar();
  });

  // Admin exit
  document.getElementById('exitAdminBtn')?.addEventListener('click', exitAdmin);

  // Export/copy data — outputs ready-to-paste JS
  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const apt1 = (bookedDates.apt1 || []).map(d => `    "${d}"`).join(',\n');
    const apt2 = (bookedDates.apt2 || []).map(d => `    "${d}"`).join(',\n');
    const output = `const DEFAULT_BOOKED = {\n  apt1: [\n${apt1}\n  ],\n  apt2: [\n${apt2}\n  ]\n};`;
    navigator.clipboard?.writeText(output).then(() => {
      alert('Copied!\n\nIn calendar.js, select the entire DEFAULT_BOOKED block (lines 13–23) and paste over it.');
    }).catch(() => {
      prompt('Copy this and replace DEFAULT_BOOKED in calendar.js:', output);
    });
  });

  // Secret admin access: click footer logo 5× within 2 seconds
  let clicks = 0;
  let clickTimer;
  document.querySelector('.footer__logo')?.addEventListener('click', () => {
    clicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clicks = 0; }, 2000);
    if (clicks >= 5) {
      clicks = 0;
      isAdmin ? exitAdmin() : enterAdmin();
    }
  });

  // Re-render calendar when language switches (observe lang attribute)
  const observer = new MutationObserver(() => renderCalendar());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  renderCalendar();
});
