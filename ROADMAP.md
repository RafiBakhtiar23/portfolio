# Roadmap Portofolio Rafi Bakhtiar (v9 sampai peluncuran)

Dokumen kerja untuk pengembangan bertahap. Tujuannya satu: tidak ada celah yang mengurangi nilai portofolio, baik dari desain, isi, aksesibilitas, performa, maupun keamanan, di desktop **dan** mobile.

Status saat ini: **v8 selesai** (hero berisi nama, loader singkat, aksesibilitas dasar, SEO dasar, halaman 404).

---

## 0. Aturan main (supaya situs tidak makin jelek)

1. **Satu versi, satu tema.** Setiap versi hanya mengerjakan satu kelompok perubahan, jadi gampang dicek dan dibatalkan.
2. **Bisa dikembalikan.** Gaya baru ditaruh di file CSS sendiri dan dimuat lewat satu baris `import` di `Base.astro` (pola yang sudah dipakai di v6 sampai v8).
3. **Cek sebelum dan sesudah.** Tiap versi: screenshot desktop (1440 px) dan mobile (390 px) sebelum dan sesudah, lalu bandingkan. Kalau hasilnya tidak jelas lebih baik, tidak dipakai.
4. **Konten tidak pernah disembunyikan oleh efek.** Semua teks tetap terbaca tanpa JavaScript, dengan reduced motion, dan di HP lemah.
5. **Tidak ada klaim yang tidak bisa dibuktikan.** Level skill, deskripsi proyek, dan sertifikat harus sesuai kenyataan (prinsip yang sudah dipegang sejak v3).
6. **Dependensi seminimal mungkin.** Library baru hanya dipakai kalau menggantikan banyak kode atau menutup risiko keamanan.
7. **Anggaran performa tetap.** JavaScript awal di bawah 60 KB (gzip), LCP di bawah 2 detik di 4G, CLS di bawah 0.02. Fitur baru yang melanggar angka ini dibatalkan atau dimuat malas.
8. **Dua bahasa selalu sejajar.** Tidak ada teks yang hanya ada di satu bahasa.
9. **Aset (CV, foto, sertifikat, proyek, demo) diunggah paling akhir (v15).** Selama itu semua bagian harus tampil rapi walau aset belum ada.

---

## 1. Definisi "mendekati sempurna" (tolok ukur akhir)

| Area | Target | Alat ukur |
|---|---|---|
| Lighthouse mobile | Performance, Accessibility, Best Practices, SEO semuanya 95 ke atas | Chrome DevTools / Lighthouse CI |
| Aksesibilitas | 0 pelanggaran di axe-core, bisa dipakai penuh dengan keyboard, diuji dengan screen reader | axe + uji manual NVDA / TalkBack |
| Keamanan header | Grade A atau A+ | securityheaders.com, Mozilla Observatory |
| Tautan | 0 tautan rusak, semua tautan luar `rel="noopener noreferrer"` | skrip cek tautan |
| Dua bahasa | Kunci EN dan ID 100 persen sejajar, tidak ada teks kosong atau "TODO" | skrip paritas |
| Data terstruktur | Lolos Rich Results Test, tanpa peringatan | Google Rich Results Test |
| Pratinjau tautan | Tampil benar di WhatsApp, LinkedIn, Telegram, X | uji kirim tautan |
| Perangkat | Lolos matriks perangkat (bagian 4, v11) | uji manual dan Playwright |

---

## 2. Gambaran tahapan

