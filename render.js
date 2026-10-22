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

const LAZADA_HEART = 'data:image/png;base64,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';

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
    // The official "f" (the cut-out in Meta's Facebook logo, from Simple Icons), run down to the
    // bottom edge as in the app icon (see .brand-facebook in style.css)
    mark: () => `<path transform="scale(2)" fill="#fff" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246V30H9.101z"/>`
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
    // The heart with "Laz", cut out of the current Lazada app icon (160x130 PNG)
    mark: () => `<image href="${LAZADA_HEART}" x="5" y="8.6" width="38" height="30.9"/>`
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
