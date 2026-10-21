// =====================================================================
// SATU-SATUNYA FILE YANG PERLU KAMU EDIT UNTUK MENGUBAH ISI SITUS.
// Semua teks ada dalam dua bahasa: en (English) dan id (Indonesia).
// Kalau mengubah satu kalimat, ubah juga versi bahasa satunya.
// =====================================================================

export const site = {
  name: 'Rafi Bakhtiar',
  fullName: 'Rafi Bakhtiar Cahyadi',
  role: 'Software Engineer',
  domain: 'https://rafibakhtiar.pages.dev',
  location: 'Bandung, Indonesia',
  workModes: ['On-site', 'Remote', 'Hybrid'],
  email: 'rafibakkhtiar@gmail.com',
  github: 'https://github.com/RafiBakhtiar23',
  linkedin: 'https://linkedin.com/in/rafibakhtiar',
  // WhatsApp (opsional): isi nomor tanpa + dan spasi, contoh '6281234567890'. Kosong = tombol tidak tampil.
  whatsapp: '6283150282931',
  // Cloudflare Web Analytics (opsional): isi token dari dashboard Cloudflare. Kosong = tidak aktif.
  analyticsToken: '',
  certsLink: '', // link ke semua sertifikat (LinkedIn / Google Drive). Kosong = tombol tidak tampil
  googleVerification: '', // kode meta dari Google Search Console (opsional)
  // CV: taruh PDF di public/cv/ dengan nama persis ini. Ganti file = CV di situs ikut berganti.
  cvFile: 'Rafi-Bakhtiar-CV.pdf',
};

// Urutan section di halaman utama. nav:true = muncul di menu atas.
export const sections = [
  { id: 'hero', nav: false },
  { id: 'work', nav: true },
  { id: 'skills', nav: true },
  { id: 'about', nav: true },
  { id: 'education', nav: true },
  { id: 'contact', nav: true },
];