| Versi | Tema | Hasil utama | Perlu input Rafi? |
|---|---|---|---|
| **v9** | Keamanan dan gerbang kualitas | Header ketat, CSP, rantai pasok aman, skrip `npm run qa` | Sedikit |
| **v10** | Sistem studi kasus | Struktur studi kasus siap menerima aset, tanpa visual tiruan | **Ya** (fakta proyek) |
| **v11** | Polesan desktop dan mobile | Matriks perangkat, sentuhan, detail kecil | Tidak |
| **v12** | Fitur khas | Command palette, request inspector, bukti nyata | Sebagian |
| **v13** | Visual, gerak, performa | Penyempurnaan animasi, pipeline gambar, anggaran performa | Tidak |
| **v14** | Naskah dan SEO akhir | Salinan EN/ID dipoles, OG per halaman, data terstruktur | **Ya** (persetujuan teks) |
| **v15** | Aset, demo, peluncuran | CV, foto, sertifikat, proyek, demo, domain, pemantauan | **Ya** (semua aset) |

Urutan boleh bergeser, tapi **v9 selalu pertama** karena gerbang kualitasnya dipakai untuk memeriksa semua versi sesudahnya.

---

## v9. Keamanan dan gerbang kualitas

Situs ini statis, jadi permukaan serangannya kecil. Risiko yang tersisa ada di header, rantai pasok paket, akun (GitHub, domain, hosting), dan integrasi pihak ketiga. Semuanya ditutup di sini.

**Header dan transport** (`public/_headers`, plus pengaturan Cloudflare)
- [ ] `Content-Security-Policy` ketat: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`. Skrip inline di `Base.astro` perlu hash (atau fitur CSP bawaan Astro), supaya tidak memakai `unsafe-inline` untuk skrip.
- [ ] `Strict-Transport-Security` (HSTS, `max-age` 1 tahun, `includeSubDomains`; `preload` hanya setelah semua subdomain HTTPS).
- [ ] Ganti `X-Frame-Options: SAMEORIGIN` menjadi `frame-ancestors 'none'` (portofolio tidak perlu di-embed orang lain).
- [ ] Tambah `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, dan perluas `Permissions-Policy` (matikan fitur yang tidak dipakai).
- [ ] Cloudflare: Always Use HTTPS, TLS minimal 1.2, DNSSEC aktif, redirect `www` ke domain utama.
- [ ] `/.well-known/security.txt` dan `humans.txt`.

**Rantai pasok dan kode**
- [ ] Buat dan commit `package-lock.json` (sekarang tidak ada di zip). Versi paket dikunci.
- [ ] `npm audit` bersih; aktifkan Dependabot atau Renovate di GitHub.
- [ ] Pastikan tidak ada rahasia di repo (`.env`, token). Tambah `.gitignore` yang benar dan cek riwayat commit.
- [ ] Skrip analytics (kalau dipakai) dimuat sesuai CSP, tanpa cookie.
- [ ] Semua tautan luar: `rel="noopener noreferrer"`, tautan `mailto:` tanpa data tambahan.

**Akun dan domain** (di luar kode, tapi bagian dari keamanan)
- [ ] 2FA di GitHub, Cloudflare, registrar domain, dan Gmail.
- [ ] Branch utama GitHub diproteksi; deploy hanya dari branch itu.
- [ ] Email di domain sendiri (misalnya `hello@rafibakhtiar.site`) lewat Cloudflare Email Routing yang gratis. Lebih profesional, dan menghindari salah ketik pada alamat Gmail.

**Gerbang kualitas** (`npm run qa`, jalan di komputermu)
- [ ] Skrip paritas EN/ID: kunci sama, tidak ada teks kosong, tidak ada kata terlarang ("TODO", "lorem").
- [ ] Skrip cek tautan dan file referensi (gambar, CV, sertifikat) yang tidak ada.
- [ ] Pemeriksaan axe-core lewat Playwright pada beranda, studi kasus, dan 404, di dua lebar layar.
- [ ] Lighthouse CI dengan batas skor.

**Selesai bila:** securityheaders.com minimal A, `npm audit` 0 kerentanan tinggi, `npm run qa` hijau.

> Catatan CSP: efek animasi memakai atribut `style` (misalnya `--d`). Itu butuh `style-src-attr 'unsafe-inline'`, yang risikonya rendah. Skrip tetap ketat.

---

