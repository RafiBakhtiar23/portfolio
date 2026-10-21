// Tombol CV hanya muncul kalau file PDF-nya ada di public/cv/.
// Ganti file PDF = CV di situs ikut berganti. Jalankan ulang `npm run dev` setelah menambah file pertama kali.
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../data/site.js';

const file = path.join(process.cwd(), 'public', 'cv', site.cvFile);
let exists = false;
try {
  exists = fs.statSync(file).isFile();
} catch (e) {
  exists = false;
}

export const cv = { exists, url: `/cv/${site.cvFile}` };