// ---------------------------------------------------------------------
// Teks antarmuka (menu, tombol, judul section)
// ---------------------------------------------------------------------
export const ui = {
  en: {
    skip: 'Skip to content',
    menu: 'Open menu',
    menuClose: 'Close menu',
    langLabel: 'Language',
    mailSubject: 'Hello Rafi, about a software engineer opportunity',
    cvPage: {
      title: 'CV | Rafi Bakhtiar',
      description: 'Curriculum vitae of Rafi Bakhtiar, software engineer in Bandung.',
      eyebrow: 'CURRICULUM VITAE',
      h1: { main: 'My', accent: 'CV.' },
      lead: 'The latest version of my CV. It is the same file as the download button on the home page.',
      download: 'DOWNLOAD PDF',
      open: 'OPEN IN NEW TAB',
      back: '← BACK TO HOME',
      missing: 'My CV is not available online yet. Please contact me by email and I will send it.',
      contact: 'CONTACT',
    },
    fx: 'REDUCE EFFECTS',
    nav: { hero: 'INTRO', work: 'PROJECTS', skills: 'SKILLS', about: 'ABOUT', education: 'EDUCATION', contact: 'CONTACT' },
    available: 'OPEN TO WORK',
    cv: 'CV',
    downloadCv: 'DOWNLOAD CV',
    viewProjects: 'VIEW PROJECTS',
    contactShort: 'CONTACT',
    scroll: 'SCROLL',
    snapshot: { label: 'Quick facts', cv: 'CV ↓', github: 'GITHUB ↗', linkedin: 'LINKEDIN ↗', email: 'EMAIL ↗', whatsapp: 'WHATSAPP ↗' },
    about: { kicker: 'ABOUT', eyebrow: 'ABOUT ME', h2: 'Backend first.<br /><em>Fullstack when needed.</em>', contactAria: 'Contact' },
    work: {
      eyebrow: 'SELECTED PROJECTS',
      h2: 'Projects I have <em>built.</em>',
      count: (n) => `${n} PROJECTS<br />CASE STUDIES`,
      caseStudy: 'CASE STUDY',
      read: (title) => `Read the ${title} case study`,
      liveDemo: 'LIVE DEMO ↗',
      github: 'GITHUB ↗',
    },
    skills: {
      kicker: 'SKILLS',
      eyebrow: 'TECHNOLOGIES AND PROFICIENCY',
      h2: 'Technologies I use,<br /><em>and how well I know them.</em>',
      legend: { project: 'Used in my projects', working: 'Working knowledge', basic: 'Fundamentals only' },
      usedIn: 'Used in',
    },
    education: {
      kicker: 'EDUCATION',
      eyebrow: 'EDUCATION AND CERTIFICATES',
      h2: 'Education<br /><em>and certificates.</em>',
      average: 'ACADEMIC AVERAGE / 100',
      verify: 'VERIFY ↗',
      viewCert: 'View certificate',
      allCerts: 'VIEW ALL CERTIFICATES ↗',
      kinds: { certificate: 'Certificate', certification: 'Certification', course: 'Course' },
    },
    contact: {
      eyebrow: 'CONTACT',
      h2: 'Get in<br /><em>touch.</em>',
      email: 'EMAIL ME',
      copy: 'COPY',
      copied: 'COPIED',
      cvLink: 'CV ↓',
      whatsapp: 'WHATSAPP ↗',
      top: 'BACK TO TOP ↑',
    },
    case: {
      back: '← BACK TO PROJECTS',
      project: 'PROJECT',
      open: 'OPEN LIVE DEMO',
      source: 'VIEW SOURCE',
      meta: { type: 'PROJECT TYPE', role: 'ROLE', stack: 'STACK' },
      discuss: 'DISCUSS THIS PROJECT',
      next: 'NEXT PROJECT',
      demoOpen: 'OPEN ↗',
      demoTitle: (title) => `${title} live demo`,
      caseStudy: 'Case study',
      sections: {
        screenshots: { label: 'SCREENSHOTS', heading: 'How it', accent: 'looks.' },
        erd: { label: 'DATABASE DESIGN', heading: 'How the data is', accent: 'structured.' },
        endpoints: { label: 'API ENDPOINTS', heading: 'The API', accent: 'at a glance.' },
        decisions: { label: 'DESIGN DECISIONS', heading: 'Choices I made,', accent: 'and why.' },
        explorer: { label: 'RECORDED REQUESTS', heading: 'Real requests,', accent: 'real responses.', note: (n, date) => `${n} requests recorded from the API running on my laptop on ${date}. Tokens are shortened.`, request: 'REQUEST', response: 'RESPONSE' },
        video: { label: 'DEMO RECORDING', heading: 'See it', accent: 'running.', note: 'Recorded from the application running on my laptop.' },
        table: { method: 'METHOD', path: 'PATH', access: 'ACCESS', note: 'NOTE', auth: 'Login required', admin: 'Admin only', public: 'Public' },
      },
    },
  },
  id: {
    skip: 'Lompat ke konten',
    menu: 'Buka menu',
    menuClose: 'Tutup menu',
    langLabel: 'Bahasa',
    mailSubject: 'Halo Rafi, tentang peluang software engineer',
    cvPage: {
      title: 'CV | Rafi Bakhtiar',
      description: 'Curriculum vitae Rafi Bakhtiar, software engineer di Bandung.',
      eyebrow: 'CURRICULUM VITAE',
      h1: { main: 'CV', accent: 'saya.' },
      lead: 'Versi terbaru CV saya. File ini sama dengan tombol unduh di halaman utama.',
      download: 'UNDUH PDF',
      open: 'BUKA DI TAB BARU',
      back: '← KEMBALI KE BERANDA',
      missing: 'CV saya belum tersedia secara online. Silakan hubungi saya lewat email dan akan saya kirim.',
      contact: 'KONTAK',
    },
    fx: 'KURANGI EFEK',
    nav: { hero: 'INTRO', work: 'PROYEK', skills: 'SKILL', about: 'TENTANG', education: 'PENDIDIKAN', contact: 'KONTAK' },
    available: 'TERBUKA UNTUK KERJA',
    cv: 'CV',
    downloadCv: 'UNDUH CV',
    viewProjects: 'LIHAT PROYEK',
    contactShort: 'KONTAK',
    scroll: 'GULIR',
    snapshot: { label: 'Ringkasan', cv: 'CV ↓', github: 'GITHUB ↗', linkedin: 'LINKEDIN ↗', email: 'EMAIL ↗', whatsapp: 'WHATSAPP ↗' },
    about: { kicker: 'TENTANG', eyebrow: 'TENTANG SAYA', h2: 'Fokus backend.<br /><em>Fullstack bila diperlukan.</em>', contactAria: 'Kontak' },
    work: {
      eyebrow: 'PROYEK PILIHAN',
      h2: 'Proyek yang <em>telah saya bangun.</em>',
      count: (n) => `${n} PROYEK<br />STUDI KASUS`,
      caseStudy: 'STUDI KASUS',
      read: (title) => `Baca studi kasus ${title}`,
      liveDemo: 'DEMO LANGSUNG ↗',
      github: 'GITHUB ↗',
    },
    skills: {
      kicker: 'SKILL',
      eyebrow: 'TEKNOLOGI DAN TINGKAT PENGUASAAN',
      h2: 'Teknologi yang saya gunakan,<br /><em>dan tingkat penguasaannya.</em>',
      legend: { project: 'Digunakan di proyek saya', working: 'Dapat dipakai untuk bekerja', basic: 'Baru tingkat dasar' },
      usedIn: 'Digunakan di',
    },
    education: {
      kicker: 'PENDIDIKAN',
      eyebrow: 'PENDIDIKAN DAN SERTIFIKAT',
      h2: 'Pendidikan<br /><em>dan sertifikat.</em>',
      average: 'RATA-RATA NILAI / 100',
      verify: 'VERIFIKASI ↗',
      viewCert: 'Lihat sertifikat',
      allCerts: 'LIHAT SEMUA SERTIFIKAT ↗',
      kinds: { certificate: 'Sertifikat', certification: 'Sertifikasi', course: 'Kursus' },
    },
    contact: {
      eyebrow: 'KONTAK',
      h2: 'Mari<br /><em>terhubung.</em>',
      email: 'KIRIM EMAIL',
      copy: 'SALIN',
      copied: 'TERSALIN',
      cvLink: 'CV ↓',
      whatsapp: 'WHATSAPP ↗',
      top: 'KE ATAS ↑',
    },
    case: {
      back: '← KEMBALI KE PROYEK',
      project: 'PROYEK',
      open: 'BUKA DEMO LANGSUNG',
      source: 'LIHAT KODE',
      meta: { type: 'JENIS PROYEK', role: 'PERAN', stack: 'STACK' },
      discuss: 'DISKUSIKAN PROYEK INI',
      next: 'PROYEK BERIKUTNYA',
      demoOpen: 'BUKA ↗',
      demoTitle: (title) => `Demo langsung ${title}`,
      caseStudy: 'Studi kasus',
      sections: {
        screenshots: { label: 'TANGKAPAN LAYAR', heading: 'Tampilan', accent: 'aplikasi.' },
        erd: { label: 'RANCANGAN DATABASE', heading: 'Struktur data', accent: 'aplikasi.' },
        endpoints: { label: 'ENDPOINT API', heading: 'API', accent: 'sekilas.' },
        decisions: { label: 'KEPUTUSAN DESAIN', heading: 'Pilihan yang saya ambil,', accent: 'beserta alasannya.' },
        explorer: { label: 'REQUEST TEREKAM', heading: 'Request nyata,', accent: 'respons nyata.', note: (n, date) => `${n} request direkam dari API yang berjalan di laptop saya pada ${date}. Token dipersingkat.`, request: 'REQUEST', response: 'RESPONS' },
        video: { label: 'REKAMAN DEMO', heading: 'Lihat aplikasinya', accent: 'berjalan.', note: 'Direkam dari aplikasi yang berjalan di laptop saya.' },
        table: { method: 'METHOD', path: 'PATH', access: 'AKSES', note: 'CATATAN', auth: 'Perlu login', admin: 'Khusus admin', public: 'Publik' },
      },
    },
    langHint: { text: 'Baca dalam Bahasa Indonesia?', yes: 'Ya, pindah', no: 'Tidak' },
  },
};

