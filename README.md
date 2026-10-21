# Rafi Bakhtiar — Portfolio

Portfolio berbasis Astro, dua bahasa: English di `/` dan Indonesia di `/id/`.
Semua isi (teks, skill, sertifikat, proyek, kontak) ada di **satu file**: `src/data/site.js`.

## Menjalankan

Setelah update ke v6, jalankan `npm install` lagi (font sekarang dipasang dari paket `@fontsource`, bukan dari Google).

```
npm install
npm run dev      # http://localhost:4321  (Indonesia: http://localhost:4321/id/)
npm run build    # cek build produksi
```

## Cara upload / mengganti file (tanpa mengubah kode)

Semua file ditaruh di folder `public/`. Setelah menambah file **pertama kali**, restart `npm run dev`.

| Apa | Taruh di | Catatan |
|---|---|---|
| **CV** | `public/cv/Rafi-Bakhtiar-CV.pdf` | Nama file harus persis ini. Tombol CV muncul otomatis di menu atas, hero, ringkasan, dan kontak. Untuk memperbarui CV, ganti file dengan nama yang sama. |
| **Foto About** | `public/about-bg.webp` | Background full-width bagian About (foto tanpa teks). Rasio 1665×856, sisi kiri dibuat gelap karena teks ada di situ. |
| **Gambar sertifikat** | `public/certs/<nama>.webp` | Nama file sudah ditentukan di `site.js` (lihat daftar di README bawah). Ganti nama file gambarmu persis seperti itu. |
| **Screenshot / ERD proyek** | `public/projects/nama-file.webp` | Lalu isi `screenshots` / `erd` di entri proyek pada `site.js`. |
| **Gambar preview link** | `public/og.png` | Ukuran 1200x630. |

## Cara mengubah isi

| Mau ubah | Edit |
|---|---|
| Teks hero, ringkasan, about, kontak | `src/data/site.js`, blok `copy` dan `ui` (ada versi `en` dan `id`) |
| Skill dan levelnya | `skillGroups`. `level`: `project`, `working`, atau `basic` |
| Sertifikat | `certifications`. Isi `url` untuk link verifikasi |
| Proyek | `projects` (teks tiap bahasa ada di `t.en` dan `t.id`) |
| Link GitHub / demo proyek | isi `github` dan `demo` di entri proyek |
| Tabel endpoint API, keputusan desain | isi `endpoints` dan `decisions` di entri proyek (kosong = bagian tidak tampil) |
| WhatsApp (opsional) | isi `whatsapp` di `site` (format `6281234567890`) |
| Tombol "Lihat semua sertifikat" | isi `certsLink` di `site` (link LinkedIn / Google Drive). Kosong = tombol tidak tampil |
| Google Search Console (opsional) | isi `googleVerification` di `site` dengan kode meta dari Search Console |
| Analytics (opsional) | isi `analyticsToken` di `site` (Cloudflare Web Analytics) |

Kalau mengubah satu kalimat, ubah juga versi bahasa satunya.

## Demo proyek: jangan copy source code ke repo ini

Deploy tiap proyek sendiri (frontend di hosting statis, backend Go/Laravel di layanan hosting terpisah), lalu isi URL-nya di `demo`.
Opsi rapi: subdomain, misalnya `attenda.rafibakhtiar.site`.
Sebelum repo proyek dibuat publik, pastikan tidak ada `.env`, password, atau API key yang ikut ter-commit.

## Struktur

- `src/layouts/Base.astro` — head, SEO, menu atas, pindah bahasa, footer
- `src/components/Home.astro` — halaman utama (dipakai EN dan ID)
- `src/components/CaseStudy.astro` — studi kasus (dipakai EN dan ID)
- `src/pages/` — `index.astro`, `id/index.astro`, `projects/[slug].astro`, `id/projects/[slug].astro`, `sitemap.xml.js`, `robots.txt.js`
- `src/styles/` — `global.css`, `motion.css`, `sections.css`, `perf.css`, `hero.css`, `topbar.css`, `skills.css`, `about.css`, `education.css`, `contact.css`
- `src/scripts/motion.js` — animasi