## v10. Sistem studi kasus (siap menerima aset)

Sekarang studi kasus berisi teks umum dan visual tiruan. Visual tiruan dihapus dan diganti struktur yang baru terisi kalau datanya benar-benar ada.

- [ ] **Struktur baru per proyek:** konteks, peran spesifik, tantangan teknis, solusi, hasil, yang akan diperbaiki berikutnya. Setiap bagian hanya tampil kalau terisi.
- [ ] **Galeri screenshot:** bingkai browser (desktop) dan bingkai ponsel (mobile), lightbox yang bisa dioperasikan keyboard, `alt` wajib diisi.
- [ ] **Viewer ERD:** bisa di-zoom dan digeser, ada tombol "buka ukuran penuh".
- [ ] **Diagram alur request per proyek** dalam SVG (misalnya Client → Router → Handler → Service → DB), digambar dari struktur proyek yang sebenarnya.
- [ ] **Tabel endpoint** dengan contoh request/response yang bisa dibuka-tutup (sudah ada tabelnya, ditambah contoh).
- [ ] **Tab "Tech decisions":** satu keputusan, satu alasan, satu alternatif yang tidak dipilih.
- [ ] **Status proyek yang jujur:** label "Proyek belajar", "Proyek tim", "Demo tersedia" atau "Kode tersedia".
- [ ] Kartu proyek di beranda: siap menampilkan thumbnail asli kalau ada, jatuh ke ilustrasi bersih kalau belum.
- [ ] Halaman kosong tidak pernah terlihat rusak: bagian tanpa data tidak dirender.

**Yang saya butuhkan dari Rafi** (cukup jawaban singkat):
1. Per proyek: apa tepatnya yang kamu kerjakan sendiri? (terutama Pancake Roll, yang proyek tim)
2. Satu masalah teknis yang pernah kamu hadapi di tiap proyek dan cara menyelesaikannya.
3. Daftar endpoint JobConnect yang sebenarnya, dan struktur tabel tiap proyek.
4. Apa yang akan kamu perbaiki kalau punya waktu lagi.

**Selesai bila:** semua kombinasi (ada/tidak ada screenshot, ERD, endpoint) tampil rapi di desktop dan mobile.

---

## v11. Polesan desktop dan mobile

Dua tampilan diuji sebagai produk terpisah, bukan satu desain yang diperkecil.

**Matriks perangkat yang diuji**
| Kelompok | Ukuran |
|---|---|
| HP kecil | 320 x 568, 360 x 640 |
| HP umum | 390 x 844, 412 x 915 |
| Tablet | 768 x 1024, 820 x 1180, mode landscape |
| Laptop | 1366 x 768, 1440 x 900, 1536 x 864 (skala Windows 125 persen) |
| Desktop | 1920 x 1080, 2560 x 1440 |
| Peramban | Chrome, Safari (iOS dan macOS), Firefox, Samsung Internet |

**Mobile**
- [ ] Target sentuh minimal 44 x 44 px di semua tautan dan tombol (tautan teks kecil di footer, kontak, dan kartu sertifikat dicek satu per satu).
- [ ] `safe-area-inset` untuk notch dan bar bawah; `100svh` untuk hero supaya tidak melompat saat bar alamat menyusut.
- [ ] Tidak ada efek yang bergantung pada hover; ada pengganti sentuh untuk setiap interaksi.
- [ ] Tombol back Android menutup menu dulu sebelum meninggalkan halaman.
- [ ] Uji zoom teks 200 persen dan pengaturan ukuran font besar di sistem.
- [ ] Mode landscape di HP: hero dan menu tidak terpotong.
- [ ] Tidak ada scroll horizontal di lebar berapa pun (cek tabel endpoint dan baris sertifikat).

