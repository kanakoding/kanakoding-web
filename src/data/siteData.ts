export interface ServiceItem {
    id: string;
    title: string;
    badge: string;
    shortDesc: string;
    description: string;
    image: string;
    deliverables: string[];
    ctaLabel: string;
    ctaLink: string;
    accent: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    client: string;
    category: "Web Platform" | "FinTech & Enterprise" | "Marketplace" | "Community & EdTech";
    year: string;
    image: string;
    summary: string;
    challenge: string;
    solution: string;
    highlights: string[];
    techStack: string[];
    liveUrl?: string;
}

export interface WorkflowStep {
    step: string;
    title: string;
    description: string;
    deliverable: string;
}

export const BRAND_INFO = {
    name: "KanaKoding",
    tagline: "Digitally Yours",
    quote: "Kami bantu Anda hadirkan ekosistem digital ke dalam bisnis Anda.",
    subQuote: "Jadilah bagian dari tumbuhnya industri digital Indonesia.",
    description:
        "KanaKoding adalah mitra konsultasi teknologi dan pengembangan produk digital yang dirancang untuk memberikan solusi menyeluruh berbasis Teknologi Informasi. Didukung ekosistem komunitas software developer Indonesia, kami membantu pelaku bisnis, UMKM, hingga founder startup mewujudkan produk teknologi yang berdampak.",
    email: "halo@kanakoding.com",
    whatsapp: "6281234567890",
    location: "Jakarta, Indonesia",
    socials: {
        facebook: "https://www.facebook.com/kanakoding",
        instagram: "https://www.instagram.com/kanakoding",
        github: "https://www.github.com/kanakoding",
    },
};

export const HERO_STATS = [
    { value: "4+", label: "Pilar Ekosistem Digital" },
    { value: "30+", label: "Proyek & Produk Terbangun" },
    { value: "1.5K+", label: "Anggota Komunitas Dev" },
    { value: "100%", label: "Akses Materi Belajar Gratis" },
];