## Nama file gambar sertifikat (sudah terdaftar di site.js)

Taruh di `public/certs/`. Format boleh `.webp`; kalau memakai `.jpg`/`.png`, ubah akhiran `image:` di `site.js` agar cocok.

- `oracle-database-foundations.webp`
- `oracle-applied-database.webp`
- `oracle-oci-foundations.webp`
- `ec-council-sql-injection.webp`
- `microsoft-security-essentials.webp`
- `learningx-xpresso-acp.webp`
- `oracle-java-fundamentals.webp`

Gambar yang belum ada otomatis tidak ditampilkan.

## Performa (v6)

- Animasi hanya berjalan saat terlihat di layar dan berhenti saat tab tidak aktif.
- Efek khusus mouse (kursor, tilt, magnet, spotlight) ada di `src/scripts/desktop-fx.js`, dimuat hanya di desktop dan tidak dimuat di HP.
- Perangkat dengan Data Saver aktif atau spesifikasi sangat rendah otomatis masuk mode ringan (partikel dikurangi, grain dan glow dimatikan).
- `src/styles/perf.css` berisi semua penggantian efek berat. Hapus baris `import '../styles/perf.css'` di `Base.astro` kalau ingin kembali ke tampilan v5.
- `public/_headers` mengatur cache di Cloudflare Pages / Netlify.
- Foto dan gambar sertifikat: kompres ke WebP sebelum diupload (foto < 200 KB, sertifikat < 150 KB).

### Cek skor sendiri (Lighthouse)

1. `npm run build` lalu `npm run preview`.
2. Buka `http://localhost:4321` di Chrome, mode Incognito (supaya ekstensi tidak ikut mengukur).
3. DevTools (F12) > tab Lighthouse > Mobile > Analyze.
4. Target: Performance 90+, Accessibility 95+, CLS di bawah 0.05.

## Intro / hero (v7)

Background intro adalah canvas emas satu layar penuh di belakang teks: `src/scripts/ribbon.js` (menggambar ke `<div class="hero-bg">` di `Home.astro`). Gaya ada di `src/styles/hero.css`.

- Interaktif: garis emas melengkung menjauhi kursor atau jari, ada cahaya lembut di bawah pointer, debu emas berhamburan, dan scroll ikut menggeser gelombang.
- Ringan: maksimal sekitar 30 fps, berhenti saat di luar layar atau tab tidak aktif, garis lebih sedikit di HP. Reduced motion atau perangkat lemah otomatis memakai gambar statis `public/hero-lines.webp`.
- Mau garis lebih banyak atau sedikit: ubah `N` (jumlah garis) dan jumlah debu di `ribbon.js`. Mau lebih kuat efek kursornya: ubah angka `46` / `60` pada variabel `push`.
- Kembali ke intro lama: hapus baris `import '../styles/hero.css'` di `Base.astro` dan kembalikan markup hero dari v6.

## Navbar (v7)

Markup di `Base.astro`, gaya di `src/styles/topbar.css`.

- Desktop (di atas 1000px): link di tengah, garis emas tipis di bawah bar, link section yang sedang dilihat menyala emas.
- Tablet dan HP (1000px ke bawah): link berubah menjadi menu layar penuh yang dibuka tombol dua garis. Isinya semua link, tombol Download CV, dan email. Tutup dengan tombol X, tombol Esc, atau klik salah satu link.
- Teks tombol menu (`menu`, `menuClose`) ada di `ui` dalam `site.js`. Link menu mengikuti `sections` di `site.js` (`nav: true`).
- Kembali ke navbar lama: hapus `import '../styles/topbar.css'` di `Base.astro`.

## Skills (v7)

Data tetap di `skillGroups` dalam `site.js` (tiga level: `project`, `working`, `basic`). Gaya ada di `src/styles/skills.css`.