// ---------------------------------------------------------------------
// Teks utama: hero, ringkasan, about, contact, meta SEO
// ---------------------------------------------------------------------
export const copy = {
  en: {
    meta: {
      title: 'Rafi Bakhtiar | Software Engineer in Bandung',
      description:
        'Rafi Bakhtiar, software engineer in Bandung. I build backend systems and web applications with Go, Laravel, and React. Open to on-site, remote, and hybrid roles.',
    },
    hero: {
      eyebrow: 'BACKEND TO FRONTEND · BANDUNG',
      h1: 'Rafi<br />Bakhtiar.<br /><em>Software engineer.</em>',
      intro:
        'Recent Software Engineering graduate based in Bandung. I build complete applications, from the database and backend logic to the interface, mainly with Go, Laravel, and React.',
    },
    snapshot: [
      ['POSITION', 'Software Engineer, entry-level'],
      ['LOCATION', 'Bandung, Indonesia'],
      ['WORK MODE', 'On-site · Remote · Hybrid'],
      ['MAIN STACK', 'Go · Laravel · React · MySQL · PostgreSQL'],
      ['EDUCATION', 'SMKN 4 Padalarang · 86.70 / 100'],
      ['LANGUAGES', 'Indonesian · English (basic)'],
    ],
    about: {
      lead:
        'I completed my Software Engineering studies at SMKN 4 Padalarang in 2026. Most of my skills come from building projects: backend services in Go, web applications in Laravel, and interfaces in React.',
      more: [
        'I enjoy working across the whole application: structuring data in PostgreSQL and MySQL, writing the backend logic and authentication, and building the interface on top. Backend is where I am strongest, and I can follow a feature from the database to the screen. I have also used React Native for mobile.',
        'I am at the start of my career. I am looking for a team where I can contribute to real features, receive feedback on my code, and keep learning from experienced engineers.',
      ],
    },
    contact: {
      text:
        'I am seeking an entry-level software engineer role or an internship, on-site, remote, or hybrid. Email is the best way to reach me.',
    },
  },
  id: {
    meta: {
      title: 'Rafi Bakhtiar | Software Engineer di Bandung',
      description:
        'Rafi Bakhtiar, software engineer di Bandung. Membangun sistem backend dan aplikasi web dengan Go, Laravel, dan React. Terbuka untuk posisi on-site, remote, dan hybrid.',
    },
    hero: {
      eyebrow: 'BACKEND SAMPAI FRONTEND · BANDUNG',
      h1: 'Rafi<br />Bakhtiar.<br /><em>Software engineer.</em>',
      intro:
        'Lulusan baru Rekayasa Perangkat Lunak di Bandung. Saya membangun aplikasi secara utuh, dari database dan logika backend sampai antarmuka, terutama dengan Go, Laravel, dan React.',
    },
    snapshot: [
      ['POSISI', 'Software Engineer, tingkat pemula'],
      ['LOKASI', 'Bandung, Indonesia'],
      ['MODE KERJA', 'On-site · Remote · Hybrid'],
      ['STACK UTAMA', 'Go · Laravel · React · MySQL · PostgreSQL'],
      ['PENDIDIKAN', 'SMKN 4 Padalarang · 86.70 / 100'],
      ['BAHASA', 'Indonesia · Inggris (dasar)'],
    ],
    about: {
      lead:
        'Saya menyelesaikan pendidikan Rekayasa Perangkat Lunak di SMKN 4 Padalarang pada tahun 2026. Kemampuan saya terutama berkembang dari membangun proyek: layanan backend dengan Go, aplikasi web dengan Laravel, dan antarmuka dengan React.',
      more: [
        'Saya senang mengerjakan aplikasi secara menyeluruh: menyusun data di PostgreSQL dan MySQL, menulis logika backend dan autentikasi, lalu membangun antarmukanya. Backend adalah bagian yang paling saya kuasai, dan saya dapat mengikuti satu fitur dari database hingga tampil di layar. Saya juga pernah memakai React Native untuk mobile.',
        'Saya berada di awal karier. Saya mencari tim tempat saya dapat berkontribusi pada fitur nyata, menerima masukan atas kode saya, dan terus belajar dari engineer yang lebih berpengalaman.',
      ],
    },
    contact: {
      text:
        'Saya sedang mencari posisi software engineer tingkat pemula atau magang, dengan opsi on-site, remote, maupun hybrid. Email adalah cara terbaik untuk menghubungi saya.',
    },
  },
};

// ---------------------------------------------------------------------
// Skills. level: 'project' = dipakai di proyek di situs ini,
//                'working' = bisa dipakai kerja,
//                'basic'   = baru dasar.
// usedIn berisi slug proyek. Pindahkan item sesuai kondisi sebenarnya.
// ---------------------------------------------------------------------
export const skillGroups = [
  {
    name: { en: 'Backend', id: 'Backend' },
    note: { en: 'APIs, business logic, and the servers behind an application.', id: 'API, logika bisnis, dan server di balik aplikasi.' },
    items: [
      { name: 'Go', level: 'project', usedIn: ['attenda', 'task-api'] },
      { name: 'Gin', level: 'project', usedIn: ['task-api'] },
      { name: 'Echo', level: 'project', usedIn: ['attenda'] },
      { name: 'GORM', level: 'project', usedIn: ['task-api'] },
      { name: 'PHP', level: 'project', usedIn: ['pancake'] },
      { name: 'Laravel', level: 'project', usedIn: ['pancake'] },
      { name: 'REST API', level: 'project', usedIn: ['task-api'] },
      { name: 'JWT', level: 'project', usedIn: ['task-api'] },
      { name: 'OpenAPI', level: 'project', usedIn: ['task-api'] },
      { name: 'Java', level: 'basic', note: { en: 'Studied through Oracle Academy in 2023. Not used since.', id: 'Dipelajari lewat Oracle Academy pada 2023. Belum digunakan kembali.' } },
    ],
  },
  {
    name: { en: 'Frontend and mobile', id: 'Frontend dan mobile' },
    note: { en: 'Interfaces for the web and mobile devices.', id: 'Antarmuka untuk web dan perangkat seluler.' },
    items: [
      { name: 'React', level: 'project', usedIn: ['attenda'] },
      { name: 'TypeScript', level: 'working' },
      { name: 'JavaScript', level: 'project', usedIn: ['attenda'] },
      { name: 'React Native', level: 'working', note: { en: 'Built with Expo. Those apps are not featured here.', id: 'Dibangun dengan Expo. Aplikasinya belum ditampilkan di sini.' } },
    ],
  },
  {
    name: { en: 'Databases', id: 'Database' },
    note: { en: 'Data modeling and queries.', id: 'Perancangan data dan penulisan query.' },
    items: [
      { name: 'PostgreSQL', level: 'working', note: { en: 'Used often in work that is not published yet.', id: 'Sering dipakai di pekerjaan yang belum dipublikasikan.' } },
      { name: 'MySQL', level: 'project', usedIn: ['attenda'] },
      { name: 'SQLite', level: 'project', usedIn: ['task-api'] },
    ],
  },
  {
    name: { en: 'Tools and environment', id: 'Tools dan lingkungan kerja' },
    note: { en: 'Editors, API testing, version control, and design.', id: 'Editor, pengujian API, version control, dan desain.' },
    items: [
      { name: 'Linux (Fedora)', level: 'working' },
      { name: 'VS Code', level: 'working' },
      { name: 'Cursor', level: 'working' },
      { name: 'Antigravity', level: 'working' },
      { name: 'Git', level: 'working' },
      { name: 'Postman', level: 'working' },
      { name: 'Bruno', level: 'working' },
      { name: 'Figma', level: 'working' },
      { name: 'Docker', level: 'basic', note: { en: 'Fundamentals only. No hands-on experience yet.', id: 'Baru tingkat dasar. Belum ada pengalaman langsung.' } },
    ],
  },
];

export const education = {
  school: 'SMKN 4 Padalarang',
  program: { en: 'Software Engineering (Rekayasa Perangkat Lunak)', id: 'Rekayasa Perangkat Lunak (Software Engineering)' },
  from: '2023-07',
  to: '2026-05',
  average: '86.70',
};

