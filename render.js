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

function telHref(phone) { return 'tel:' + String(phone).replace(/[^\d+]/g, ''); }

function renderPage(config, root) {
  const c = config;
  const primary = c.primary || '#FF7F17';
  const secondary = c.secondary || '#2B6684';
  const font = c.font || 'Prompt';

  const vars = {
    '--primary': primary,
    '--primary-ink': ink(primary),
    '--chip-text': ink(primary) === '#FFFFFF' ? primary : '#FFFFFF',
    '--secondary': secondary,
    '--secondary-ink': ink(secondary),
    '--accent': c.accent || '#D7602F',
    '--bg': c.background || '#FFF8F3',
    '--font': `'${font}', 'Kanit', sans-serif`
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

  const socials = SOCIALS.filter(([k]) => SAFE_URL.test(c.socials?.[k] || ''));
  if (socials.length) {
    const nav = el('nav', 'lp-socials');
    nav.setAttribute('aria-label', 'Social');
    for (const [k, name] of socials) {
      const a = el('a', 'lp-social');
      external(a, c.socials[k]);
      a.setAttribute('aria-label', name);
      a.appendChild(icon(k, 22));
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
    if (promo.cta && SAFE_URL.test(promo.url || '')) {
      const cta = el('a', 'lp-promo-cta', promo.cta + ' →');
      external(cta, promo.url);
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
    const isContacts = l.url === CONTACTS_URL;
    if (l.visible === false || !(isContacts || SAFE_URL.test(l.url || ''))) continue;

    const a = el('a', 'lp-link' + (l.kind === 'secondary' ? ' is-secondary' : ''));
    if (isContacts) {
      a.href = CONTACTS_URL;
      a.setAttribute('aria-haspopup', 'dialog');
      a.addEventListener('click', e => { e.preventDefault(); sheet?.open(a); });
    } else {
      external(a, l.url);
    }
    const chip = el('span', 'lp-chip');
    chip.appendChild(icon(l.icon, 22));
    const labels = el('span', 'lp-labels');
    labels.appendChild(el('span', 'lp-label', l.label || ''));
    if (l.sub) labels.appendChild(el('span', 'lp-sub', l.sub));
    const chev = icon('chevron', 20, { stroke: 2.2 });
    chev.classList.add('lp-chevron');
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