- Kartu teknologi memakai grid yang ukurannya seragam, jadi baris-barisnya sejajar. Di HP tampil 2 kolom.
- Level ditandai garis tepi dan penanda belah ketupat: terisi emas untuk `project`, kosong untuk `working`, garis putus-putus tanpa penanda untuk `basic`.
- Item yang punya `note` (misalnya Java dan Docker) mengambil satu baris penuh supaya catatannya tidak terhimpit.
- Legenda menampilkan jumlah per level, dihitung otomatis dari data.
- Kembali ke tampilan lama: hapus `import '../styles/skills.css'` di `Base.astro`.

## About (v7)

Teks tetap di `copy.*.about` dalam `site.js`. Gaya ada di `src/styles/about.css`.

- Kalimat pembuka tampil besar (serif), kata-katanya menyala saat dibaca. Kata yang belum menyala sekarang lebih terang dari sebelumnya, jadi tetap terbaca.
- Dua paragraf pendukung tampil dua kolom di bawahnya, dan menjadi satu kolom di HP.
- Bagian About memakai `public/about-bg.webp` sebagai background full-width, teks di sisi kiri. Di layar ≤1100px foto pindah ke atas dan teks di bawahnya.
- Kembali ke tampilan lama: hapus `import '../styles/about.css'` di `Base.astro`.

## Education & certificates (v7)

Data tetap di `education` dan `certifications` dalam `site.js`. Gaya ada di `src/styles/education.css`.

- Kartu sekolah memakai bingkai dobel tipis, cahaya emas lembut, dan nilai rata-rata berwarna emas.
- Sertifikat tampil sebagai kartu dua kolom. Kartu `kind: 'certification'` (sertifikasi resmi) memakai lebar penuh dan label emas penuh. Label `certificate` hanya bergaris, dan label `course` bergaris putus-putus, jadi kursus tidak terlihat setara dengan sertifikasi resmi.
- Gambar sertifikat (`image` di data) tampil lebih besar dan bisa diklik untuk dibuka penuh. Folder `public/certs/` saat ini kosong, jadi kartu tampil tanpa gambar sampai file-nya ditaruh di sana dengan nama sesuai `image`.
- Di HP (640px ke bawah) kartu menjadi satu kolom, dengan gambar kecil di samping teks.
- Kembali ke tampilan lama: hapus `import '../styles/education.css'` di `Base.astro` dan kembalikan class `cert-row` di `Home.astro`.

## Contact (v7)

Teks dan link kontak tetap dari `site.js` (`email`, `github`, `linkedin`, `whatsapp`, `cvFile`) dan `copy.*.contact`. Gaya ada di `src/styles/contact.css`.

- "200 OK" tetap ada, tapi tidak lagi menindih email dan tombol. Di desktop ia menempati setengah kanan yang kosong. Di HP dan tablet ia berada di dalam alur halaman dan menutup section sebelum footer. Efek cahaya emas yang mengikuti kursor tetap berjalan.
- Alamat email dan tombol Copy digabung dalam satu kotak, jadi terbaca sebagai satu kontrol. Tombol "Email me" ada di atasnya.
- Link (GitHub, LinkedIn, CV, dan WhatsApp bila `whatsapp` di `site.js` diisi) punya area sentuh yang lebih besar di HP.
- Footer diberi garis emas tipis di atasnya.
- Kembali ke tampilan lama: hapus `import '../styles/contact.css'` di `Base.astro`.

## Versi 8 (perbaikan kesan pertama, aksesibilitas, SEO)

- **Hero:** nama sekarang jadi judul utama (H1), jadi langsung terlihat siapa pemilik portofolio dan masuk ke judul halaman untuk mesin pencari. Intro dipendekkan; status "terbuka untuk kerja" sudah ada di badge, ringkasan, dan kontak.
- **Loader:** dari sekitar 2,8 detik menjadi sekitar 1 detik (masih bisa di-skip). Angkanya ada di `src/scripts/motion.js` (`dur`, `wait`) dan `motion.css` (`.loader`).
- **Skills:** Cursor, Antigravity, dan VS Code dihapus dari daftar (editor bukan skill). Tools yang tersisa adalah yang benar-benar relevan: Linux, Git, Postman, Bruno, Figma, Docker (dasar).
- **Aksesibilitas:**
  - Label judul (`h1`, `h2`) sebelumnya terbaca menyatu ("RafiBakhtiar.Software"); sekarang diberi spasi.
  - Paragraf About tidak lagi bergantung pada `aria-label` yang sering diabaikan screen reader.
  - Menu layar penuh (HP/tablet) menahan fokus keyboard di dalamnya.
  - Top bar tetap terlihat saat salah satu link-nya sedang difokus keyboard.
  - Teks kecil 8 sampai 9px dinaikkan ke 10 sampai 11px (`src/styles/polish.css`).
