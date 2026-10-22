// Builds the Link Page (MANA STORE design 2c, "Slant band") from a Config File object.
// Used by index.html (live page) and editor.html (preview).

const ICONS = {
  bag: 'M6 7h12l1 13H5L6 7z M9 7a3 3 0 0 1 6 0',
  cart: 'M3 4h2l2.4 11h10.2L20 8H6.5 M9 20h.01 M17 20h.01',
  tiktok: 'M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5 M14 4c.5 2.5 2.5 4 5 4',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z M9 14h6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z',
  line: 'M12 4c-4.97 0-9 3.13-9 7 0 3.4 3.1 6.2 7.2 6.9L10 21l3.2-3.1C17.6 17.5 21 14.6 21 11c0-3.87-4.03-7-9-7z',
  facebook: 'M15 4h-2a4 4 0 0 0-4 4v3H7v3h2v7h3v-7h2.5l.5-3h-3V8.5a1 1 0 0 1 1-1h2z',
  instagram: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M17 6.5v.01',
  chevron: 'M9 6l6 6-6 6',
  close: 'M6 6l12 12 M18 6L6 18'
};
const SOCIALS = [['line', 'LINE'], ['facebook', 'Facebook'], ['tiktok', 'TikTok'], ['instagram', 'Instagram']];

