// Cek apakah sebuah file ada di folder public/ saat build.
// Dipakai supaya foto, gambar sertifikat, dan screenshot hanya tampil kalau file-nya memang ada.
import fs from 'node:fs';
import path from 'node:path';

export function hasPublic(rel) {
  if (!rel) return false;
  try {
    return fs.statSync(path.join(process.cwd(), 'public', rel.replace(/^\//, ''))).isFile();
  } catch (e) {
    return false;
  }
}

export const firstPublic = (list) => list.find(hasPublic) ?? null;

// Reads a JSON file from public/ at build time. Returns null when the file is missing or is not valid JSON.
export function readPublicJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', rel.replace(/^\//, '')), 'utf8'));
  } catch (e) {
    return null;
  }
}

// Reads the pixel size of a .webp file from its header (no dependencies). Returns null if it cannot be read.
export function webpSize(rel) {
  try {
    const fd = fs.openSync(path.join(process.cwd(), 'public', rel.replace(/^\//, '')), 'r');
    const b = Buffer.alloc(32);
    fs.readSync(fd, b, 0, 32, 0);
    fs.closeSync(fd);
    if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
    const kind = b.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (kind === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (kind === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    return null;
  } catch (e) {
    return null;
  }
}