- **SEO:** `og:url`, `og:site_name`, ukuran dan alt gambar OG, `twitter:title` dan `twitter:description`, `apple-touch-icon`, sitemap dengan `hreflang` dan `lastmod`, data terstruktur Person (dengan `knowsAbout`) dan BreadcrumbList di halaman studi kasus.
- **Halaman 404** dua bahasa (`src/pages/404.astro`), tidak diindeks.
- Kembali ke tampilan v7 untuk gaya: hapus `import '../styles/polish.css'` di `Base.astro`.

Catatan: `public/apple-touch-icon.png` dibuat dari `favicon.svg`. Kalau kamu mengganti favicon, buat ulang (180 x 180 px).

## Versi 9 sampai 12 (keamanan, desktop dan mobile, aksesibilitas, performa)

Setelah menimpa file, jalankan `npm install` sekali. Itu membuat `package-lock.json`; **simpan (commit) file itu** supaya versi paket selalu sama di komputermu dan di hosting. Node 22 dianjurkan (`.nvmrc`).

### v9 Keamanan
- `public/_headers` sekarang berisi Content-Security-Policy (hanya file dari situsmu sendiri yang boleh jalan), HSTS, COOP, Permissions-Policy yang lebih ketat, dan aturan cache. Header ini hanya aktif di hosting (Cloudflare Pages / Netlify), bukan di `npm run dev`.
- Satu-satunya skrip inline (yang menyalakan animasi sebelum halaman tampil) ada di `src/lib/early-script.js`. Hash-nya dihitung otomatis saat `npm run build` oleh `astro.config.mjs` dan dimasukkan ke `dist/_headers`. Kamu tidak perlu mengurusnya.
- Nanti, saat demo proyek dipasang (v16), tambahkan domain demo ke `frame-src` di `public/_headers`.
- Kalau analytics Cloudflare diaktifkan, aturan CSP-nya sudah disiapkan.
- `public/.well-known/security.txt` berisi kontak untuk laporan celah. Isinya punya tanggal kedaluwarsa (`Expires`, 30 Jun 2027); perbarui setahun sekali.
- `public/humans.txt`, `.nvmrc`, dan `engines` di `package.json` ditambahkan.
- Semua link keluar memakai `rel="noopener noreferrer"`.
- Penyamaran email dari bot **sengaja tidak dipasang**: kalau skripnya gagal, email tidak bisa diklik, dan email adalah jalur kontak utamamu.

Yang tetap harus kamu lakukan sendiri (tidak bisa lewat kode): 2FA atau passkey di GitHub, Cloudflare, registrar domain, dan email; registrar lock; DNSSEC; pindai repo proyek dengan gitleaks sebelum dibuat publik.

### v10 Desktop dan mobile (`polish.css`)
- Latar `html` disamakan dengan situs supaya tidak ada kilatan putih saat layar ditarik melewati tepi.
- Di layar sentuh, tombol dan link kecil (bahasa, salin email, link kontak, link proyek) tingginya minimal 44 px.
- Kata panjang dipatahkan dengan rapi, bukan mendorong halaman ke samping.
- Monitor sangat lebar (1500 px ke atas): top bar dan footer sejajar dengan isi halaman.
- Banner bahasa tidak menyentuh tepi layar dan home bar.