// Terbaru di atas. kind: certificate | certification | course.
// url   = link verifikasi dari penerbit (opsional)
// image = gambar sertifikat di folder public/, contoh '/certs/oracle-oci.webp' (opsional)
export const certifications = [
  { date: '2026-06', title: 'Database Foundations', issuer: 'Oracle Academy', kind: 'certificate', url: '', image: '/certs/oracle-database-foundations.webp' },
  { date: '2026-06', title: 'Applied Database Systems', issuer: 'Oracle Academy', kind: 'certificate', url: '', image: '/certs/oracle-applied-database.webp' },
  { date: '2025-08', title: 'Oracle Certified Foundations Associate', issuer: 'Oracle University', detail: 'Oracle Cloud Infrastructure 2025', kind: 'certification', url: '', image: '/certs/oracle-oci-foundations.webp' },
  { date: '2025-08', title: 'SQL Injection Attacks', issuer: 'EC-Council', detail: { en: 'Course completion, not an official certification', id: 'Penyelesaian kursus, bukan sertifikasi resmi' }, kind: 'course', url: '', image: '/certs/ec-council-sql-injection.webp' },
  { date: '2025-07', title: 'Security Essentials Professional Certificate', issuer: 'Microsoft & LinkedIn Learning', kind: 'certificate', url: '', image: '/certs/microsoft-security-essentials.webp' },
  { date: '2024-10', title: 'Xpresso ACP Lite', issuer: 'LearningX', detail: 'Web Programming, Mobile Application Development, Python Programming, UI/UX Design and Development', kind: 'certificate', url: '', image: '/certs/learningx-xpresso-acp.webp' },
  { date: '2023-12', title: 'Java Fundamentals', issuer: 'Oracle Academy', kind: 'certificate', url: '', image: '/certs/oracle-java-fundamentals.webp' },
];

