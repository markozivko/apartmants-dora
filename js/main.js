/* ============================================================
   APARTMENT DORA — Main JavaScript
   ============================================================ */

'use strict';

// ── State ─────────────────────────────────────────────────────
let currentLang = 'en';
let translations = {};

// ── Inline translations (works with file:// and any server) ───
const LOCALES = {
  en: {
    nav: { about: "About", gallery: "Gallery", amenities: "Amenities", location: "Location", contact: "Contact" },
    hero: { tagline: "Your private oasis on the Adriatic", cta: "Discover more" },
    about: {
      label: "About",
      title: "A Place to Truly Unwind",
      description: "Dora is a private house with two spacious apartments, each designed as a sanctuary of calm and comfort. Tucked away in the serene village of Povljana on the island of Pag, this is the kind of place where the outside world fades — replaced by the sound of the sea, the warmth of the sun, and the simple joy of doing nothing at all. Whether you arrive as a family or a group of friends, Dora offers everything you need to rest, recharge, and return to yourself.",
      detail1_number: "2", detail1_label: "Apartments",
      detail2_number: "90m²", detail2_label: "Per Apartment",
      detail3_number: "6", detail3_label: "Guests Each"
    },
    gallery: { label: "Gallery", title: "A Glimpse of Apartments Dora" },
    amenities: {
      label: "Amenities", title: "Everything You Need, Nothing You Don't",
      items: [
        { icon: "wifi",            title: "Free Wi-Fi",        desc: "High-speed internet throughout the apartment" },
        { icon: "air-conditioning",title: "Air Conditioning",  desc: "Stay cool and rested during warm summer days" },
        { icon: "parking",         title: "Free Parking",      desc: "Private parking space for each apartment" },
        { icon: "bbq",             title: "BBQ Area",          desc: "Shared barbecue area for long, relaxed evenings" },
        { icon: "kitchen",         title: "Full Kitchen",      desc: "Fully equipped kitchen — cook, eat, slow down" },
        { icon: "beach",           title: "Steps from the Sea", desc: "The crystal-clear Adriatic is just few minutes walking away" }
      ]
    },
    location: {
      label: "Location", title: "Povljana, Island of Pag",
      description: "Povljana is one of the quietest and most unspoilt villages on the island of Pag — a place where time moves differently. Known for its shallow, crystal-clear waters and long sandy beach, it's ideal for families and anyone who simply wants to breathe. The island is easily reached by ferry and offers a blend of untouched nature, local food, and genuine Adriatic island life.",
      cta: "Open in Google Maps"
    },
    contact: {
      label: "Contact", title: "Get in Touch",
      description: "Interested in a stay or have a question? We're happy to help — reach out and we'll get back to you personally.",
      name_placeholder: "Your Name", email_placeholder: "Your Email",
      message_placeholder: "Your Message", send: "Send Message on WhatsApp",
      or: "Or reach us directly", phone: "+385 99 811 5120"
    },
    footer: { rights: "All rights reserved." }
  },
  hr: {
    nav: { about: "O nama", gallery: "Galerija", amenities: "Sadržaji", location: "Lokacija", contact: "Kontakt" },
    hero: { tagline: "Vaša privatna oaza na Jadranu", cta: "Otkrijte više" },
    about: {
      label: "O nama",
      title: "Mjesto gdje se zaista odmarate",
      description: "Dora je privatna kuća s dva prostrana apartmana, svaki uređen kao utočište mira i udobnosti. Smještena u mirnom selu Povljana na otoku Pagu, ovo je mjesto gdje vanjski svijet jednostavno nestaje — zamijenjuje ga zvuk mora, toplina sunca i lagodnost pravog odmora. Bilo da dolazite kao obitelj ili prijatelji, Dora nudi sve što vam treba da se odmorite, napunite baterije i pronađete sebe.",
      detail1_number: "2", detail1_label: "Apartmana",
      detail2_number: "90m²", detail2_label: "Po apartmanu",
      detail3_number: "6", detail3_label: "Osoba svaki"
    },
    gallery: { label: "Galerija", title: "Pogled na Apartmane Dora" },
    amenities: {
      label: "Sadržaji", title: "Sve što trebate, ništa suvišno",
      items: [
        { icon: "wifi",            title: "Besplatni Wi-Fi",           desc: "Brzi internet u cijelom apartmanu" },
        { icon: "air-conditioning",title: "Klima uređaj",              desc: "Svjež i ugodan zrak i u najtoplijim danima" },
        { icon: "parking",         title: "Besplatno parkiranje",      desc: "Privatno parkirno mjesto za svaki apartman" },
        { icon: "bbq",             title: "Roštilj",                   desc: "Zajednički roštilj za opuštene večeri na otvorenom" },
        { icon: "kitchen",         title: "Potpuno opremljena kuhinja",desc: "Kuhajte, jedite, usporite — sve je tu" },
        { icon: "beach",           title: "Korak do mora",             desc: "Kristalno čisto Jadransko more udaljeno svega par minuta hoda" }
      ]
    },
    location: {
      label: "Lokacija", title: "Povljana, otok Pag",
      description: "Povljana je jedno od najtišnijih i najočuvanijih mjesta na otoku Pagu — mjesto gdje vrijeme teče drugačije. Poznata po plitkom, kristalno bistrom moru i dugoj pješčanoj plaži, idealna je za obitelji i sve koji žele jednostavno predahnuti. Otok je lako dostupan trajektom i nudi kombinaciju netaknute prirode, domaće hrane i autentičnog jadranskog života.",
      cta: "Otvori u Google Mapsu"
    },
    contact: {
      label: "Kontakt", title: "Javite nam se",
      description: "Zanima vas boravak ili imate pitanje? Rado ćemo odgovoriti — pišite nam i javit ćemo se osobno.",
      name_placeholder: "Vaše ime", email_placeholder: "Vaš e-mail",
      message_placeholder: "Vaša poruka", send: "Pošalji poruku na WhatsApp",
      or: "Ili nas kontaktirajte direktno", phone: "+385 99 811 5120"
    },
    footer: { rights: "Sva prava pridržana." }
  }
};

