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
    category: "Web Platform" | "FinTech & Enterprise" | "Marketplace" | "EdTech & Portal";
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
        "KanaKoding adalah mitra konsultasi teknologi dan pengembangan produk digital yang dirancang untuk memberikan solusi menyeluruh berbasis Teknologi Informasi. Kami membantu pelaku bisnis, korporasi, UMKM, hingga founder startup mewujudkan sistem dan produk teknologi yang berdampak.",
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
    { value: "3+", label: "Pilar Layanan Utama" },
    { value: "30+", label: "Proyek & Sistem Terbangun" },
    { value: "99.9%", label: "Target Reliabilitas Sistem" },
    { value: "< 24h", label: "Respons Konsultasi Teknis" },
];

export const SERVICES: ServiceItem[] = [
    {
        id: "development",
        title: "Project Development",
        badge: "CUSTOM SOFTWARE & WEB APP",
        shortDesc: "Pengembangan aplikasi web, mobile, dan sistem enterprise yang skalabel.",
        description: "Layanan pengembangan aplikasi end-to-end dengan mengedepankan kualitas arsitektur, keamanan, dan kepuasan klien. Kami merancang dan membangun website company profile, sistem informasi manajemen, e-commerce, hingga platform SaaS kustom yang siap bertumbuh bersama bisnis Anda.",
        image: "/assets/img/background1.jpg",
        deliverables: [
            "Custom Web Application & Dashboard Enterprise",
            "Mobile App Development (Android & iOS)",
            "Modernisasi & Retouch Website Bisnis (Company Profile)",
            "Integrasi API, Payment Gateway & Cloud Deployment",
        ],
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
        deliverables: [
            "Product Discovery & Perancangan MVP Startup",
            "Audit Sistem, Performa & Arsitektur Teknis",
            "Roadmap Transformasi Digital Perusahaan",
            "Dedicated Technical Partner untuk Non-Tech Founder",
        ],
        ctaLabel: "Jadwalkan Konsultasi",
        ctaLink: "#kontak",
        accent: "from-orange-500 to-amber-600",
    },
    {
        id: "kursus",
        title: "E-Learning & Publikasi Teknis",
        badge: "TECH EDUCATION & JOURNAL",
        shortDesc: "E-book, seri panduan terstruktur, dan artikel rekayasa perangkat lunak.",
        description: "Inisiatif edukasi pemrograman dan dokumentasi rekayasa perangkat lunak yang disusun secara praktis sesuai standar industri. Seluruh materi mulai dari panduan arsitektur sistem hingga studi kasus pengembangan web modern dapat diakses melalui jurnal teknis KanaKoding.",
        image: "/assets/img/background3.jpg",
        deliverables: [
            "Artikel & Panduan Web Development Modern",
            "E-Book & Modul Praktik Fundamental Pemrograman",
            "Studi Kasus Arsitektur Aplikasi Dunia Nyata",
            "Kurikulum Berorientasi Standar Industri 4.0",
        ],
        ctaLabel: "Baca Jurnal Teknis",
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
        highlights: [
            "Kalkulator simulasi pengajuan kredit & tenor interaktif di halaman utama",
            "Arsitektur informasi korporat yang jelas untuk produk pembiayaan konsumen & modal kerja",
            "Integrasi portal keagenan (Login Agent) dan layanan pelanggan terpadu",
        ],
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
        highlights: [
            "Mesin pencarian & filter properti berdasarkan kategori dan wilayah (Jakarta Pusat, Jakarta Timur, dll.)",
            "Katalog properti informatif menampilkan Luas Tanah, Luas Bangunan, dan Sertifikat (SHM)",
            "Manajemen jadwal lelang dan autentikasi pengguna/peserta lelang",
        ],
        techStack: ["Property Marketplace", "Search & Filtering", "CMS Katalog", "Responsive Web"],
    },
    {
        id: "enterprise-app-suite",
        title: "Sistem Monitoring & Otomasi Operasional Bisnis",
        client: "Mitra UMKM & Korporasi",
        category: "Web Platform",
        year: "2025",
        image: "/assets/img/app-development.png",
        summary: "Solusi dashboard analitik dan digitalisasi alur kerja operasional untuk meningkatkan efisiensi tim dan akurasi pelaporan.",
        challenge: "Proses pencatatan manual dan data yang tersebar di banyak spreadsheet menghambat pengambilan keputusan cepat oleh manajemen.",
        solution: "Merancang aplikasi web kustom dengan visualisasi metrik real-time, manajemen hak akses berbasis peran (RBAC), dan pelaporan otomatis.",
        highlights: [
            "Visualisasi data operasional dan laporan keuangan secara real-time",
            "Antarmuka responsif yang nyaman diakses dari desktop maupun perangkat mobile",
            "Arsitektur modular yang mudah disesuaikan dengan pertumbuhan skala bisnis",
        ],
        techStack: ["REST API", "Dashboard UI", "Role-Based Access", "Cloud Ready"],
    },
    {
        id: "kanakoding-hub",
        title: "KanaKoding Digital Knowledge & E-Learning Portal",
        client: "Internal Product — KanaKoding",
        category: "EdTech & Portal",
        year: "2025",
        image: "/assets/img/bg_kanakoding.png",
        summary: "Portal publikasi dokumentasi rekayasa perangkat lunak, artikel arsitektur sistem, dan modul pembelajaran pemrograman terstruktur.",
        challenge: "Kebutuhan akan referensi teknis berbahasa Indonesia yang membahas studi kasus arsitektur aplikasi produksi secara mendalam dan mudah dipahami.",
        solution: "Mengembangkan portal publikasi teknis KanaKoding dengan arsitektur SPA modern yang cepat, dilengkapi mesin pencari artikel, daftar isi otomatis, dan optimasi SEO/JSON-LD.",
        highlights: [
            "Kurasi artikel teknis dan panduan rekayasa perangkat lunak berbahasa Indonesia",
            "Pendekatan materi berbasis studi kasus proyek industri nyata",
            "Performa baca cepat dengan struktur navigasi yang bersih",
        ],
        techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Markdown Engine"],
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
    enabled: false,
    clientId: "ca-pub-0000000000000000",
    slots: {
        blogTopBanner: "1111111111",
        blogInArticle: "2222222222",
        blogBottomBanner: "3333333333",
    },
};