### v11 Aksesibilitas
- Tombol **Kurangi efek / Reduce effects** di footer mematikan animasi, kursor khusus, dan canvas emas, lalu mengingat pilihan itu di perangkat. Disembunyikan otomatis untuk pengunjung yang sistemnya sudah meminta reduced motion.
- Pada mode reduced motion, seluruh kartu proyek tetap bisa diklik (sebelumnya hanya tombol panah).
- Kontras teks yang di bawah 4,5 : 1 dinaikkan (teks loader, label kartu proyek, kata About yang belum menyala).
- Mode kontras tinggi Windows (`forced-colors`) dan pengaturan "Increase contrast" ditangani.
- Gambar screenshot dan ERD tanpa `alt` dua bahasa membuat build gagal dengan pesan yang jelas.
- Rail section di sisi kanan disembunyikan dari keyboard dan screen reader karena menduplikasi menu; skip link sekarang benar-benar memindahkan fokus.

### v12 Performa
- `hero-lines.webp` dikompres ulang dari 135 KB menjadi 89 KB tanpa perbedaan yang terlihat.
- Efek noise (grain) dimatikan di layar sentuh karena hampir tidak terlihat tetapi memakai GPU.
- Skrip tidak pernah di-inline ke HTML (`assetsInlineLimit: 0`), jadi cache browser bekerja penuh.
- Catatan jujur: bobot font yang tidak dipakai **tidak** ikut diunduh (browser hanya mengunduh font yang tampil), jadi tidak ada penghematan dari mengurangi impor font. Ukuran sebenarnya perlu diukur lewat Lighthouse di komputermu.

### Cara mengecek di komputermu
1. `npm install`, lalu `npm run dev`, dan lihat EN serta `/id/`.
2. `npm run build && npm run preview`, lalu Lighthouse mobile di jendela Incognito.
3. Setelah deploy: cek header di securityheaders.com dan Mozilla Observatory.
4. Klik tombol "Kurangi efek" di footer: halaman reload tanpa animasi; klik lagi untuk menyalakannya.

## v13 Proyek Task API tanpa deploy

JobConnect diganti **Task API** (Go, Gin, GORM, SQLite, JWT). Isinya diturunkan dari kode `go-task-api` yang kamu kirim. Proyek backend tidak perlu hosting: pengunjung melihat **permintaan dan respons asli** serta (opsional) rekaman layar.

### 1. Rekam respons asli (±2 menit)
1. Di folder `go-task-api`: hapus `app.db`, lalu `export JWT_SECRET="rahasia-panjang-apa-saja"` dan `go run .`
2. Di folder portofolio, terminal lain: `python3 tools/capture_explorer.py`
3. Hasil: `public/projects/task-api-explorer.json` (15 langkah, token dipendekkan). Build ulang, bagian **API Explorer** muncul sendiri di halaman Task API. Jika file tidak ada, bagian itu tidak ditampilkan.
Jika ada langkah yang statusnya tidak sesuai harapan, skrip berhenti dan menjelaskan; hapus `app.db` lalu ulangi. Skrip hanya memakai Python standar dan akun palsu `rafi.demo@example.com`.

### 2. Rekaman layar (opsional)
Rekam 30 sampai 60 detik (Postman atau terminal), simpan sebagai MP4 H.264 di `public/projects/task-api-demo.mp4` (usahakan di bawah 8 MB: `ffmpeg -i in.mov -vf scale=1280:-2 -crf 28 -an task-api-demo.mp4`) dan satu poster `.webp`. Lalu di `src/data/site.js` ganti `video: null` dengan contoh yang ada di komentar. Video tidak diunduh sebelum diputar (`preload="none"`).

### 3. Yang perlu kamu isi atau pastikan
- `github` Task API masih kosong: isi setelah repo dibereskan.
- Teks, peran ("Backend developer"), dan bagian "Next improvements" ditulis dari kode; sesuaikan jika ada yang tidak benar.
- Saran untuk repo sebelum publik: tambahkan `go.sum`, wajibkan `JWT_SECRET` (hapus nilai default), jalankan Docker sebagai non-root, dan tambahkan beberapa tes. Pastikan kamu bisa menjelaskan setiap bagian kode saat wawancara.
- Jika nanti demo dipasang lewat iframe, tambahkan domainnya ke `frame-src` di `public/_headers`.

