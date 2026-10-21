// Bahasa: English di "/" dan Indonesia di "/id/".
export const langs = {
  en: { code: 'en', label: 'EN', locale: 'en-US' },
  id: { code: 'id', label: 'ID', locale: 'id-ID' },
};

export const langPrefix = (lang) => (lang === 'id' ? '/id' : '');
export const langHome = (lang) => (lang === 'id' ? '/id/' : '/');

// "/id/projects/x/" -> "/projects/x/"
export function stripLang(pathname) {
  if (pathname === '/id' || pathname === '/id/') return '/';
  if (pathname.startsWith('/id/')) return pathname.slice(3);
  return pathname;
}

// "2026-05" -> "May 2026" (EN) / "Mei 2026" (ID)
export function fmtMonth(ym, lang) {
  const [y, m] = ym.split('-').map(Number);
  return new Intl.DateTimeFormat(langs[lang].locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
}