**Desktop**
- [ ] Kursor khusus: kursor asli tetap ada sebagai cadangan, dan efek mati di area teks, input, dan saat `prefers-reduced-motion`.
- [ ] Layar ultra lebar: isi tidak melebar tanpa batas, ritme spasi tetap.
- [ ] Layar pendek (laptop 768 px): hero tetap menampilkan tombol utama tanpa scroll.
- [ ] Fokus keyboard terlihat jelas di semua elemen interaktif; urutan Tab logis.
- [ ] Cetak (Ctrl+P): gaya cetak bersih (tanpa grain, animasi, dan latar gelap penuh).

**Detail kecil (daftar periksa)**
- [ ] `<title>` dan `lang` benar saat pindah bahasa; pindah bahasa mempertahankan posisi section.
- [ ] `:hover`, `:active`, `:focus-visible`, `:disabled` konsisten di semua tombol.
- [ ] Teks yang dipilih (`::selection`), scrollbar, `color-scheme`, dan `theme-color` serasi dengan tema.
- [ ] Mode kontras tinggi dan `forced-colors` tetap terbaca.
- [ ] Tidak ada kata yang terpotong aneh di bahasa Indonesia (kata panjang seperti "Pendidikan", "Terhubung").
- [ ] Angka dan tanggal diformat sesuai bahasa.
- [ ] Favicon, ikon, dan judul tab jelas di tab yang banyak.

**Selesai bila:** semua kotak di atas tercentang untuk seluruh matriks, tanpa ada regresi pada screenshot v10.

---

## v12. Fitur khas (yang tidak gampang ditiru)

Konsep situs sudah kuat: seluruh halaman adalah satu siklus HTTP request (`GET /` sampai `200 OK`). Fitur di bawah memperdalam konsep itu dan menunjukkan kemampuan backend secara nyata, bukan hiasan.

| Ide | Isi | Dampak | Risiko | Rekomendasi |
|---|---|---|---|---|
| **Command palette** (`Ctrl+K`, atau tombol di HP) | Pindah section, ganti bahasa, salin email, unduh CV, buka proyek. Bisa dipakai penuh dengan keyboard | Tinggi | Rendah | **Ya** |
| **Request inspector** | Panel kecil "Inspect this request": menampilkan urutan alur halaman (REQUEST, ROUTE, HANDLER, QUERY, RESPONSE) dan waktu muat nyata dari Performance API | Tinggi | Rendah | **Ya** |
| **Endpoint nyata** (`/api/profile`) | Cloudflare Worker gratis yang mengembalikan data profil sebagai JSON, dengan header yang benar dan batas laju. Tombol "Coba" di situs memanggilnya | Tinggi | Sedang (perlu CSP dan rate limit) | **Ya**, setelah v9 |
| **Bukti dari GitHub** | Saat build, ambil repo dan bahasa asli dari GitHub, tampilkan sebagai ringkasan yang bisa diverifikasi | Sedang-tinggi | Rendah | **Ya**, setelah repo dirapikan |
| **"Sedang saya pelajari"** | Blok jujur: Docker, testing di Go, Redis. Memberi sinyal bertumbuh tanpa mengklaim | Sedang | Rendah | **Ya** |
| **Sertifikat dengan verifikasi** | Tautan verifikasi penerbit dan tanggal terbit tiap sertifikat | Sedang | Rendah | **Ya** (di v15) |
| **Formulir kontak aman** | Worker + Cloudflare Turnstile + honeypot, kirim ke email. Alternatif untuk yang tidak mau membuka aplikasi email | Sedang | Sedang (spam, rahasia API) | Opsional, tunda |
| **Halaman CV HTML** (`/cv`) | CV yang dirender dari `site.js`, ramah ATS dan siap cetak, selalu sama dengan isi situs | Sedang | Rendah | Opsional |
| **Pesan di konsol dan `humans.txt`** | Sapaan singkat untuk developer yang membuka DevTools | Kecil, tapi berkesan | Tidak ada | Ya, murah |