### v13b Proyek D'Rolls (Pancake Roll) dari kode asli
Isi studi kasus Pancake Roll ditulis ulang dari `ProjectWeb_PKK`: Laravel 11, Tailwind, Alpine.js, keranjang session, checkout WhatsApp, harga dari server, validasi 1-99, tanpa database. Teks lama yang menyebut MySQL dan "proyek tim" dihapus karena tidak sesuai kodenya; skill MySQL kini tanpa label proyek. Link GitHub diisi `github.com/RafiBakhtiar23/ProjectWeb_PKK` (pastikan repo itu publik, atau kosongkan `github` di `site.js`). Screenshot dan video menyusul di akhir lewat field `screenshots` dan `video`.

### v13c Proyek Attenda dari kode asli
Studi kasus Attenda ditulis ulang dari kodenya: React (JavaScript, Vite) + Go Echo + GORM + MySQL. Teks lama yang menyebut TypeScript dan PostgreSQL dihapus (TypeScript dan PostgreSQL tetap tampil sebagai skill tanpa label proyek). Tabel endpoint kini mendukung akses `admin`. File yang berubah: `src/data/site.js` dan `src/components/CaseStudy.astro`.

## v14 Detail kecil dan konsistensi
- **Pengecek isi:** `npm run check` memeriksa kesetaraan EN dan ID (kunci, jumlah item), kata informal di teks Indonesia ("aku", "kamu", dan sebagainya), kata klise, tanda pisah (—), teks kosong, skill berlabel proyek tanpa proyek, link yang bukan https, alt text screenshot, dan data tabel endpoint. ERROR membuat perintah gagal; WARN hanya peringatan. Jalankan sebelum deploy.
- **Subjek email otomatis:** semua tombol email membuka draf dengan subjek "Halo Rafi, tentang peluang software engineer" (EN: "Hello Rafi, about a software engineer opportunity").
- **Halaman `/cv` dan `/id/cv`:** alamat singkat untuk dibagikan. Di desktop CV tampil langsung; di HP hanya tombol unduh dan buka. Bila belum ada PDF, halaman memberi pesan sopan, tidak diindeks Google, dan tidak masuk sitemap.
- File PDF CV hanya mendapat aturan CSP `frame-ancestors 'self'` (di `_headers`, hanya `/cv/*.pdf`) agar penampil PDF browser tidak terblokir; halaman lain tetap memakai CSP penuh.
- 404 versi Indonesia memakai "Anda", dan legenda skill diperjelas.

### v14b Perbaikan tampilan
Hasil pemeriksaan visual desktop dan mobile: teks "200 OK" di Contact tidak lagi tertimpa navigasi titik di sisi kanan layar lebar, nomor proyek ("01 / 03") tidak terpecah dua baris di HP, dan judul section diseimbangkan agar tidak menyisakan satu kata sendirian. Hanya `src/styles/polish.css` yang berubah.

## v15 Siap unggah: tinggal taruh file dengan nama yang benar

Link GitHub Attenda dan Task API sudah terisi. Main stack kini: Go · Laravel · React · MySQL · PostgreSQL.

### Cara mengunggah (semua opsional; yang belum ada otomatis tidak tampil)
1. Taruh file di folder dan dengan nama di tabel di bawah. Format boleh `.png`, `.jpg`, atau `.webp`; yang penting **nama sebelum titik** sama persis.
2. Jalankan `pip install --user pillow` (sekali saja), lalu `python3 tools/optimize_images.py`. Skrip mengecilkan gambar, menyimpannya sebagai `.webp`, menghapus data EXIF (lokasi dan info kamera), dan memindahkan file aslimu ke folder `originals/` (tidak ikut dipublikasikan).
3. `npm run dev`, cek, lalu deploy.

