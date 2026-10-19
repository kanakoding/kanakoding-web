import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Coffee,
  ExternalLink,
  Mail,
  Send,
  BookOpen,
  Calendar,
  Clock,
} from 'lucide-react';
import {
  BRAND_INFO,
  HERO_STATS,
  PORTFOLIO_ITEMS,
  PortfolioItem,
  SERVICES,
  WORKFLOW_STEPS,
} from '../data/siteData';
import { BLOG_POSTS } from '../data/blogData';
import { PortfolioModal } from '../components/PortfolioModal';
import {
  HeroStudioIllustration,
  ServiceIllustration,
} from '../components/StudioIllustrations';
import { smoothScrollToElement } from '../utils/smoothScroll';
import { updatePageSeo } from '../utils/seo';

export const HomePage: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTopic, setFormTopic] = useState('Bikin Website / Aplikasi');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    updatePageSeo({
      title: `${BRAND_INFO.name} — ${BRAND_INFO.tagline} | Studio Produk Digital & Web`,
      description: BRAND_INFO.description,
      canonicalPath: '/',
      ogType: 'website',
    });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        smoothScrollToElement(id, 850);
      }, 120);
    }
  }, [location.hash]);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  const portfolioCategories = [
    'Semua',
    ...Array.from(new Set(PORTFOLIO_ITEMS.map((item) => item.category))),
  ];

  const filteredPortfolio =
    activePortfolioCategory === 'Semua'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activePortfolioCategory);

  const handleInquireFromPortfolio = (projectTitle: string) => {
    setFormTopic('Bikin Website / Aplikasi');
    setFormMessage(
      `Halo Tim KanaKoding! Saya tertarik ngobrol soal pembuatan produk seperti "${projectTitle}" untuk kebutuhan kami.`
    );
    smoothScrollToElement('kontak', 850);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB]">
      <section
        id="beranda"
        className="relative min-h-[88dvh] flex items-center pt-28 pb-20 overflow-hidden border-b border-white/10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/assets/img/bg-kk.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0704]/90 via-[#120804]/95 to-[#0F0704]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[8px] bg-[#1A0D07] border border-white/10 text-xs text-amber-300">
                <span className="w-2 h-2 rounded-[8px] bg-amber-400" />
                <span>{BRAND_INFO.name} — {BRAND_INFO.tagline}</span>
              </div>

              <h1 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1]">
                Punya ide produk digital?{' '}
                <span className="text-amber-400">Kita bangun bareng</span> sampai rilis.
              </h1>

              <p className="text-base sm:text-lg text-[#D5C7B8] leading-relaxed max-w-xl">
                Dari obrolan sketsa di meja kopi sampai aplikasi yang siap dipakai ribuan
                orang. Kami bantu wujudkan website, aplikasi, dan integrasi API pihak ketiga
                dengan sentuhan personal serta dukungan AI agar delivery lebih cepat dan
                kualitasnya terjaga.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('portofolio', 850)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <span>Lihat Karya Kami</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('kontak', 850)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-sm font-semibold bg-[#180C06] hover:bg-[#221109] text-[#F7F1EB] border border-white/15 transition-colors cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Ngobrol Dulu Yuk</span>
                </button>
              </div>

              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl sm:text-2xl font-bold font-display text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#B5A392] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[8px] bg-[#160B06] border border-white/12 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[8px] bg-[#F7F1EB] p-1.5 flex items-center justify-center">
                      <img
                        src="/assets/img/logo.png"
                        alt="KanaKoding"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">KanaKoding Studio</div>
                      <div className="text-xs text-amber-400">{BRAND_INFO.tagline}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#B5A392] px-2.5 py-1 rounded-[8px] bg-[#211009] border border-white/10">
                    Jakarta, ID
                  </span>
                </div>

                <div className="rounded-[8px] bg-[#120804] border border-white/10 p-3">
                  <HeroStudioIllustration className="w-full h-auto" />
                </div>

                <div className="space-y-3 pt-1">
                  <p className="text-sm text-[#D5C7B8] leading-relaxed">
                    &ldquo;{BRAND_INFO.quote}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#B5A392]">
                      Terbaru: <strong className="text-white">Wannamas &amp; Lelang.co</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => smoothScrollToElement('portofolio', 850)}
                      className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <span>Intip Proyek</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-[8px] overflow-hidden border border-white/12 bg-[#160B06]">
                <img
                  src="/assets/img/background4.jpg"
                  alt="Suasana Kerja KanaKoding"
                  className="w-full h-[320px] object-cover"
                />
                <div className="p-5 border-t border-white/10 space-y-1">
                  <div className="text-xs font-mono text-amber-400">
                    Cerita Singkat Kami
                  </div>
                  <p className="text-sm text-[#E5D9CE] leading-relaxed">
                    Sentuhan manusia yang hangat, dipercepat dengan bantuan teknologi AI modern.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Kenalan Lebih Dekat
              </div>

              <h2 className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold text-white leading-tight">
                Teman Seperjalanan Digital yang Ngerti Bahasa Manusia.
              </h2>

              <p className="text-[#D5C7B8] text-base leading-relaxed">
                Kami sadar, membangun website atau aplikasi sering kali terasa membingungkan
                karena banyaknya istilah teknis. Di <strong className="text-white">KanaKoding</strong>,
                kami mulai semuanya dari mendengar cerita Anda, lalu meracik solusinya dengan
                desain yang simpel dan jujur.
              </p>

              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Di dapur kerja, kami juga menggunakan <strong className="text-amber-300">AI untuk optimasi kecepatan delivery dan kualitas kode</strong>,
                serta siap menyambungkan aplikasi Anda ke berbagai layanan pihak ketiga seperti{' '}
                <strong className="text-white">merchant, sistem pembayaran, hingga sosial media</strong>.
              </p>

              <div className="pt-4 border-y border-white/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                <div className="py-4 sm:pr-5">
                  <div className="text-amber-400 font-mono text-xs">01</div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Komunikasi Nyambung
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Tanpa jargon yang bikin kening berkerut. Semua opsi kami jelaskan dengan
                    bahasa yang jernih.
                  </p>
                </div>
                <div className="py-4 sm:px-5">
                  <div className="text-amber-400 font-mono text-xs">02</div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Optimasi AI &amp; Kualitas
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Kami memanfaatkan AI untuk mempercepat waktu pengerjaan (delivery) dan
                    memastikan kode lebih teruji.
                  </p>
                </div>
                <div className="py-4 sm:pl-5">
                  <div className="text-amber-400 font-mono text-xs">03</div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Siap Integrasi API
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Mudah disambungkan ke payment gateway, sistem merchant/POS, hingga kanal
                    sosial media Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="py-24 bg-[#130905] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Layanan Kami
            </div>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold text-white leading-tight">
              Apa yang Bisa Kita Kerjakan Bareng?
            </h2>
            <p className="text-[#C7B6A6] text-base">
              Mulai dari bikin produk dari nol, menyambungkan API pembayaran &amp; merchant,
              hingga merapikan sistem yang sudah berjalan.
            </p>
          </div>

          <div className="rounded-[8px] border border-white/12 bg-[#170C07] overflow-hidden">
            <div
              role="tablist"
              aria-label="Layanan KanaKoding"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-[#120804]"
            >
              {SERVICES.map((service, index) => {
                const isActive = service.id === activeService.id;
                return (
                  <button
                    key={service.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`p-4 sm:p-5 text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#211009] text-white'
                        : 'text-[#C7B6A6] hover:bg-[#190C06] hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-amber-400 mb-1 truncate">
                      0{index + 1} — {service.badge}
                    </div>
                    <div className="text-sm sm:text-base font-bold">{service.title}</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#140904] flex flex-col justify-between space-y-6">
                <div className="rounded-[8px] bg-[#190C06] border border-white/10 p-4 flex items-center justify-center">
                  <ServiceIllustration id={activeService.id} className="w-full max-w-[260px] h-auto" />
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-amber-400">
                    {activeService.badge}
                  </div>
                  <p className="text-xs sm:text-sm text-[#C7B6A6] leading-relaxed">
                    {activeService.shortDesc}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeService.title}
                  </h3>
                  <p className="text-[#D5C7B8] leading-relaxed text-base">
                    {activeService.description}
                  </p>
                </div>

                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {activeService.deliverables.map((item) => (
                    <li
                      key={item}
                      className="py-3 flex items-center justify-between gap-4 text-sm text-[#E5D9CE]"
                    >
                      <span>{item}</span>
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#B5A392]">
                    Punya kebutuhan integrasi atau fitur khusus? Ceritakan saja dulu.
                  </span>
                  {activeService.ctaLink.startsWith('/') ? (
                    <Link
                      to={activeService.ctaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        smoothScrollToElement(
                          activeService.ctaLink.replace('#', ''),
                          850
                        )
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 rounded-[8px] border border-white/10 bg-[#160B06] divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="text-xs font-mono text-amber-400">
                AI-OPTIMIZED DELIVERY
              </div>
              <h3 className="text-base font-bold text-white">
                Rilis Lebih Cepat &amp; Terjaga
              </h3>
              <p className="text-xs sm:text-sm text-[#C7B6A6] leading-relaxed">
                Kami menggunakan AI untuk membantu pengecekan kualitas kode, mempercepat
                iterasi fitur, dan memangkas waktu tunggu pengerjaan.
              </p>
            </div>
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="text-xs font-mono text-amber-400">
                PAYMENT &amp; MERCHANT API
              </div>
              <h3 className="text-base font-bold text-white">
                Transaksi &amp; Kasir Otomatis
              </h3>
              <p className="text-xs sm:text-sm text-[#C7B6A6] leading-relaxed">
                Integrasi langsung dengan QRIS, Virtual Account, E-Wallet, sistem POS merchant,
                marketplace, hingga ekspedisi pengiriman.
              </p>
            </div>
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="text-xs font-mono text-amber-400">
                SOCIAL MEDIA &amp; OAUTH API
              </div>
              <h3 className="text-base font-bold text-white">
                Terhubung ke Kanal Sosial
              </h3>
              <p className="text-xs sm:text-sm text-[#C7B6A6] leading-relaxed">
                Koneksi API ke WhatsApp Business, Instagram, Meta, serta kemudahan login satu
                klik (Google/Social Login) untuk pengguna Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portofolio" className="py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Karya Pilihan
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold text-white leading-tight">
                Cerita di Balik Produk yang Pernah Kami Buat.
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Setiap proyek punya tantangannya sendiri. Klik pada proyek untuk membaca
                cerita lengkap di balik pembuatannya.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivePortfolioCategory(cat)}
                  className={`px-3.5 py-2 rounded-[8px] text-xs font-medium transition-colors cursor-pointer ${
                    activePortfolioCategory === cat
                      ? 'bg-amber-500 text-[#1A0B05] font-bold'
                      : 'bg-[#180C06] text-[#C7B6A6] border border-white/10 hover:border-amber-500/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/12 divide-y divide-white/12">
            {filteredPortfolio.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="py-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
              >
                <div className="lg:col-span-5 overflow-hidden rounded-[8px] border border-white/12 bg-[#0E0603] h-56 sm:h-64 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B5A392]">
                    <span>
                      0{idx + 1} · {item.client}
                    </span>
                    <span className="text-amber-400">{item.year}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#C7B6A6] leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-[#180C06] text-[#D5C7B8] border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                      <span>Baca Ceritanya</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
            <span className="text-sm text-[#B5A392]">
              Ingin melihat detail lengkap semua proyek?
            </span>
            <Link
              to="/portofolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-[#180C06] hover:bg-[#221109] text-amber-300 border border-white/15 transition-colors"
            >
              <span>Halaman Portofolio Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="proses" className="py-24 bg-[#130905] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Alur Kolaborasi
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-white leading-tight">
                Cara Kerja yang Simpel, Tanpa Drama.
              </h2>
              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Kami percaya hasil yang bagus lahir dari proses kerja yang tenang, terbuka,
                dan saling percaya sejak obrolan pertama.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('kontak', 850)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <span>Mulai dari Langkah 01</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 border-y border-white/12 divide-y divide-white/12">
              {WORKFLOW_STEPS.map((wf) => (
                <div
                  key={wf.step}
                  className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                >
                  <div className="sm:col-span-2">
                    <span className="text-xl font-bold font-mono text-amber-400">
                      {wf.step}
                    </span>
                  </div>
                  <div className="sm:col-span-10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {wf.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-[#1C0E07] text-amber-300 border border-white/10">
                        {wf.deliverable}
                      </span>
                    </div>
                    <p className="text-sm text-[#C7B6A6] leading-relaxed">
                      {wf.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="artikel" className="py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Catatan Studio</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold text-white leading-tight">
                Cerita, Insight &amp; Catatan Terbaru.
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Tulisan ringan seputar pembuatan produk digital, desain antarmuka, dan
                pengalaman kami meracik teknologi.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors shrink-0"
            >
              <span>Baca Semua Catatan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border border-white/12 rounded-[8px] divide-y lg:divide-y-0 lg:divide-x divide-white/12 bg-[#150A05] overflow-hidden">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col justify-between hover:bg-[#1B0D07] transition-colors"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#0E0603] border-b border-white/10">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#A89482]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#C7B6A6] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#B5A392]">{post.category}</span>
                  <span className="font-semibold text-amber-400 inline-flex items-center gap-1">
                    Baca <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="py-24 bg-[#120804]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Mari Menyapa
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-white leading-tight">
                Punya Rencana Seru? Yuk, Ngobrol Santai.
              </h2>
              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Entah itu ide aplikasi yang baru ditulis di catatan HP atau website lama yang
                butuh suasana baru—ceritakan saja dulu ke kami. Nggak ada komitmen apa-apa
                untuk sekadar bertanya.
              </p>

              <div className="p-6 rounded-[8px] bg-[#170C07] border border-white/12 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-[8px] bg-[#F7F1EB] p-2 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/img/logo.png"
                      alt="KanaKoding"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {BRAND_INFO.name} — {BRAND_INFO.tagline}
                    </div>
                    <div className="text-xs text-[#C7B6A6] mt-0.5">
                      {BRAND_INFO.subQuote}
                    </div>
                  </div>
                </div>

                <dl className="pt-4 border-t border-white/10 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[#B5A392]">Sapa lewat Email</dt>
                    <dd>
                      <a
                        href={`mailto:${BRAND_INFO.email}`}
                        className="font-mono text-amber-300 hover:underline"
                      >
                        {BRAND_INFO.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[#B5A392]">Biasa Membalas</dt>
                    <dd className="text-white font-medium">Di hari yang sama (&lt; 24 jam)</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-[8px] bg-[#170C07] border border-white/12">
                {formSubmitted ? (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-12 h-12 rounded-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-white">
                        Siap, Pesan Anda Sudah Rapi!
                      </h3>
                      <p className="text-sm text-[#C7B6A6]">
                        Terima kasih, <strong className="text-white">{formName}</strong>.
                        Tinggal klik tombol di bawah untuk langsung mengirimkannya lewat email
                        Anda:
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                          `[${formTopic}] Halo dari ${formName}`
                        )}&body=${encodeURIComponent(
                          `Halo Tim KanaKoding,\n\nKenalkan saya ${formName} (${formEmail}).\nTopik: ${formTopic}\n\nCerita singkat:\n${formMessage}`
                        )}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Kirim Lewat Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormName('');
                          setFormEmail('');
                          setFormMessage('');
                        }}
                        className="px-4 py-3 rounded-[8px] text-sm font-medium bg-[#120804] hover:bg-[#221109] text-[#E5D9CE] border border-white/15 cursor-pointer"
                      >
                        Tulis Ulang
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-[#D5C7B8] mb-2"
                        >
                          Nama Panggilan / Lengkap *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Misal: Budi atau Tim Kopi Senja"
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-[#D5C7B8] mb-2"
                        >
                          Alamat Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="budi@email.com"
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-medium text-[#D5C7B8] mb-2"
                      >
                        Lagi pengen ngobrolin apa?
                      </label>
                      <select
                        id="contact-topic"
                        value={formTopic}
                        onChange={(e) => setFormTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Bikin Website / Aplikasi">
                          Bikin Website atau Aplikasi Baru
                        </option>
                        <option value="Integrasi API (Merchant, Payment, Sosmed)">
                          Integrasi API (Merchant, Pembayaran &amp; Sosial Media)
                        </option>
                        <option value="Diskusi Ide Produk / MVP">
                          Diskusi Ide Produk &amp; MVP Startup
                        </option>
                        <option value="Retouch / Peremajaan Web">
                          Peremajaan (Retouch) Website Lama
                        </option>
                        <option value="Lainnya">Ngobrol Santai / Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-[#D5C7B8] mb-2"
                      >
                        Ceritakan sedikit rencana Anda *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Tulis santai saja—apa yang sedang ingin Anda buat dan kira-kira kapan ingin mulai jalan..."
                        className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Cerita Anda</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromPortfolio}
      />
    </div>
  );
};