**Sengaja tidak dipakai** (nilainya rendah atau merugikan):
- Latar 3D/WebGL berat, musik atau suara otomatis, kursor yang menutupi teks, parallax berlebihan: memperlambat HP dan mengganggu pembaca.
- Chatbot AI di situs: tidak sejalan dengan preferensimu, rawan salah menjawab atas namamu, dan menambah biaya serta celah keamanan.
- Kuis "skill meter" dengan persentase: angka persen terlihat bagus tapi tidak bisa dipertanggungjawabkan; tiga level jujur yang sekarang lebih kuat.

**Selesai bila:** tiap fitur bisa dipakai dengan keyboard dan layar sentuh, ditutup dengan `Esc`, tidak memperlambat muat awal (dimuat malas), dan lolos `npm run qa`.

---

## v13. Visual, gerak, dan performa

- [ ] **Audit animasi per section:** pastikan setiap section punya animasi masuk, keluar, dan interaksi (sesuai permintaanmu), tanpa terasa berlebihan. Durasi dan easing diseragamkan.
- [ ] **Kurva gerak satu keluarga:** semua easing berasal dari variabel yang sama.
- [ ] **Mode ringan otomatis** sudah ada; diuji di perangkat lemah nyata, bukan hanya emulasi.
- [ ] **Pipeline gambar:** semua gambar (foto, sertifikat, screenshot) diproses saat build ke WebP/AVIF dengan `srcset`, `width`, `height` (anti CLS). Cukup taruh file apa adanya; build yang mengecilkan.
- [ ] **Font:** kurangi bobot yang tidak dipakai, preload font yang menentukan LCP, `font-display: swap` dengan fallback yang ukurannya disesuaikan agar tidak melompat.
- [ ] **Gambar OG** dibuat ulang dengan Playfair asli.
- [ ] **Hero-lines.webp** (±135 KB) dipangkas tanpa menurunkan kualitas yang terlihat.
- [ ] **Pemantauan nyata:** Cloudflare Web Analytics (tanpa cookie) untuk melihat apakah recruiter membuka situs, dari perangkat apa, dan berapa lama.
- [ ] Anggaran performa dipaksa lewat Lighthouse CI.

**Selesai bila:** Lighthouse mobile 95 ke atas di semua halaman, LCP di bawah 2 detik, CLS di bawah 0.02.

---

## v14. Naskah dan SEO akhir

- [ ] **Edit naskah EN dan ID** kalimat demi kalimat: suara profesional, konkret, bukan buzzword, tidak terdengar buatan. Indonesia memakai "saya".
- [ ] Cek konsistensi istilah: "software engineer", "studi kasus", "proyek", dan seterusnya, dipakai seragam.
- [ ] **OG image per halaman** (beranda dan tiap studi kasus) dengan judul masing-masing.
- [ ] Data terstruktur: `Person` + `ProfilePage` di beranda; `CreativeWork` dan `BreadcrumbList` di studi kasus.
- [ ] Judul dan deskripsi unik per halaman, panjang sesuai batas tampilan hasil pencarian.
- [ ] `hreflang` dan kanonik diverifikasi di Search Console; sitemap dikirim.
- [ ] Ejaan dan tata bahasa diperiksa (Indonesia mengikuti PUEBI, Inggris sederhana dan benar). Karena bahasa Inggris Rafi masih dasar, kalimat Inggris dibuat sederhana dan tidak lebih fasih dari kenyataan, supaya cocok saat wawancara.
- [ ] Uji pratinjau tautan di WhatsApp, LinkedIn, Telegram, dan X.

**Yang saya butuhkan dari Rafi:** persetujuan akhir tiap kalimat yang berisi klaim tentang dirimu.

---

## v15. Aset, demo, dan peluncuran

Semua yang kamu unggah belakangan masuk di sini. Struktur sudah siap sejak v10 dan v13, jadi tinggal menaruh file.