// ── i18n ──────────────────────────────────────────────────────
function get(obj, path) {
  return path.split('.').reduce((acc, k) => acc?.[k], obj);
}

function applyTranslations(t) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = get(t, el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = get(t, el.dataset.i18nPlaceholder);
    if (val !== undefined) el.placeholder = val;
  });

  renderAmenities(t.amenities?.items || []);
}

function switchLang(lang) {
  if (lang === currentLang && Object.keys(translations).length) return;

  translations = LOCALES[lang];
  currentLang = lang;
  document.documentElement.lang = lang;

  applyTranslations(translations);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ── Amenities renderer ────────────────────────────────────────
const ICON_MAP = {
  'wifi':            '📶',
  'air-conditioning':'❄️',
  'parking':         '🅿️',
  'bbq':             '🔥',
  'kitchen':         '🍳',
  'beach':           '🏖️',
};

function renderAmenities(items) {
  const grid = document.getElementById('amenitiesGrid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="amenity-card reveal">
      <div class="amenity-card__icon">${ICON_MAP[item.icon] || '✦'}</div>
      <h3 class="amenity-card__title">${item.title}</h3>
      <p  class="amenity-card__desc">${item.desc}</p>
    </div>
  `).join('');
  // re-observe new cards
  document.querySelectorAll('.amenity-card').forEach(el => observer.observe(el));
}

// ── Navigation scroll behaviour ───────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger menu
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
let observer;

function initScrollReveal() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Contact form → WhatsApp ───────────────────────────────────
const WHATSAPP_NUMBER = '385998115120'; // +385 99 811 5120

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#formName').value.trim();
    const email   = form.querySelector('#formEmail').value.trim();
    const message = form.querySelector('#formMessage').value.trim();

    const text = `Hello! My name is ${name} (${email}).\n\n${message}`;
    const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    form.reset();
  });
}

// ── Language switcher ─────────────────────────────────────────
function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });
}

// ── Footer year ───────────────────────────────────────────────
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Reveal helper for static elements ────────────────────────
function addRevealClasses() {
  const selectors = [
    '.about__text',
    '.about__image',
    '.gallery__item',
    '.location__text',
    '.location__map',
    '.contact__text',
    '.contact__form',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
}

// ── Init ──────────────────────────────────────────────────────
history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', async () => {
  window.scrollTo(0, 0);
  setFooterYear();
  addRevealClasses();
  initNav();
  initScrollReveal();
  initLangSwitcher();
  initContactForm();
  switchLang('en');
});