// ---------------------------------------------------------------------
// Proyek. Kolom opsional (kosong = bagian tidak tampil):
//   github, demo     : link repo dan URL aplikasi yang sudah di-deploy
//   screenshots      : [{ src: '/projects/attenda-1.webp', alt: {en,id}, caption: {en,id} }]
//   coverFromShot    : true = screenshot pertama dipakai sebagai sampul kartu proyek di beranda (false = ilustrasi bawaan)
//   erd              : { src: '/projects/attenda-erd.webp', alt: {en,id} }
//   endpoints        : [{ method: 'POST', path: '/auth/login', access: 'public' | 'auth', note: {en,id} }]
//   decisions        : [{ title: {en,id}, text: {en,id} }]
// Isi endpoints dan decisions hanya dengan hal yang benar-benar ada di proyekmu.
// ---------------------------------------------------------------------
export const projects = [
  {
    slug: 'attenda',
    title: 'Attenda',
    tags: ['React · Vite', 'Go · Echo', 'MySQL · JWT'],
    stack: 'React · Go · Echo · GORM · MySQL',
    github: 'https://github.com/RafiBakhtiar23/attenda',
    demo: '',
    demoNote: { en: '', id: '' },
    screenshots: [
      { src: '/projects/attenda-1.webp', alt: { en: 'Attenda employee dashboard showing the on-time rate and recent attendance', id: 'Dashboard karyawan Attenda yang menampilkan persentase tepat waktu dan absensi terbaru' }, caption: { en: 'Employee dashboard: clock in and out, on-time rate, and recent attendance.', id: 'Dashboard karyawan: clock-in dan clock-out, persentase tepat waktu, dan absensi terbaru.' } },
      { src: '/projects/attenda-2.webp', alt: { en: 'Attenda attendance history page with totals and a search box', id: 'Halaman riwayat absensi Attenda dengan total dan kotak pencarian' }, caption: { en: 'Attendance history with totals and search.', id: 'Riwayat absensi dengan total dan pencarian.' } },
      { src: '/projects/attenda-3.webp', alt: { en: "Attenda admin dashboard with today's attendance summary", id: 'Dashboard admin Attenda dengan ringkasan absensi hari ini' }, caption: { en: "Admin dashboard: today's attendance summary.", id: 'Dashboard admin: ringkasan absensi hari ini.' } },
      { src: '/projects/attenda-4.webp', alt: { en: 'Attenda employee management page where admins search, add, and deactivate accounts', id: 'Halaman kelola karyawan Attenda tempat admin mencari, menambah, dan menonaktifkan akun' }, caption: { en: 'Employee management: search, add, and deactivate accounts.', id: 'Kelola karyawan: mencari, menambah, dan menonaktifkan akun.' } },
      { src: '/projects/attenda-5.webp', alt: { en: 'Attenda attendance records page filtered by name and status', id: 'Halaman data absensi Attenda yang difilter berdasarkan nama dan status' }, caption: { en: 'All attendance records, filtered by name and status.', id: 'Semua data absensi, difilter berdasarkan nama dan status.' } },
      { src: '/projects/attenda-6.webp', alt: { en: 'Attenda sign-in page', id: 'Halaman login Attenda' }, caption: { en: 'Sign-in page.', id: 'Halaman login.' } },
    ],
    coverFromShot: true,
    erd: null,
    video: null,
    // Rute diambil dari backend/routes/routes.go.
    endpoints: [
      { method: 'GET', path: '/health', access: 'public', note: { en: 'API and database health check.', id: 'Memeriksa kesehatan API dan database.' } },
      { method: 'POST', path: '/register', access: 'public', note: { en: 'Create an employee account. The role cannot be chosen by the client.', id: 'Membuat akun karyawan. Peran tidak bisa dipilih oleh klien.' } },
      { method: 'POST', path: '/login', access: 'public', note: { en: 'Returns a JWT. Rate limited per IP.', id: 'Mengembalikan JWT. Dibatasi per IP.' } },
      { method: 'GET', path: '/profile', access: 'auth', note: { en: 'The logged-in user.', id: 'Pengguna yang sedang login.' } },
      { method: 'POST', path: '/clock-in', access: 'auth', note: { en: 'Record today\'s clock-in. Status is on_time or late, set by the server.', id: 'Mencatat clock-in hari ini. Status on_time atau late ditentukan oleh server.' } },
      { method: 'POST', path: '/clock-out', access: 'auth', note: { en: 'Record today\'s clock-out.', id: 'Mencatat clock-out hari ini.' } },
      { method: 'GET', path: '/attendance/history', access: 'auth', note: { en: 'Your own attendance history, newest first.', id: 'Riwayat absensi milikmu, terbaru lebih dulu.' } },
      { method: 'GET', path: '/admin/employees', access: 'admin', note: { en: 'List employees.', id: 'Daftar karyawan.' } },
      { method: 'POST', path: '/admin/employees', access: 'admin', note: { en: 'Create an employee account.', id: 'Membuat akun karyawan.' } },
      { method: 'PATCH', path: '/admin/employees/:id/status', access: 'admin', note: { en: 'Activate or deactivate an employee.', id: 'Mengaktifkan atau menonaktifkan karyawan.' } },
      { method: 'GET', path: '/admin/attendances', access: 'admin', note: { en: 'All attendance records.', id: 'Semua data absensi.' } },
    ],
    decisions: [
      {
        title: { en: 'The account is checked on every request', id: 'Akun diperiksa pada setiap request' },
        text: {
          en: 'The auth middleware loads the user from the database each time. A deactivated account, or one whose role changed, loses access immediately instead of keeping it until the JWT expires.',
          id: 'Middleware autentikasi memuat pengguna dari database setiap kali. Akun yang dinonaktifkan, atau yang perannya berubah, langsung kehilangan akses dan tidak menunggu JWT kedaluwarsa.',
        },
      },
      {
        title: { en: 'The database prevents double clock-ins', id: 'Database mencegah clock-in ganda' },
        text: {
          en: 'A unique index on user and date rejects a second clock-in for the same day, even when two requests arrive at the same moment. The handler turns MySQL duplicate-entry error 1062 into a clear response.',
          id: 'Unique index pada pengguna dan tanggal menolak clock-in kedua di hari yang sama, bahkan ketika dua request datang bersamaan. Handler mengubah error duplicate-entry MySQL 1062 menjadi respons yang jelas.',
        },
      },
      {
        title: { en: 'Roles are never chosen by the client', id: 'Peran tidak pernah dipilih oleh klien' },
        text: {
          en: 'Public registration always creates an employee. Admin accounts come only from a seed command, and admin routes sit behind both the auth and the admin middleware.',
          id: 'Pendaftaran publik selalu membuat karyawan. Akun admin hanya berasal dari perintah seed, dan route admin berada di balik middleware autentikasi sekaligus middleware admin.',
        },
      },
      {
        title: { en: 'Late is decided by the server, in Jakarta time', id: 'Terlambat ditentukan server, dengan waktu Jakarta' },
        text: {
          en: 'A clock-in after 08:00 WIB is late. The cutoff is computed in the Asia/Jakarta time zone on the server, so it does not depend on the device clock, and a unit test covers the rule.',
          id: 'Clock-in setelah pukul 08.00 WIB dianggap terlambat. Batas waktu dihitung di server dengan zona Asia/Jakarta, jadi tidak bergantung pada jam perangkat, dan aturannya dicakup unit test.',
        },
      },
      {
        title: { en: 'Authentication basics are locked down', id: 'Dasar autentikasi dikunci' },
        text: {
          en: 'Passwords use bcrypt. Tokens must be HS256 and are rejected otherwise, the server refuses to run auth without a JWT secret, login and register are rate limited, and the server has read, write, and idle timeouts.',
          id: 'Password memakai bcrypt. Token harus HS256 dan ditolak jika tidak, server menolak autentikasi tanpa secret JWT, login dan register dibatasi lajunya, dan server memiliki timeout baca, tulis, serta idle.',
        },
      },
    ],
    t: {
      en: {
        type: 'FULL-STACK · ATTENDANCE',
        kicker: 'FULL-STACK APP',
        summary: 'An employee attendance app with a React frontend and a Go REST API. Employees clock in and out; admins manage accounts and records.',
        detail: 'Role-based access with JWT, automatic on-time or late status, an admin side, tests, and a CI pipeline.',
        caseTitle: { main: 'Attenda.', accent: 'Attendance, organized.' },
        lead: 'Attenda is a full-stack employee attendance app. A React frontend talks to a Go REST API backed by MySQL. Employees clock in and out from a dashboard, and administrators manage accounts and review attendance records.',
        metaType: 'Full-stack learning project',
        role: 'Full-stack developer',
        problem: { label: '01 / WHY', heading: 'Attendance needs', accent: 'some structure.', text: 'Recording attendance is only part of the problem. Employees need a simple way to log their time, and administrators need one place to manage access and review the records. I built Attenda to practice authentication, role-based access, and a clean separation between frontend and backend.' },
        features: {
          label: '02 / WHAT IT DOES', heading: 'Two roles,', accent: 'clear responsibilities.',
          items: [
            { title: 'Clock in and out', text: 'Employees record one clock-in and one clock-out per day. The status, on time up to 08:00 WIB and late after, is set automatically.' },
            { title: 'Personal dashboard', text: 'On-time rate, recent attendance, and a searchable attendance history.' },
            { title: 'Employee management', text: 'Admins create employee accounts and activate or deactivate them. Deactivated accounts lose access at once.' },
            { title: 'Attendance records', text: 'Admins see a summary of today and browse all records, searching by employee name and filtering by status.' },
            { title: 'Safe by default', text: 'bcrypt passwords, HS256 JWT, role middleware, input validation, and rate limiting on login and register.' },
            { title: 'Tests and CI', text: 'Go tests for the JWT, the late rule, validation, and the admin middleware. GitHub Actions runs format, vet, test, lint, and build.' },
          ],
        },
        learned: { label: '03 / NEXT IMPROVEMENTS', heading: 'What I would', accent: 'do next.', text: 'Store the JWT in an httpOnly cookie with refresh tokens instead of localStorage, paginate the admin lists, use versioned migrations instead of AutoMigrate, and add integration tests that run against a real database.' },
      },
      id: {
        type: 'FULL-STACK · ABSENSI',
        kicker: 'APLIKASI FULL-STACK',
        summary: 'Aplikasi absensi karyawan dengan frontend React dan REST API Go. Karyawan melakukan clock-in dan clock-out; admin mengelola akun dan data.',
        detail: 'Akses berbasis peran dengan JWT, status tepat waktu atau terlambat otomatis, sisi admin, tes, dan pipeline CI.',
        caseTitle: { main: 'Attenda.', accent: 'Absensi, tertata.' },
        lead: 'Attenda adalah aplikasi absensi karyawan full-stack. Frontend React terhubung ke REST API Go dengan database MySQL. Karyawan melakukan clock-in dan clock-out dari dashboard, sedangkan administrator mengelola akun dan meninjau data absensi.',
        metaType: 'Proyek belajar full-stack',
        role: 'Full-stack developer',
        problem: { label: '01 / LATAR BELAKANG', heading: 'Absensi membutuhkan', accent: 'struktur.', text: 'Mencatat absensi hanyalah sebagian dari kebutuhan. Karyawan memerlukan cara sederhana untuk mencatat waktu kerja, dan admin memerlukan satu tempat untuk mengelola akses serta meninjau data. Saya membangun Attenda untuk berlatih autentikasi, akses berbasis peran, dan pemisahan yang rapi antara frontend dan backend.' },
        features: {
          label: '02 / FITUR', heading: 'Dua peran,', accent: 'tanggung jawab yang jelas.',
          items: [
            { title: 'Clock-in dan clock-out', text: 'Karyawan mencatat satu clock-in dan satu clock-out per hari. Status tepat waktu sampai 08.00 WIB dan terlambat sesudahnya ditentukan otomatis.' },
            { title: 'Dashboard pribadi', text: 'Persentase tepat waktu, absensi terbaru, dan riwayat absensi yang bisa dicari.' },
            { title: 'Kelola karyawan', text: 'Admin membuat akun karyawan dan mengaktifkan atau menonaktifkannya. Akun nonaktif langsung kehilangan akses.' },
            { title: 'Data absensi', text: 'Admin melihat ringkasan hari ini dan menelusuri semua data, dengan pencarian nama karyawan dan filter status.' },
            { title: 'Aman sejak awal', text: 'Password bcrypt, JWT HS256, middleware peran, validasi input, dan pembatasan laju pada login dan register.' },
            { title: 'Tes dan CI', text: 'Tes Go untuk JWT, aturan terlambat, validasi, dan middleware admin. GitHub Actions menjalankan format, vet, test, lint, dan build.' },
          ],
        },
        learned: { label: '03 / PERBAIKAN BERIKUTNYA', heading: 'Yang akan saya', accent: 'kerjakan berikutnya.', text: 'Menyimpan JWT di cookie httpOnly dengan refresh token, bukan di localStorage; menambahkan pagination pada daftar admin; memakai migrasi berversi, bukan AutoMigrate; dan menambah tes integrasi yang berjalan di database sungguhan.' },
      },
    },
  },
  {
    slug: 'task-api',
    title: 'Task API',
    tags: ['Go · Gin', 'GORM · SQLite', 'JWT · REST API'],
    stack: 'Go · Gin · GORM · SQLite',
    github: 'https://github.com/RafiBakhtiar23/go-task-api',
    demo: '',
    demoNote: { en: '', id: '' },
    screenshots: [
      { src: '/projects/task-api-1.webp', alt: { en: 'Swagger UI listing the Task API endpoints', id: 'Swagger UI yang menampilkan endpoint Task API' }, caption: { en: 'Swagger UI generated from the OpenAPI file.', id: 'Swagger UI dari file OpenAPI.' } },
    ],
    coverFromShot: false,
    erd: null,
    // Rekaman video layar (opsional): taruh file di public/projects/ lalu isi, contoh:
    // video: { src: '/projects/task-api-demo.mp4', poster: '/projects/task-api-demo.webp', caption: { en: '...', id: '...' } },
    video: null,
    // Rute di bawah diambil dari main.go. Contoh request dan respons nyata ada di
    // public/projects/task-api-explorer.json (dibuat oleh tools/capture_explorer.py).
    endpoints: [
      { method: 'GET', path: '/health', access: 'public', note: { en: 'Server status check.', id: 'Memeriksa status server.' } },
      { method: 'POST', path: '/api/auth/register', access: 'public', note: { en: 'Create an account. The password is hashed with bcrypt; a duplicate email returns 409.', id: 'Membuat akun. Password di-hash dengan bcrypt; email yang sudah terdaftar menghasilkan 409.' } },
      { method: 'POST', path: '/api/auth/login', access: 'public', note: { en: 'Returns a JWT that is valid for 24 hours.', id: 'Mengembalikan JWT yang berlaku 24 jam.' } },
      { method: 'GET', path: '/api/me', access: 'auth', note: { en: 'Profile of the logged-in user.', id: 'Profil pengguna yang sedang login.' } },
      { method: 'GET', path: '/api/tasks', access: 'auth', note: { en: 'Your tasks, newest first. Query: page, limit, done.', id: 'Task milikmu, terbaru lebih dulu. Query: page, limit, done.' } },
      { method: 'POST', path: '/api/tasks', access: 'auth', note: { en: 'Create a task. The title is required.', id: 'Membuat task. Judul wajib diisi.' } },
      { method: 'GET', path: '/api/tasks/:id', access: 'auth', note: { en: 'One of your tasks. A task of another user returns 404.', id: 'Satu task milikmu. Task milik pengguna lain menghasilkan 404.' } },
      { method: 'PUT', path: '/api/tasks/:id', access: 'auth', note: { en: 'Partial update: send only the fields to change.', id: 'Update sebagian: kirim hanya field yang ingin diubah.' } },
      { method: 'DELETE', path: '/api/tasks/:id', access: 'auth', note: { en: 'Delete one of your tasks.', id: 'Menghapus salah satu task milikmu.' } },
    ],
    decisions: [
      {
        title: { en: 'Every task query is scoped to the logged-in user', id: 'Setiap query task dibatasi untuk pengguna yang login' },
        text: {
          en: 'A task is fetched with both its id and the user id from the token, so a user cannot read, change, or delete a task that belongs to someone else. Such a task returns 404, the same as a task that does not exist.',
          id: 'Task diambil dengan id task dan id pengguna dari token sekaligus, sehingga pengguna tidak bisa membaca, mengubah, atau menghapus task milik orang lain. Task seperti itu menghasilkan 404, sama seperti task yang memang tidak ada.',
        },
      },
      {
        title: { en: 'Partial updates with pointer fields', id: 'Update sebagian dengan field pointer' },
        text: {
          en: 'The update endpoint reads title, description, and done as pointers. That separates a field that was not sent from an empty value or false, so done: false is applied while an omitted field is left alone.',
          id: 'Endpoint update membaca title, description, dan done sebagai pointer. Dengan begitu field yang tidak dikirim dibedakan dari nilai kosong atau false: done: false diterapkan, sedangkan field yang tidak dikirim dibiarkan.',
        },
      },
      {
        title: { en: 'Passwords and tokens', id: 'Password dan token' },
        text: {
          en: 'Passwords are hashed with bcrypt and never appear in a response. Login gives the same message for a wrong email and a wrong password. Tokens are HS256 JWTs that expire after 24 hours, and the parser accepts only that signing method.',
          id: 'Password di-hash dengan bcrypt dan tidak pernah muncul di respons. Login memberi pesan yang sama untuk email salah maupun password salah. Token berupa JWT HS256 yang kedaluwarsa setelah 24 jam, dan parser hanya menerima metode tanda tangan itu.',
        },
      },
      {
        title: { en: 'Pagination with a safe range', id: 'Pagination dengan batas yang aman' },
        text: {
          en: 'The list endpoint defaults to page 1 with 10 items, accepts a limit from 1 to 100 and falls back to 10 for anything else, and returns a meta object with page, limit, and total so a client can build its own pager.',
          id: 'Endpoint daftar memakai halaman 1 dengan 10 item sebagai bawaan, menerima limit 1 sampai 100 dan kembali ke 10 untuk nilai lain, serta mengirim objek meta berisi page, limit, dan total agar klien bisa membuat pager sendiri.',
        },
      },
      {
        title: { en: 'Runs without a database server', id: 'Berjalan tanpa server database' },
        text: {
          en: 'GORM uses a pure-Go SQLite driver, so the API starts with go run and nothing else to install. The database is one file, configured with DB_PATH.',
          id: 'GORM memakai driver SQLite murni Go, sehingga API langsung jalan dengan go run tanpa perlu memasang apa pun. Database-nya satu file yang diatur lewat DB_PATH.',
        },
      },
    ],
    t: {
      en: {
        type: 'BACKEND · REST API',
        kicker: 'BACKEND REST API',
        summary: 'A REST API in Go where each user registers, logs in with a JWT, and manages a private task list.',
        detail: 'Layered Gin handlers, GORM with SQLite, paginated lists, Swagger documentation, and a Postman collection.',
        caseTitle: { main: 'Task', accent: 'API.' },
        lead: 'Task API is a REST API written in Go with Gin and GORM. Users register, log in with a JWT, and manage their own tasks. It runs on SQLite with no database setup and comes with Swagger documentation and a Postman collection.',
        metaType: 'Backend REST API',
        role: 'Backend developer',
        problem: { label: '01 / SCOPE', heading: 'A small API,', accent: 'built with structure.', text: 'Every user has a private task list. The project is about the parts around plain CRUD: authentication, access limited to the owner, input validation, pagination, and documentation that another developer can run.' },
        features: {
          label: '02 / WHAT IS INCLUDED', heading: 'Auth, tasks,', accent: 'and documentation.',
          items: [
            { title: 'Authentication', text: 'Register and log in. Passwords are hashed with bcrypt, and login returns a JWT that expires after 24 hours.' },
            { title: 'Task management', text: 'Create, read, update, and delete your own tasks, with paginated lists and a done filter.' },
            { title: 'Layered code', text: 'Routes in main.go, with handlers, JWT middleware, models, and token utilities in separate packages.' },
            { title: 'Documentation', text: 'An OpenAPI spec with Swagger UI at /docs, a Postman collection, and a multi-stage Dockerfile.' },
          ],
        },
        learned: { label: '03 / NEXT IMPROVEMENTS', heading: 'What is', accent: 'still missing.', text: 'The API has no automated tests yet, and the JWT secret falls back to a default value when the environment variable is not set, so a production setup should refuse to start without it. Next I would add handler tests, rate limiting on login, and a PostgreSQL option.' },
      },
      id: {
        type: 'BACKEND · REST API',
        kicker: 'REST API BACKEND',
        summary: 'REST API dengan Go: tiap pengguna mendaftar, login dengan JWT, dan mengelola daftar task pribadinya.',
        detail: 'Handler Gin per lapisan, GORM dengan SQLite, daftar per halaman, dokumentasi Swagger, dan koleksi Postman.',
        caseTitle: { main: 'Task', accent: 'API.' },
        lead: 'Task API adalah REST API yang ditulis dengan Go, Gin, dan GORM. Pengguna mendaftar, login dengan JWT, dan mengelola task miliknya sendiri. API ini berjalan di SQLite tanpa setup database dan dilengkapi dokumentasi Swagger serta koleksi Postman.',
        metaType: 'Backend REST API',
        role: 'Backend developer',
        problem: { label: '01 / RUANG LINGKUP', heading: 'API kecil,', accent: 'dibangun dengan struktur.', text: 'Setiap pengguna punya daftar task pribadi. Fokus proyek ini ada pada bagian di luar CRUD biasa: autentikasi, akses yang dibatasi untuk pemilik, validasi input, pagination, dan dokumentasi yang bisa dijalankan developer lain.' },
        features: {
          label: '02 / ISI PROYEK', heading: 'Autentikasi, task,', accent: 'dan dokumentasi.',
          items: [
            { title: 'Autentikasi', text: 'Registrasi dan login. Password di-hash dengan bcrypt, dan login mengembalikan JWT yang kedaluwarsa setelah 24 jam.' },
            { title: 'Manajemen task', text: 'Membuat, membaca, mengubah, dan menghapus task sendiri, dengan daftar per halaman dan filter selesai.' },
            { title: 'Kode berlapis', text: 'Route di main.go, dengan handler, middleware JWT, model, dan utilitas token di package terpisah.' },
            { title: 'Dokumentasi', text: 'Spesifikasi OpenAPI dengan Swagger UI di /docs, koleksi Postman, dan Dockerfile multi-stage.' },
          ],
        },
        learned: { label: '03 / LANGKAH BERIKUTNYA', heading: 'Yang', accent: 'masih kurang.', text: 'API ini belum punya tes otomatis, dan secret JWT memakai nilai bawaan bila variabel lingkungan tidak diisi, jadi di production aplikasi seharusnya menolak berjalan tanpa secret. Langkah berikutnya: tes untuk handler, pembatasan laju di login, dan opsi PostgreSQL.' },
      },
    },
  },
  {
    slug: 'pancake',
    title: "D'Rolls",
    tags: ['Laravel · PHP', 'Tailwind CSS', 'WhatsApp checkout'],
    stack: 'Laravel 11 · PHP · Tailwind CSS · Alpine.js',
    github: 'https://github.com/RafiBakhtiar23/ProjectWeb_PKK',
    demo: '',
    demoNote: { en: '', id: '' },
    screenshots: [
      { src: '/projects/pancake-1.webp', alt: { en: "D'Rolls home page", id: "Beranda D'Rolls" }, caption: { en: 'Home page.', id: 'Halaman beranda.' } },
      { src: '/projects/pancake-2.webp', alt: { en: "D'Rolls menu page with pancake roll flavours and prices", id: "Halaman menu D'Rolls dengan varian pancake roll dan harga" }, caption: { en: 'Menu with images and prices.', id: 'Menu lengkap dengan gambar dan harga.' } },
      { src: '/projects/pancake-3.webp', alt: { en: "D'Rolls cart with selected items and a live total", id: "Keranjang D'Rolls dengan item terpilih dan total yang langsung berubah" }, caption: { en: 'Cart: choose items and see the total update.', id: 'Keranjang: pilih item dan lihat total langsung berubah.' } },
      { src: '/projects/pancake-4.webp', alt: { en: "D'Rolls home page on a phone screen", id: "Beranda D'Rolls di layar ponsel" }, caption: { en: 'The same site on a phone.', id: 'Situs yang sama di ponsel.' } },
    ],
    coverFromShot: true,
    erd: null,
    video: null,
    endpoints: [],
    decisions: [
      {
        title: { en: 'Prices always come from the server', id: 'Harga selalu berasal dari server' },
        text: {
          en: 'The browser sends only a menu id and a quantity. Name and price are read from the server-side catalog, so a price edited with inspect element has no effect. A feature test covers this case.',
          id: 'Browser hanya mengirim id menu dan jumlah. Nama dan harga dibaca dari katalog di server, jadi harga yang diubah lewat inspect element tidak berpengaruh. Kasus ini dicakup feature test.',
        },
      },
      {
        title: { en: 'Input is validated on the server', id: 'Input divalidasi di server' },
        text: {
          en: 'A quantity must be a whole number from 1 to 99 and the menu item must be available. Anything else is rejected with a clear message in Indonesian.',
          id: 'Jumlah harus bilangan bulat 1 sampai 99 dan menu harus tersedia. Selain itu ditolak dengan pesan yang jelas dalam bahasa Indonesia.',
        },
      },
      {
        title: { en: 'No database, on purpose', id: 'Tanpa database, dengan sengaja' },
        text: {
          en: 'The menu lives in a config file and the cart in the session as menu id to quantity. For a small seller who takes orders by WhatsApp this is enough, and it is easy to deploy. The cost is that orders are not stored; saving them is the first item on my improvement list.',
          id: 'Menu disimpan di file konfigurasi dan keranjang di session dengan format id menu ke jumlah. Untuk penjual kecil yang menerima pesanan lewat WhatsApp ini sudah cukup dan mudah di-deploy. Konsekuensinya pesanan tidak tersimpan; menyimpannya adalah item pertama dalam daftar perbaikan saya.',
        },
      },
      {
        title: { en: 'Checkout through WhatsApp', id: 'Checkout lewat WhatsApp' },
        text: {
          en: 'The seller already takes orders on WhatsApp, so checkout opens a chat with the order written out: items, quantities, and the total. This fits how the business works without building a payment system.',
          id: 'Penjual sudah menerima pesanan lewat WhatsApp, jadi checkout membuka chat berisi pesanan yang sudah tersusun: item, jumlah, dan total. Cara ini sesuai dengan cara usaha berjalan tanpa membangun sistem pembayaran.',
        },
      },
      {
        title: { en: 'The seller number stays out of the repository', id: 'Nomor penjual tidak masuk repository' },
        text: {
          en: 'The WhatsApp number is read from the .env file instead of being written in the code, so a personal number is not published with the source.',
          id: 'Nomor WhatsApp dibaca dari file .env, bukan ditulis di kode, agar nomor pribadi tidak ikut terpublikasi bersama source code.',
        },
      },
    ],
    t: {
      en: {
        type: 'WEB APP · TEAM PROJECT',
        kicker: 'ORDERING WEBSITE',
        summary: 'An ordering website for a pancake roll business, built with Laravel. Customers fill a cart and check out through WhatsApp.',
        detail: 'Menu, a session cart with quantity controls, and a checkout that opens WhatsApp with the order already written.',
        caseTitle: { main: "D'Rolls", accent: 'Pancake Roll.' },
        lead: "D'Rolls is an ordering website for a pancake roll business, built with Laravel 11 and Tailwind CSS for the Creative Product and Entrepreneurship (PKK) subject at SMK Negeri 4 Padalarang. Our team of four ran the pancake roll business together: two members handled the kitchen, one handled logistics, and I built the website. Visitors browse the menu, fill a cart, and check out through WhatsApp with the order message prepared for them.",
        metaType: 'Team project (PKK), team of 4',
        role: 'Web developer (team of 4)',
        problem: { label: '01 / CONTEXT', heading: 'A simple store for', accent: 'a real seller.', text: 'A small food seller takes orders by chat. The site lets customers see the menu and prepare an order themselves, so the seller receives one clear message instead of piecing the order together.' },
        features: {
          label: '02 / FEATURES', heading: 'From the menu', accent: 'to WhatsApp.',
          items: [
            { title: 'Menu page', text: 'Available items with image and price. Items marked unavailable are hidden and cannot be ordered.' },
            { title: 'Session cart', text: 'Add items, change quantities with plus and minus, remove one item, or clear the cart. The navbar shows the item count.' },
            { title: 'Selective checkout', text: 'Choose which cart items to order and see the total update immediately.' },
            { title: 'WhatsApp message', text: 'Checkout opens wa.me with the items, quantities, and total already written.' },
            { title: 'Responsive pages', text: 'Layouts for mobile and desktop, flash notifications, and a custom 404 page.' },
            { title: 'Feature tests', text: 'PHPUnit tests for the cart flow, validation, server-side prices, and the main pages.' },
          ],
        },
        learned: { label: '03 / NEXT IMPROVEMENTS', heading: 'What I would add', accent: 'next.', text: 'Save orders in a database and add an admin panel to manage the menu, so the seller no longer edits a config file. After that: online payment, and search and categories for a longer menu.' },
      },
      id: {
        type: 'APLIKASI WEB · PROYEK TIM',
        kicker: 'WEBSITE PEMESANAN',
        summary: 'Website pemesanan untuk usaha pancake roll, dibuat dengan Laravel. Pelanggan mengisi keranjang lalu checkout lewat WhatsApp.',
        detail: 'Menu, keranjang berbasis session dengan pengatur jumlah, dan checkout yang membuka WhatsApp dengan pesanan yang sudah tersusun.',
        caseTitle: { main: "D'Rolls", accent: 'Pancake Roll.' },
        lead: "D'Rolls adalah website pemesanan untuk usaha pancake roll, dibuat dengan Laravel 11 dan Tailwind CSS untuk mata pelajaran Produk Kreatif dan Kewirausahaan (PKK) di SMK Negeri 4 Padalarang. Tim kami beranggota empat orang dan menjalankan usaha pancake roll bersama: dua anggota mengurus dapur, satu mengurus logistik, dan saya membuat websitenya. Pengunjung melihat menu, mengisi keranjang, lalu checkout lewat WhatsApp dengan pesan pesanan yang sudah disiapkan.",
        metaType: 'Proyek tim (PKK), 4 anggota',
        role: 'Web developer (tim 4 orang)',
        problem: { label: '01 / KONTEKS', heading: 'Toko sederhana untuk', accent: 'penjual yang nyata.', text: 'Penjual makanan kecil menerima pesanan lewat chat. Situs ini membuat pelanggan bisa melihat menu dan menyiapkan pesanan sendiri, sehingga penjual menerima satu pesan yang jelas, bukan menyusun pesanan satu per satu.' },
        features: {
          label: '02 / FITUR', heading: 'Dari menu', accent: 'hingga WhatsApp.',
          items: [
            { title: 'Halaman menu', text: 'Menu yang tersedia lengkap dengan gambar dan harga. Menu yang ditandai tidak tersedia disembunyikan dan tidak bisa dipesan.' },
            { title: 'Keranjang session', text: 'Tambah item, ubah jumlah dengan plus dan minus, hapus satu item, atau kosongkan keranjang. Navbar menampilkan jumlah item.' },
            { title: 'Checkout terpilih', text: 'Pilih item keranjang yang ingin dipesan dan lihat total yang langsung berubah.' },
            { title: 'Pesan WhatsApp', text: 'Checkout membuka wa.me berisi item, jumlah, dan total yang sudah tersusun.' },
            { title: 'Halaman responsif', text: 'Tampilan untuk mobile dan desktop, notifikasi aksi, dan halaman 404 khusus.' },
            { title: 'Feature test', text: 'Tes PHPUnit untuk alur keranjang, validasi, harga dari server, dan halaman utama.' },
          ],
        },
        learned: { label: '03 / PERBAIKAN BERIKUTNYA', heading: 'Yang akan saya', accent: 'tambahkan.', text: 'Menyimpan pesanan ke database dan membuat panel admin untuk mengelola menu, supaya penjual tidak perlu mengedit file konfigurasi. Berikutnya: pembayaran online, serta pencarian dan kategori untuk menu yang lebih panjang.' },
      },
    },
  },
];
