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
    quote: "Teknologi yang baik itu bukan yang paling rumit, tapi yang paling memudahkan hidup penggunanya.",
    subQuote: "Teman seperjalanan digital untuk bisnis dan ide-ide baru Anda.",
    description:
        "KanaKoding adalah studio pengembangan produk digital dan teman diskusi teknologi. Kami meracik website, aplikasi, serta integrasi API (merchant, pembayaran, sosial media) dengan bantuan optimasi AI agar proses delivery jauh lebih cepat dan kualitasnya terjaga.",
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
    { value: "30+", label: "Karya & Produk Rilis" },
    { value: "AI-Assisted", label: "Delivery Cepat & Presisi" },
    { value: "API Ready", label: "Payment, Merchant & Sosmed" },
    { value: "< 24 Jam", label: "Balas Obrolan Anda" },
];

export const SERVICES: ServiceItem[] = [
    {
        id: "development",
        title: "Bikin Website & Aplikasi",
        badge: "WEB & APP CRAFTING",
        shortDesc: "Dari web profil yang estetik sampai aplikasi operasional, dipercepat dengan workflow AI.",
        description: "Punya bisnis yang butuh rumah digital baru, atau operasional kantor yang masih serba manual? Kami bantu buatkan website company profile yang berkarakter, dashboard kerja, hingga aplikasi mobile—menggunakan alur kerja berbantuan AI untuk mempercepat delivery dan menjaga kualitas kode tetap rapi.",
        image: "/assets/img/background1.jpg",
        deliverables: [
            "Website Company Profile & Brand Showcase yang segar",
            "Aplikasi Web & Dashboard Operasional yang gampang dipakai",
            "Optimasi AI untuk pengujian kualitas & kecepatan rilis (Delivery)",
            "Peremajaan (Retouch) website lama biar tampil kekinian & cepat",
        ],
        ctaLabel: "Lihat Karya Kami",
        ctaLink: "#portofolio",
        accent: "from-amber-500 to-orange-600",
    },
    {
        id: "integrasi",
        title: "Integrasi API & Pembayaran",
        badge: "THIRD-PARTY API INTEGRATION",
        shortDesc: "Hubungkan aplikasi Anda dengan sistem merchant, payment gateway, hingga sosial media.",
        description: "Biar bisnis jalan otomatis tanpa pindah-pindah aplikasi. Kami melayani penyambungan (integrasi) API pihak ketiga ke sistem Anda—mulai dari pembayaran otomatis (QRIS, Virtual Account, E-Wallet), sinkronisasi sistem kasir/merchant & logistik, hingga fitur login dan otomasi sosial media.",
        image: "/assets/img/app-development.png",
        deliverables: [
            "Integrasi Payment Gateway (QRIS, Virtual Account, E-Wallet, Kartu Kredit)",
            "Koneksi API Merchant, POS, Marketplace & Ekspedisi Pengiriman",
            "Integrasi API Sosial Media (Instagram, WhatsApp Business, Meta, OAuth Login)",
            "Sinkronisasi Webhook aman & pantauan transaksi real-time",
        ],
        ctaLabel: "Tanya Soal Integrasi",
        ctaLink: "#kontak",
        accent: "from-amber-500 to-orange-500",
    },
    {
        id: "konsultasi",
        title: "Teman Diskusi Produk & MVP",
        badge: "PRODUCT SPARRING PARTNER",
        shortDesc: "Punya ide aplikasi tapi bingung mulai dari mana? Kita bedah bareng-bareng.",
        description: "Nggak semua orang harus paham bahasa pemrograman untuk mulai bikin produk digital. Ceritakan saja ide kasar Anda—kami bantu pilihkan fitur yang paling penting buat rilis pertama (MVP), atur anggaran teknologi yang masuk akal, dan dampingi sampai produknya jalan.",
        image: "/assets/img/background2.jpg",
        deliverables: [
            "Sesi bedah ide & pemetaan alur produk (Product Discovery)",
            "Perancangan prototipe & versi awal produk (Startup MVP)",
            "Rekomendasi teknologi & pemanfaatan AI yang tepat sasaran",
            "Review kesehatan aplikasi yang sudah berjalan",
        ],
        ctaLabel: "Ngobrol Dulu Yuk",
        ctaLink: "#kontak",
        accent: "from-orange-500 to-amber-600",
    },
    {
        id: "kursus",
        title: "Catatan & Ruang Belajar",
        badge: "NOTES & TECH JOURNAL",
        shortDesc: "Tempat kami berbagi cerita di balik layar, catatan ngoding, dan panduan praktis.",
        description: "Kami senang menulis apa yang kami pelajari sehari-hari saat meracik produk digital. Mulai dari tips mendesain antarmuka yang bersih, cara merapikan kode, sampai cerita studi kasus—semuanya kami bagikan secara terbuka lewat jurnal dan e-book singkat.",
        image: "/assets/img/background3.jpg",
        deliverables: [
            "Artikel ringan seputar pembuatan produk & desain web",
            "Panduan langkah demi langkah untuk pemula & praktisi",
            "Cerita di balik layar pembuatan proyek nyata",
            "E-Book & catatan praktis yang bisa dibaca kapan saja",
        ],
        ctaLabel: "Baca Catatan Kami",
        ctaLink: "/blog",
        accent: "from-yellow-500 to-amber-500",
    },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        id: "wannamas-multifinance",
        title: "Wannamas Multi Finance — Portal Simulasi Pembiayaan",
        client: "PT. Wannamas Multi Finance",
        category: "FinTech & Enterprise",
        year: "2024",
        image: "/assets/img/wmf.jpg",
        summary: "Membantu calon nasabah menghitung simulasi cicilan dengan cepat lewat tampilan web yang ramah dan transparan.",
        challenge: "Banyak calon nasabah merasa ragu atau bingung saat ingin mengajukan pembiayaan karena harus bertanya manual untuk tahu estimasi cicilan bulanan mereka.",
        solution: "Kami merancang ulang wajah digital Wannamas dengan menghadirkan kalkulator simulasi kredit interaktif langsung di halaman depan, lengkap dengan informasi produk yang jernih dan akses khusus untuk para agen.",
        highlights: [
            "Kalkulator simulasi cicilan instan yang langsung bisa dicoba pengunjung",
            "Penyajian informasi produk pembiayaan yang ringkas dan mudah dipahami",
            "Akses portal terpadu untuk memudahkan kerja tim agen di lapangan",
        ],
        techStack: ["Web Platform", "Interactive Calculator", "Clean UI", "Agent Portal"],
    },
    {
        id: "lelangco",
        title: "Lelang.co — Katalog & Pencarian Lelang Properti",
        client: "Lelang.co Indonesia",
        category: "Marketplace",
        year: "2024",
        image: "/assets/img/lelangco.jpg",
        summary: "Memudahkan pencari properti menemukan rumah atau aset lelang idaman tanpa harus pusing membuka ratusan dokumen.",
        challenge: "Mencari properti lelang sering kali terasa melelahkan karena info lokasi, luas tanah, status sertifikat, dan jadwal lelang tersebar dan sulit difilter.",
        solution: "Kami membangun portal direktori Lelang.co yang bersih dan intuitif—pengunjung tinggal pilih lokasi atau kategori, lalu semua detail penting seperti Luas Tanah, Bangunan, dan status SHM langsung terlihat rapi.",
        highlights: [
            "Pencarian properti yang praktis berdasarkan wilayah dan kategori aset",
            "Tampilan kartu properti yang jujur dan informatif (LT/LB, Sertifikat, Jadwal)",
            "Alur pendaftaran peserta lelang yang lebih sederhana",
        ],
        techStack: ["Property Directory", "Smart Filter", "CMS Katalog", "Responsive Web"],
    },
    {
        id: "enterprise-app-suite",
        title: "Workspace Operasional & Integrasi Merchant",
        client: "Mitra Bisnis & UMKM",
        category: "Web Platform",
        year: "2025",
        image: "/assets/img/app-development.png",
        summary: "Mengubah tumpukan spreadsheet harian menjadi satu dashboard kerja yang terhubung dengan transaksi merchant dan pembayaran.",
        challenge: "Tim operasional sering menghabiskan waktu berjam-jam hanya untuk mencocokkan laporan penjualan, status pembayaran, dan stok dari berbagai kanal yang terpisah.",
        solution: "Kami meracik aplikasi dashboard internal yang menyatukan pencatatan harian, integrasi API pembayaran/merchant, dan pembagian tugas tim dalam satu layar yang simpel.",
        highlights: [
            "Sinkronisasi data transaksi dan pembayaran secara otomatis lewat API",
            "Nyaman dibuka dari laptop kantor maupun sambil jalan lewat smartphone",
            "Dirancang fleksibel mengikuti kebiasaan kerja tim sehari-hari",
        ],
        techStack: ["Web App", "API Integration", "Payment & Merchant", "Cloud Ready"],
    },
    {
        id: "kanakoding-hub",
        title: "KanaKoding Journal & Ruang Baca Digital",
        client: "Inisiatif Internal KanaKoding",
        category: "EdTech & Portal",
        year: "2025",
        image: "/assets/img/bg_kanakoding.png",
        summary: "Ruang baca yang tenang dan bebas distraksi untuk berbagi catatan seputar desain, kode, dan pembuatan produk.",
        challenge: "Kami ingin punya rumah sendiri untuk mendokumentasikan hal-hal seru yang kami temukan saat mengerjakan proyek, dengan tampilan yang nyaman dibaca berlama-lama.",
        solution: "Kami membangun halaman jurnal ini dengan tipografi yang hangat, waktu muat instan, dan daftar isi otomatis supaya pembaca bisa langsung fokus ke isi cerita.",
        highlights: [
            "Desain ruang baca yang bersih, hangat, dan ramah di mata",
            "Artikel berdasarkan pengalaman nyata meracik produk dari nol",
            "Pencarian topik instan dan navigasi bab yang mulus",
        ],
        techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Markdown"],
    },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        step: "01",
        title: "Kenalan & Dengerin Cerita",
        description: "Kita mulai dari obrolan santai. Ceritakan apa yang sedang Anda bangun, siapa penggunanya, dan bagian mana yang paling butuh dibantu.",
        deliverable: "Rangkuman Ide & Rencana Kerja",
    },
    {
        step: "02",
        title: "Sketsa & Rancang Tampilan",
        description: "Sebelum mulai ngoding, kami buatkan gambaran alur dan desain tampilannya dulu. Jadi Anda bisa melihat dan merasakan bentuk produknya sejak awal.",
        deliverable: "Desain Visual & Prototipe Interaktif",
    },
    {
        step: "03",
        title: "Racik Cepat dengan Bantuan AI",
        description: "Tim kami membangun aplikasi sekaligus menyambungkan API pihak ketiga (pembayaran, merchant, sosial media) dengan dukungan AI untuk optimasi kecepatan delivery dan pengecekan kualitas kode berlapis.",
        deliverable: "Link Preview & Aplikasi Teruji",
    },
    {
        step: "04",
        title: "Rilis & Jalan Bareng",
        description: "Saat semuanya sudah pas dan siap pakai, kita luncurkan bareng. Setelah rilis pun kami tetap siap dihubungi kalau Anda butuh bantuan.",
        deliverable: "Produk Siap Pakai & Panduan Singkat",
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