export const SERVICES: ServiceItem[] = [
    {
        id: "development",
        title: "Project Development",
        badge: "CUSTOM SOFTWARE & WEB APP",
        shortDesc: "Pengembangan aplikasi web, mobile, dan sistem enterprise yang skalabel.",
        description: "Layanan pengembangan aplikasi end-to-end dengan mengedepankan kualitas arsitektur, keamanan, dan kepuasan klien. Kami merancang dan membangun website company profile, sistem informasi manajemen, e-commerce, hingga platform SaaS kustom yang siap bertumbuh bersama bisnis Anda.",
        image: "/assets/img/background1.jpg",
        deliverables: ["Custom Web Application & Dashboard Enterprise", "Mobile App Development (Android & iOS)", "Modernisasi & Retouch Website Bisnis (Company Profile)", "Integrasi API, Payment Gateway & Cloud Deployment"],
        ctaLabel: "Lihat Portofolio",
        ctaLink: "#portofolio",
        accent: "from-amber-500 to-orange-600",
    },
    {
        id: "konsultasi",
        title: "Konsultasi Aplikasi & Bisnis Digital",
        badge: "STARTUP & IT CONSULTING",
        shortDesc: "Validasi ide produk, perancangan MVP startup, dan transformasi digital.",
        description: "Dirancang khusus bagi entrepreneur dan perusahaan yang ingin membangun atau mengakselerasi bisnis berbasis digital. Kami mendampingi Anda mulai dari pemetaan masalah bisnis, pemilihan tech stack yang efisien, perancangan arsitektur sistem, hingga strategi peluncuran MVP.",
        image: "/assets/img/background2.jpg",
        deliverables: ["Product Discovery & Perancangan MVP Startup", "Audit Sistem, Performa & Arsitektur Teknis", "Roadmap Transformasi Digital Perusahaan", "Dedicated Technical Partner untuk Non-Tech Founder"],
        ctaLabel: "Jadwalkan Konsultasi",
        ctaLink: "#kontak",
        accent: "from-orange-500 to-amber-600",
    },
    {
        id: "komunitas",
        title: "Komunitas Developer",
        badge: "KOMUNITAS DEVELOPER INDONESIA",
        shortDesc: "Forum tanya jawab, kolaborasi open-source, dan jejaring developer lokal.",
        description: "Kami menghadirkan wadah interaksi antar software developer seperti Stack Exchange dalam Bahasa Indonesia. Tempat berbagi wawasan rekayasa perangkat lunak, berdiskusi memecahkan bug pemrograman bersama, serta berkolaborasi membangun produk open-source lokal.",
        image: "/assets/img/komunitas.jpg",
        deliverables: ["Forum Tanya Jawab Pemrograman Berbahasa Indonesia", "Bedah Kode (Code Review) & Sharing Arsitektur", "Kolaborasi Proyek Open-Source & Riset Teknologi", "Jejaring Talenta Engineer Seluruh Indonesia"],
        ctaLabel: "Jelajahi Artikel & Diskusi",
        ctaLink: "/blog",
        accent: "from-amber-400 to-yellow-600",
    },
    {
        id: "kursus",
        title: "E-Learning & Tutorial",
        badge: "FREE TECH EDUCATION",
        shortDesc: "E-book, seri video tutorial terstruktur, dan artikel pemrograman gratis.",
        description: "Layanan pembelajaran pemrograman daring yang disusun secara praktis dan relevan dengan kebutuhan industri. Seluruh materi mulai dari e-book, panduan langkah demi langkah, hingga artikel rekayasa perangkat lunak dapat diakses secara gratis oleh talenta muda Indonesia.",
        image: "/assets/img/background3.jpg",
        deliverables: ["Artikel & Tutorial Web Development Modern", "E-Book & Modul Praktik Fundamental Pemrograman", "Studi Kasus Pembuatan Aplikasi Dunia Nyata", "Kurikulum Berorientasi Industri 4.0"],
        ctaLabel: "Baca Tutorial di Blog",
        ctaLink: "/blog",
        accent: "from-yellow-500 to-amber-500",
    },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        id: "wannamas-multifinance",
        title: "PT. Wannamas Multi Finance — Digital Financing Portal",
        client: "PT. Wannamas Multi Finance",
        category: "FinTech & Enterprise",
        year: "2024",
        image: "/assets/img/wmf.jpg",
        summary: "Platform korporat dan simulasi pengajuan kredit interaktif untuk perusahaan pembiayaan investasi, modal kerja, dan multiguna.",
        challenge: "PT. Wannamas Multi Finance membutuhkan kanal digital yang memudahkan calon debitur menghitung estimasi angsuran secara instan sekaligus memperkuat kredibilitas korporat dan akses portal agen.",
        solution: "Membangun web portal terintegrasi dengan fitur Simulasi Pengajuan Kredit real-time (nominal Rp50 Juta s.d. Rp3 Miliar dengan pilihan tenor fleksibel), katalog produk pembiayaan, Bisnis Center, serta portal Login Agent.",
        highlights: ["Kalkulator simulasi pengajuan kredit & tenor interaktif di halaman utama", "Arsitektur informasi korporat yang jelas untuk produk pembiayaan konsumen & modal kerja", "Integrasi portal keagenan (Login Agent) dan layanan pelanggan terpadu"],
        techStack: ["Web Platform", "Financial Calculator", "Responsive UI", "Agent Portal"],
    },
    {
        id: "lelangco",
        title: "Lelang.co — Portal Marketplace Lelang Properti",
        client: "Lelang.co Indonesia",
        category: "Marketplace",
        year: "2024",
        image: "/assets/img/lelangco.jpg",
        summary: "Platform direktori dan pencarian agunan lelang properti di berbagai wilayah strategis dengan filter kategori dan jadwal lelang.",
        challenge: "Calon pembeli properti lelang sering kesulitan menemukan informasi spesifikasi aset (luas tanah, luas bangunan, status sertifikat SHM/HGB, serta jadwal lelang) yang terstruktur dan mudah dicari berdasarkan lokasi.",
        solution: "Merancang portal direktori properti Lelang.co dengan fitur pencarian pintar berdasarkan kategori lelang & lokasi, highlight properti unggulan, label status lelang (Sukarela/Eksekusi), serta detail spesifikasi aset yang transparan.",
        highlights: ["Mesin pencarian & filter properti berdasarkan kategori dan wilayah (Jakarta Pusat, Jakarta Timur, dll.)", "Kartu katalog properti informatif menampilkan Luas Tanah, Luas Bangunan, dan Sertifikat (SHM)", "Manajemen jadwal lelang dan autentikasi pengguna/peserta lelang"],
        techStack: ["Property Marketplace", "Search & Filtering", "CMS Katalog", "Responsive Web"],
    },
    {
        id: "kanakoding-hub",
        title: "KanaKoding Community & E-Learning Ecosystem",
        client: "Internal Product — KanaKoding",
        category: "Community & EdTech",
        year: "2025",
        image: "/assets/img/bg_kanakoding.png",
        summary: "Platform berbagi pengetahuan, publikasi artikel teknis, dan forum diskusi berbahasa Indonesia untuk talenta digital.",
        challenge: "Banyak developer pemula maupun menengah di Indonesia terkendala bahasa saat mencari referensi teknis mendalam dan membutuhkan ruang diskusi yang ramah serta terkurasi.",
        solution: "Mengembangkan ekosistem portal KanaKoding yang menggabungkan publikasi tutorial pemrograman, studi kasus arsitektur software, dan ruang kolaborasi komunitas developer.",
        highlights: ["Kurasi artikel teknis dan tutorial pemrograman berbahasa Indonesia", "Pendekatan belajar berbasis studi kasus proyek industri nyata", "Terbuka untuk kontribusi penulis dan praktisi teknologi lokal"],
        techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Markdown Blog"],
    },
    {
        id: "enterprise-app-suite",
        title: " Sistem Monitoring & Otomasi Operasional Bisnis",
        client: "Mitra UMKM & Korporasi",
        category: "Web Platform",
        year: "2025",
        image: "/assets/img/app-development.png",
        summary: "Solusi dashboard analitik dan digitalisasi alur kerja operasional untuk meningkatkan efisiensi tim dan akurasi pelaporan.",
        challenge: "Proses pencatatan manual dan data yang tersebar di banyak spreadsheet menghambat pengambilan keputusan cepat oleh manajemen.",
        solution: "Merancang aplikasi web kustom dengan visualisasi metrik real-time, manajemen hak akses berbasis peran (RBAC), dan pelaporan otomatis.",
        highlights: ["Visualisasi data operasional dan laporan keuangan secara real-time", "Antarmuka responsif yang nyaman diakses dari desktop maupun perangkat mobile", "Arsitektur modular yang mudah disesuaikan dengan pertumbuhan skala bisnis"],
        techStack: ["REST API", "Dashboard UI", "Role-Based Access", "Cloud Ready"],
    },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        step: "01",
        title: "Discovery & Konsultasi",
        description: "Kami mendengarkan visi bisnis Anda, memetakan kebutuhan pengguna, dan menentukan cakupan solusi teknologi yang paling tepat guna.",
        deliverable: "Product Brief & Estimasi Roadmap",
    },
    {
        step: "02",
        title: "UI/UX & Arsitektur Sistem",
        description: "Perancangan antarmuka modern yang intuitif serta desain skema database dan arsitektur aplikasi yang aman dan skalabel.",
        deliverable: "Prototipe Desain & Blueprint Teknis",
    },
    {
        step: "03",
        title: "Agile Development",
        description: "Pengembangan kode secara bertahap dan transparan dengan standar clean code, pengujian berkala, dan demo progres rutin.",
        deliverable: "Staging App & Source Code Teruji",
    },
    {
        step: "04",
        title: "Deployment & Pendampingan",
        description: "Peluncuran ke server produksi, optimasi performa/SEO, pelatihan tim internal Anda, serta dukungan pemeliharaan berkelanjutan.",
        deliverable: "Aplikasi Live & Dokumentasi Lengkap",
    },
];

export const ADSENSE_CONFIG = {
    enabled: false, // Ubah menjadi true setelah akun Google AdSense disetujui
    clientId: "ca-pub-0000000000000000", // Ganti dengan Publisher ID AdSense Anda
    slots: {
        blogTopBanner: "1111111111",
        blogInArticle: "2222222222",
        blogBottomBanner: "3333333333",
    },
};

