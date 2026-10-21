import { site } from '../data/site.js';

export function GET(context) {
  const origin = (context.site ?? new URL(site.domain)).origin;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