| Apa | Taruh di | Nama file | Jumlah |
|---|---|---|---|
| CV (PDF) | `public/cv/` | `Rafi-Bakhtiar-CV.pdf` | 1 |
| Foto formal (bagian About) | `public/` | `photo` | 1 |
| Screenshot Attenda | `public/projects/` | `attenda-1` sampai `attenda-6` | 4 sampai 6 |
| Screenshot D'Rolls | `public/projects/` | `pancake-1` sampai `pancake-4` | 3 sampai 4 |
| Screenshot Task API (opsional) | `public/projects/` | `task-api-1` | 0 atau 1 |
| Sertifikat | `public/certs/` | lihat daftar nama di bawah | sebanyak yang ada |

Isi tiap screenshot (urutan penting, nomor 1 jadi sampul kartu proyek):
- **Attenda:** 1 dashboard karyawan, 2 clock-in/out dan riwayat, 3 dashboard admin, 4 kelola karyawan, 5 data absensi admin (dengan filter), 6 halaman login.
- **D'Rolls:** 1 beranda, 2 menu, 3 keranjang dengan beberapa item terpilih, 4 tampilan di ponsel.
- **Task API:** 1 Swagger UI (`/swagger`). Sampul kartu Task API tetap ilustrasi bawaan, karena proyek backend tidak punya tampilan.

Nama sertifikat: `oracle-database-foundations`, `oracle-applied-database`, `oracle-oci-foundations`, `ec-council-sql-injection`, `microsoft-security-essentials`, `learningx-xpresso-acp`, `oracle-java-fundamentals`.

Kalau jumlah screenshot lebih sedikit dari slot, slot kosong otomatis disembunyikan. Pakai data contoh di screenshot (bukan data asli orang atau perusahaan) dan jangan tampilkan nomor WhatsApp asli.

Sampul kartu proyek: screenshot ditaruh di dalam bingkai jendela emas yang sama dengan ilustrasi lama, dengan filter warna dan lapisan emas tipis supaya warna aplikasi (biru, oranye) tidak bentrok dengan tema gelap-emas.

### v15b Galeri screenshot selalu rapi
Semua screenshot di halaman proyek tampil di bingkai 16:10 yang sama, apa pun ukuran aslinya. Gambar lebar atau persegi dipotong dari atas (klik untuk melihat ukuran penuh); gambar tegak (tampilan ponsel) ditampilkan utuh di tengah bingkai, dideteksi otomatis dari ukuran file. Ukuran gambar juga dipasang di HTML agar halaman tidak melompat saat gambar dimuat.

### v15c Screenshot terpasang dan kesiapan produksi
- Screenshot Attenda (6) dan D'Rolls (beranda, keranjang, ponsel) sudah terpasang di `public/projects/`. Email asli di halaman Employees Attenda dikaburkan. Screenshot menu D'Rolls ditahan dulu karena memuat gambar Coklat dari thumbnail YouTube milik orang lain; setelah gambarnya diganti, ambil ulang dan simpan sebagai `pancake-2`.
- Sampul kartu proyek tidak pernah terpotong ke samping: screenshot tampil selebar bingkai, bagian bawah yang berlebih terpotong.
- `npm run build` kini menjalankan pemeriksa isi lebih dulu (`prebuild`). ERROR membatalkan build, jadi kesalahan isi (EN dan ID tidak sama, skill berlabel proyek tanpa proyek, link bukan https, alt text kosong) tidak bisa sampai ke produksi.
- Skill: VS Code, Cursor, dan Antigravity kembali masuk Tools. React Native dan PostgreSQL diberi catatan singkat. Penerbit sertifikat OCI: Oracle University.

### Checklist deploy (Cloudflare Pages)
1. Push ke GitHub. Di Cloudflare Pages: Build command `npm run build`, Build output directory `dist`.
2. Environment variable: `NODE_VERSION` = `22`.
3. Hubungkan domain `rafibakhtiar.site`. Aktifkan "Always use HTTPS".
4. Setelah live: cek header di securityheaders.com, uji Lighthouse mobile, buka `/`, `/id/`, setiap halaman proyek, dan `/cv/`. Pastikan Console browser (F12) bersih.
5. Lokal: `npm audit --omit=dev` untuk melihat kerentanan yang benar-benar masuk ke situs (alat pengembangan tidak ikut dipublikasikan).
