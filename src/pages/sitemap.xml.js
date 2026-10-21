import { site, projects } from '../data/site.js';
import { cv } from '../lib/cv.js';

// Every page is listed in both languages, each with hreflang alternates so search engines pair EN and ID.
export function GET(context) {
  const origin = (context.site ?? new URL(site.domain)).origin;
  const lastmod = new Date().toISOString().slice(0, 10);
  const paths = ['/', ...projects.map((p) => `/projects/${p.slug}/`), ...(cv.exists ? ['/cv/'] : [])];
  const entry = (loc, en, id) =>
    `  <url>\n    <loc>${origin}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${origin}${en}" />\n` +
    `    <xhtml:link rel="alternate" hreflang="id" href="${origin}${id}" />\n` +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${en}" />\n  </url>`;
  const urls = paths.flatMap((p) => [entry(p, p, '/id' + p), entry('/id' + p, p, '/id' + p)]).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
