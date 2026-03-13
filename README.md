# Apartments Dora – Povljana, Croatia

Official website for **Apartments Dora**, a private house with two spacious apartments located in Povljana on the island of Pag, Croatia.

## About

Dora is a private house with two apartments (90m² each, up to 6 guests per apartment) situated in the quiet village of Povljana — steps from the crystal-clear Adriatic sea.

The website serves as a presentation page for guests, featuring:
- Apartment overview and key details
- Photo gallery
- List of amenities
- Location with embedded Google Maps
- Contact form

## Structure

```
ApartmanDora/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # All styles (Mediterranean minimal design)
├── js/
│   └── main.js         # JavaScript (i18n, navigation, animations)
├── locales/
│   ├── en.json         # English translations (reference, not used at runtime)
│   └── hr.json         # Croatian translations (reference, not used at runtime)
└── assets/             # Photos
    ├── povljana1.jpg
    ├── povljana2.jpg
    ├── apartman-kuhinja.jpg
    ├── apartman-rostilj.jpg
    └── apartman-ocijena.jpg
```

> **Note:** Translations are inlined directly in `main.js` (the `LOCALES` object) so the site works when opened as a local file (`file://`) without a server. The `locales/` JSON files are kept as a readable reference.

## Languages

The site supports **English** (default) and **Croatian**, switchable via the EN | HR toggle in the navigation bar.

## Tech Stack

- Plain HTML5, CSS3, JavaScript (no frameworks, no build tools)
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Fully responsive (mobile-first)
- Works without a local server — just open `index.html` in a browser

## Running Locally

No installation needed. Open `index.html` directly in your browser, or use the **Live Server** extension in VS Code for auto-reload on save.

## Deployment

The site is deployed via **GitHub Pages** at:
`https://[username].github.io/apartman-dora`

To update the live site, push changes to the `main` branch.

## Location

**Paška 18, 23250 Povljana, Croatia**
[View on Google Maps](https://www.google.com/maps/place/Paška+18,+23250,+Povljana/@44.348127,15.1113992,17z)

## Contact

For booking inquiries: **+385 99 811 5120**