// "brand" icon style: tiles that look like each platform's app icon (see APP_ICONS).
// `d` holds marks from Simple Icons (CC0); `solid` colours the chevron.
const BRANDS = {
  shopee: { test: /shopee|shp\.ee/i, bg: '#EE4D2D', solid: '#EE4D2D',
    d: 'M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z' },
  lazada: { test: /lazada/i, solid: '#F2386B' },
  tiktok: { test: /tiktok/i, bg: '#000000', solid: '#000000',
    d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  line: { test: /line\.me|lin\.ee/i, bg: '#06C755', solid: '#06C755',
    d: 'M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' },
  facebook: { test: /facebook|fb\.(com|me)/i, bg: '#0866FF', solid: '#0866FF',
    d: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z' },
  instagram: { test: /instagram|instagr\.am/i, bg: 'linear-gradient(45deg, #FEDA75, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5)', solid: '#D62976',
    d: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077' }
};

// Which brand a link belongs to, from its URL (or its icon name as a fallback).
function brandFor(url, iconName) {
  for (const [k, b] of Object.entries(BRANDS)) if (b.test.test(url || '')) return k;
  return BRANDS[iconName] ? iconName : null;
}

// Brand look, based on each platform's app icon: `bg` fills the chip (any shape),
// `mark` is the white logo drawn on a 48x48 grid with no background.
const BRAND_TILES = {
  shopee: {
    bg: '#EE4D2D',
    mark: () => `<path transform="translate(9.6 9) scale(1.2)" fill="#fff" d="${BRANDS.shopee.d}"/>`
  },
  line: {
    bg: '#06C755',
    mark: () => `<path transform="translate(8 8.5) scale(1.333)" fill="#fff" d="${BRANDS.line.d}"/>`
  },
  tiktok: {
    bg: '#000000',
    mark: () => {
      const t = 'translate(11 10) scale(1.1)', d = BRANDS.tiktok.d;
      return `<path transform="translate(-1.1 -1.1) ${t}" fill="#25F4EE" d="${d}"/>` +
        `<path transform="translate(1.1 1.1) ${t}" fill="#FE2C55" d="${d}"/>` +
        `<path transform="${t}" fill="#fff" d="${d}"/>`;
    }
  },
  facebook: {
    bg: 'linear-gradient(180deg, #18ACFE, #0163E0)',
    // The "f" runs to the bottom edge, as in the app icon (see .brand-facebook in style.css)
    mark: () => `<path fill="#fff" d="M27.6 48V29.3h6.2l.9-7.2h-7.1v-4.6c0-2.1.6-3.5 3.6-3.5h3.8V7.6c-.7-.1-2.9-.3-5.5-.3-5.4 0-9.2 3.3-9.2 9.4v5.4h-6.2v7.2h6.2V48z"/>`
  },
  instagram: {
    bg: 'radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)',
    mark: () => `<g fill="none" stroke="#fff" stroke-width="3.4"><rect x="11" y="11" width="26" height="26" rx="8"/><circle cx="24" cy="24" r="6.2"/></g>` +
      `<circle cx="31.7" cy="16.3" r="2.1" fill="#fff"/>`
  },
  lazada: {
    bg: 'radial-gradient(circle at 0% 100%, #3F6BFF 0, rgba(63,107,255,0) 32%), ' +
      'radial-gradient(circle at 100% 0%, #6C5CF2 0, rgba(108,92,242,0) 30%), ' +
      'linear-gradient(135deg, #FF1466 0%, #EC1F79 45%, #B4309F 100%)',
    // White folded heart with "Laz", from the current Lazada app icon
    mark: () => `<path fill="#fff" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" d="M6.8 10.2 24 15.4l17.2-5.2v18.4L24 38.6 6.8 28.6z"/>` +
      `<path fill="#F7E1EC" opacity=".55" d="M6.8 10.2 24 15.4v4.2L6.8 14.6z M41.2 10.2 24 15.4v4.2l17.2-5z"/>` +
      `<text x="24" y="30.2" text-anchor="middle" font-family="Prompt, Kanit, sans-serif" font-weight="600" font-size="12.5" fill="#EC1F79">Laz</text>`
  }
};

function brandIcon(key) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = BRAND_TILES[key].mark();
  return svg;
}

// Brand colour and logo on a chip or social tile, keeping the design's shape.
function applyBrand(tile, key) {
  tile.classList.add('is-brand', 'brand-' + key);
  tile.style.background = BRAND_TILES[key].bg;
  tile.appendChild(brandIcon(key));
}
const CONTACTS_URL = '#contacts';
const SAFE_URL = /^(https?:|mailto:|tel:)/i;

// White text when it reaches 4.5:1 on the colour, else ink #1A1A1A.
function ink(hex) {
  const n = parseInt(String(hex).replace('#', ''), 16);
  const L = [n >> 16, (n >> 8) & 255, n & 255].map(v => {
    v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
  });
  const l = .2126 * L[0] + .7152 * L[1] + .0722 * L[2];
  return 1.05 / (l + .05) >= 4.5 ? '#FFFFFF' : '#1A1A1A';
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function icon(name, size, attrs = {}) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', attrs.stroke || 1.9);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', ICONS[name] || ICONS.bag);
  svg.appendChild(path);
  return svg;
}

function external(a, url) {
  a.href = url;
  if (/^https?:/i.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
}

// A link when the URL is set; otherwise the same button without a link (no link added yet).
function linkOrPlain(cls, url) {
  if (SAFE_URL.test(url || '')) {
    const a = el('a', cls);
    external(a, url);
    return a;
  }
  return el('span', cls + ' no-link');
}

// Logo position (x, y in % of the circle) and zoom (in %) inside the circle.
function logoTransform(lg) {
  return `translate(${lg.x ?? 0}%, ${lg.y ?? 0}%) scale(${(lg.zoom ?? 100) / 100})`;
}

function telHref(phone) { return 'tel:' + String(phone).replace(/[^\d+]/g, ''); }

function renderPage(config, root) {
  const c = config;
  const primary = c.primary || '#FF7F17';
  const secondary = c.secondary || '#2B6684';
  const font = c.font || 'Prompt';
  const lg = c.logo || {};
  const useBrand = c.iconStyle === 'brand';

  const vars = {
    '--primary': primary,
    '--primary-ink': ink(primary),
    '--chip-text': ink(primary) === '#FFFFFF' ? primary : '#FFFFFF',
    '--secondary': secondary,
    '--secondary-ink': ink(secondary),
    '--accent': c.accent || '#D7602F',
    '--bg': c.background || '#FFF8F3',
    '--font': `'${font}', 'Kanit', sans-serif`,
    '--logo-size': (lg.size ?? 104) + 'px',
    '--logo-border': lg.border || primary,
    '--logo-border-w': (lg.borderWidth ?? 3) + 'px'
  };
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);

  root.replaceChildren();
  const page = el('div', 'lp');

  // 1. Header band
  const band = el('div', 'lp-band');
  band.append(el('span', 'lp-stripe lp-stripe-a'), el('span', 'lp-stripe lp-stripe-b'));
  page.appendChild(band);

  const body = el('div', 'lp-body');

  // 3. Profile header
  const header = el('header', 'lp-header');
  const logo = el('div', 'lp-logo');
  if (c.logoUrl) {
    const img = el('img');
    img.src = c.logoUrl;
    img.alt = c.name || 'Logo';
    img.draggable = false;
    img.style.transform = logoTransform(lg);
    logo.appendChild(img);
  } else {
    logo.appendChild(el('span', 'lp-logo-fallback', (c.name || 'M').trim().charAt(0)));
  }
  header.appendChild(logo);

  const text = el('div', 'lp-text');
  text.appendChild(el('h1', 'lp-name', c.name || ''));
  if (c.tagline) text.appendChild(el('p', 'lp-tagline', c.tagline));
  if (c.taglineEn) text.appendChild(el('p', 'lp-tagline-en', c.taglineEn));
  header.appendChild(text);

  const socials = SOCIALS.filter(([k]) => c.socialsVisible?.[k] !== false);
  if (socials.length) {
    const nav = el('nav', 'lp-socials');
    nav.setAttribute('aria-label', 'Social');
    for (const [k, name] of socials) {
      const a = linkOrPlain('lp-social', c.socials?.[k]);
      a.setAttribute('aria-label', name);
      if (useBrand) {
        applyBrand(a, k);
      } else {
        a.appendChild(icon(k, 22));
      }
      nav.appendChild(a);
    }
    header.appendChild(nav);
  }
  body.appendChild(header);

  // 4. Promo card
  const promo = c.promo || {};
  if (promo.enabled) {
    const card = el('section', 'lp-promo');
    const left = el('div', 'lp-promo-text');
    if (promo.tag) left.appendChild(el('span', 'lp-promo-tag', promo.tag));
    if (promo.title) left.appendChild(el('p', 'lp-promo-title', promo.title));
    if (promo.text) left.appendChild(el('p', 'lp-promo-body', promo.text));
    if (promo.cta) {
      const cta = linkOrPlain('lp-promo-cta', promo.url);
      cta.textContent = promo.cta + ' →';
      left.appendChild(cta);
    }
    const right = el('div', 'lp-promo-img');
    if (promo.imageUrl) {
      const img = el('img');
      img.src = promo.imageUrl;
      img.alt = '';
      right.appendChild(img);
    }
    card.append(left, right);
    body.appendChild(card);
  }

  // 5. Link buttons
  const list = el('div', 'lp-links');
  let sheet = null;
  for (const l of c.links || []) {
    if (l.visible === false) continue;
    const cls = 'lp-link' + (l.kind === 'secondary' ? ' is-secondary' : '');
    let a;
    if (l.url === CONTACTS_URL) {
      a = el('a', cls);
      a.href = CONTACTS_URL;
      a.setAttribute('aria-haspopup', 'dialog');
      a.addEventListener('click', e => { e.preventDefault(); sheet?.open(a); });
    } else {
      a = linkOrPlain(cls, l.url);
    }
    const chip = el('span', 'lp-chip');
    const brand = useBrand && l.url !== CONTACTS_URL && brandFor(l.url, l.icon);
    if (brand) applyBrand(chip, brand);
    else chip.appendChild(icon(l.icon, 22));
    const labels = el('span', 'lp-labels');
    labels.appendChild(el('span', 'lp-label', l.label || ''));
    if (l.sub) labels.appendChild(el('span', 'lp-sub', l.sub));
    const chev = icon('chevron', 20, { stroke: 2.2 });
    chev.classList.add('lp-chevron');
    if (brand) {
      chev.style.color = BRANDS[brand].solid;
    }
    a.append(chip, labels, chev);
    list.appendChild(a);
  }
  body.appendChild(list);

  // 6. Footer
  const footer = el('footer', 'lp-footer');
  footer.append(el('span', 'lp-dash lp-dash-a'), el('span', null, '© ' + (c.name || '')), el('span', 'lp-dash lp-dash-b'));
  body.appendChild(footer);

  page.appendChild(body);
  root.appendChild(page);

  sheet = buildContactSheet(c.contacts || [], root);
  return c.name;
}

// Contact pop-up: a bottom sheet with one call button per phone number.
function buildContactSheet(contacts, root) {
  const overlay = el('div', 'lp-overlay');
  overlay.hidden = true;
  const panel = el('div', 'lp-sheet');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'lp-sheet-title');

  const head = el('div', 'lp-sheet-head');
  const title = el('h2', 'lp-sheet-title', 'ติดต่อเรา / โทร');
  title.id = 'lp-sheet-title';
  const close = el('button', 'lp-sheet-close');
  close.type = 'button';
  close.setAttribute('aria-label', 'ปิด');
  close.appendChild(icon('close', 20, { stroke: 2.2 }));
  head.append(title, close);
  panel.appendChild(head);
  panel.appendChild(el('p', 'lp-sheet-hint', 'แตะที่เบอร์เพื่อโทร'));

  const list = el('div', 'lp-calls');
  for (const ct of contacts) {
    if (!ct.phone) continue;
    const a = el('a', 'lp-call');
    a.href = telHref(ct.phone);
    const ic = el('span', 'lp-call-icon');
    ic.appendChild(icon('phone', 20, { stroke: 2 }));
    a.append(ic, el('span', 'lp-call-num', ct.phone), el('span', 'lp-call-name', ct.name || ''));
    list.appendChild(a);
  }
  panel.appendChild(list);
  overlay.appendChild(panel);
  root.appendChild(overlay);

  let opener = null;
  const hide = () => {
    overlay.hidden = true;
    document.removeEventListener('keydown', onKey);
    opener?.focus();
  };
  const onKey = e => { if (e.key === 'Escape') hide(); };
  close.addEventListener('click', hide);
  overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });

  return {
    open(from) {
      opener = from;
      overlay.hidden = false;
      document.addEventListener('keydown', onKey);
      (list.querySelector('a') || close).focus();
    }
  };
}
