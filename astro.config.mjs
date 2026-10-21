import { defineConfig } from 'astro/config';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { EARLY_SCRIPT } from './src/lib/early-script.js';

// After the build, put the hash of the one inline <head> script into dist/_headers,
// so the Content-Security-Policy can allow that script and nothing else inline.
const cspHash = {
  name: 'csp-hash',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const file = fileURLToPath(new URL('_headers', dir));
      if (!fs.existsSync(file)) return;
      const hash = createHash('sha256').update(EARLY_SCRIPT).digest('base64');
      fs.writeFileSync(
        file,
        fs.readFileSync(file, 'utf8').replaceAll('{{EARLY_HASH}}', `'sha256-${hash}'`)
      );
    },
  },
};

export default defineConfig({
  site: 'https://rafibakhtiar.pages.dev',
  compressHTML: true,
  // Pages are fetched in the background when a link is hovered, so case studies open instantly.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  // Never inline scripts into the HTML: the Content-Security-Policy only allows files from this site.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [cspHash],
});