**Aset**
- [ ] `public/cv/Rafi-Bakhtiar-CV.pdf` (tombol CV muncul otomatis di semua tempat).
- [ ] Foto formal untuk bagian About saja (rasio 4:5).
- [ ] Gambar tujuh sertifikat di `public/certs/` beserta tautan verifikasi.
- [ ] Screenshot, ERD, dan data endpoint tiap proyek.

**Demo proyek (paling akhir)**
- [ ] Deploy tiap proyek **terpisah** di subdomain (misalnya `attenda.rafibakhtiar.site`) di hosting gratis, lalu isi `demo` di data. Tombol OPEN langsung menuju demo.
- [ ] Data demo hanya berisi data contoh. Tidak ada `.env`, kata sandi, atau kunci API yang ikut ter-commit.
- [ ] Akun demo (kalau perlu login) dibatasi: hanya baca atau data yang bisa di-reset.
- [ ] Header demo mengizinkan di-embed hanya dari domain portofolio (`frame-ancestors`), dan CSP portofolio menambahkan `frame-src` yang tepat.

> Catatan keputusan: sebelumnya ada rencana menyalin seluruh source proyek ke dalam proyek portofolio. Saya sarankan **tidak**, karena (1) menambah permukaan serangan ke situs utama, (2) membuat build berat dan rawan salah rilis, (3) backend Go/Laravel tidak bisa berjalan di hosting statis. Deploy terpisah dengan tautan atau iframe memberi hasil yang sama bagi recruiter. Keputusan akhir tetap di Rafi.

**Peluncuran**
- [ ] Domain: DNSSEC, HTTPS paksa, `www` ke domain utama, email routing aktif.
- [ ] Jalankan seluruh `npm run qa`, Lighthouse, securityheaders, Rich Results Test, uji pratinjau tautan.
- [ ] Verifikasi Google Search Console; kirim sitemap.
- [ ] Tambahkan URL portofolio ke LinkedIn, GitHub, dan CV.
- [ ] Jadwal rutin: cek tautan, `npm audit`, dan perbarui isi tiap bulan.

---

## 3. Hal yang sudah saya temukan tapi belum dikerjakan

1. `og.png` memakai font cadangan, bukan Playfair (v13).
2. Tidak ada `package-lock.json` (v9).
3. Header `X-Frame-Options: SAMEORIGIN` diganti `frame-ancestors` (v9).
4. Level Echo dan React Native "dapat dipakai bekerja" belum punya bukti proyek. Siapkan jawaban untuk wawancara, atau turunkan levelnya (keputusan Rafi).
5. JavaScript berlabel "working" sementara TypeScript berlabel "project": urutan ini terlihat janggal bagi pembaca teknis (v14, bersama pemeriksaan naskah).
6. Visual studi kasus saat ini tiruan (dashboard, JSON contoh) dan diganti di v10.
7. Analytics belum aktif (v13).
8. Nomor WhatsApp belum diisi (opsional, keputusan Rafi).

## 4. Pertanyaan terbuka untuk Rafi

- [ ] Pernah PKL/magang, lomba, atau organisasi saat SMK? (Kalau ada, jadi bagian kuat untuk lulusan baru.)
- [ ] Mau pakai WhatsApp sebagai kontak tambahan?
- [ ] Mau email di domain sendiri (`hello@rafibakhtiar.site`) sebagai kontak utama?
- [ ] Mau tombol "Formulir kontak" selain email?
- [ ] Tautan GitHub tiap proyek: dibuat publik atau tetap privat? (Memengaruhi v10 dan v12.)
- [ ] Demo: hosting gratis mana yang kamu pilih untuk backend Go dan Laravel?

## 5. Cara kerja tiap versi

1. Saya mengerjakan satu versi dan mengirim zip baru.
2. Rafi menjalankan `npm install && npm run dev` dan `npm run build`, lalu mengirim screenshot desktop dan mobile atau catatan masalah.
3. Saya memperbaiki sampai versi itu memenuhi bagian "Selesai bila".
4. Baru lanjut ke versi berikutnya.
