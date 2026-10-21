// Content checker. Run: npm run check
// ERROR = real bug (exit code 1). WARN = worth a look (does not fail).
import { site, ui, copy, skillGroups, education, certifications, projects } from '../src/data/site.js';

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ---- 1. EN and ID must have the same shape -------------------------------------------------
function shape(v) {
  if (Array.isArray(v)) return `[${v.length}]` + (v.length ? shape(v[0]) : '');
  if (typeof v === 'function') return 'fn';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map((k) => `${k}:${shape(v[k])}`).join(',') + '}';
  return typeof v;
}
function compare(a, b, where) {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) return err(`${where}: different type in EN and ID`);
  if (Array.isArray(a)) {
    if (a.length !== b.length) err(`${where}: EN has ${a.length} items, ID has ${b.length}`);
    a.forEach((x, i) => b[i] !== undefined && compare(x, b[i], `${where}[${i}]`));
  } else if (a && typeof a === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a)) err(`${where}.${k}: missing in EN`);
      else if (!(k in b)) err(`${where}.${k}: missing in ID`);
      else compare(a[k], b[k], `${where}.${k}`);
    }
  }
}
// langHint exists only in ID: it offers Indonesian to visitors whose browser prefers it.
const { langHint, ...uiId } = ui.id;
compare(ui.en, uiId, 'ui');
compare(copy.en, copy.id, 'copy');
for (const p of projects) compare(p.t.en, p.t.id, `projects.${p.slug}.t`);

// ---- 2. Collect every string with its language ---------------------------------------------
const texts = []; // { lang, where, s }
function walk(v, lang, where) {
  if (typeof v === 'string') texts.push({ lang, where, s: v });
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, lang, `${where}[${i}]`));
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (typeof x === 'function') continue;
      walk(x, lang, `${where}.${k}`);
    }
  }
}
walk(ui.en, 'en', 'ui.en'); walk(ui.id, 'id', 'ui.id');
walk(copy.en, 'en', 'copy.en'); walk(copy.id, 'id', 'copy.id');
for (const p of projects) {
  walk(p.t.en, 'en', `projects.${p.slug}.en`); walk(p.t.id, 'id', `projects.${p.slug}.id`);
  for (const [i, d] of (p.decisions ?? []).entries()) { walk(d.title.en, 'en', `${p.slug}.decisions[${i}]`); walk(d.title.id, 'id', `${p.slug}.decisions[${i}]`); walk(d.text.en, 'en', `${p.slug}.decisions[${i}].text`); walk(d.text.id, 'id', `${p.slug}.decisions[${i}].text`); }
  for (const [i, e] of (p.endpoints ?? []).entries()) { walk(e.note?.en, 'en', `${p.slug}.endpoints[${i}]`); walk(e.note?.id, 'id', `${p.slug}.endpoints[${i}]`); }
}
for (const g of skillGroups) { walk(g.note.en, 'en', `skills.${g.name.en}`); walk(g.note.id, 'id', `skills.${g.name.en}`); }

// ---- 3. Style rules -----------------------------------------------------------------------
const informalId = /\b(aku|gue|gua|lu|loe|kamu|banget|nih|dong|sih|kok|yg|gak|nggak|udah)\b/i;
const buzz = /\b(passionate|leverage[sd]?|cutting-edge|seamless(ly)?|robust|synergy|results-driven|dynamic|delve|tapestry|world-class|innovative|game-changer|rockstar|ninja|guru|next-level)\b/i;
const buzzId = /\b(bersemangat tinggi|inovatif|handal dan tangguh|berorientasi hasil|kelas dunia)\b/i;
for (const { lang, where, s } of texts) {
  if (!s.trim()) { err(`${where}: empty text`); continue; }
  if (s !== s.trim()) warn(`${where}: leading or trailing space`);
  if (/ {2,}/.test(s.replace(/&nbsp;/g, ' '))) warn(`${where}: double space`);
  if (/\s[,;:!?]|\s\.(?!\w)/.test(s)) warn(`${where}: space before punctuation`);
  if (/[—–]/.test(s)) warn(`${where}: dash character (— or –); prefer a comma, colon, or period`);
  if (/\.\.\./.test(s)) warn(`${where}: three dots; use … or rewrite`);
  if (lang === 'id' && informalId.test(s)) err(`${where}: informal Indonesian word "${s.match(informalId)[0]}" (use "saya")`);
  if (lang === 'en' && buzz.test(s)) warn(`${where}: buzzword "${s.match(buzz)[0]}"`);
  if (lang === 'id' && buzzId.test(s)) warn(`${where}: buzzword "${s.match(buzzId)[0]}"`);
  if (/\b(TODO|FIXME|lorem|ipsum|xxx)\b/i.test(s)) err(`${where}: placeholder text`);
  if (/\b(I'm|I've|don't|can't|won't|isn't)\b/.test(s) && lang === 'en') warn(`${where}: contraction in formal copy`);
}
// Same text in EN and ID usually means a missing translation (names and technology lists are fine).
for (const p of projects) {
  const en = p.t.en, id = p.t.id;
  for (const k of ['summary', 'detail', 'lead', 'role', 'metaType']) if (en[k] && en[k].length > 30 && en[k] === id[k]) warn(`projects.${p.slug}.${k}: identical in EN and ID`);
}

// ---- 4. Data integrity ------------------------------------------------------------------------
const slugs = projects.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) err('projects: duplicate slug');
for (const g of skillGroups) for (const it of g.items) {
  if (it.level === 'project' && !(it.usedIn?.length)) err(`skill ${it.name}: level "project" but no usedIn (a project must back it)`);
  for (const s of it.usedIn ?? []) if (!slugs.includes(s)) err(`skill ${it.name}: usedIn "${s}" is not a project`);
  if (!['project', 'working', 'basic'].includes(it.level)) err(`skill ${it.name}: unknown level "${it.level}"`);
}
for (const p of projects) {
  for (const u of [p.github, p.demo]) if (u && !/^https:\/\/[^\s]+$/.test(u)) err(`projects.${p.slug}: link must start with https:// (${u})`);
  for (const [i, sh] of (p.screenshots ?? []).entries()) if (!sh.alt?.en || !sh.alt?.id) err(`projects.${p.slug}.screenshots[${i}]: alt text needed in EN and ID`);
  if (p.erd && (!p.erd.alt?.en || !p.erd.alt?.id)) err(`projects.${p.slug}.erd: alt text needed in EN and ID`);
  for (const [i, e] of (p.endpoints ?? []).entries()) {
    if (!['public', 'auth', 'admin'].includes(e.access)) err(`projects.${p.slug}.endpoints[${i}]: access must be public, auth, or admin`);
    if (!/^[A-Z]+$/.test(e.method) || !e.path.startsWith('/')) err(`projects.${p.slug}.endpoints[${i}]: bad method or path`);
  }
  if (!p.github) warn(`projects.${p.slug}: github is empty (add it when the repository is public)`);
}
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email)) err('site.email is not a valid email');
for (const c of certifications) if (!/^\d{4}-\d{2}$/.test(c.date)) err(`certificate "${c.title}": date must be YYYY-MM`);
if (!/^\d{4}-\d{2}$/.test(education.from) || !/^\d{4}-\d{2}$/.test(education.to)) err('education: from and to must be YYYY-MM');

// ---- Report ------------------------------------------------------------------------------------
for (const w of warns) console.log('WARN  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\n${errors.length} error(s), ${warns.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
