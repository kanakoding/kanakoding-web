import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Users,
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

export const HomePage: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTopic, setFormTopic] = useState('Project Development');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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
    setFormTopic('Project Development');
    setFormMessage(
      `Halo Tim KanaKoding, saya tertarik mendiskusikan pembuatan aplikasi/website serupa "${projectTitle}" untuk bisnis kami.`
    );
    const el = document.getElementById('kontak');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;
    setFormSubmitted(true);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'development':
        return <Cpu className="w-5 h-5" />;
      case 'konsultasi':
        return <Compass className="w-5 h-5" />;
      case 'komunitas':
        return <Users className="w-5 h-5" />;
      case 'kursus':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden border-b border-amber-500/15">
        {/* KanaKoding Signature Pattern Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: "url('/assets/img/bg-kk.jpg')" }}
        />
        {/* Layered Espresso & Warm Amber Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0704]/85 via-[#160A05]/88 to-[#0F0704]" />
        <div className="pointer-events-none absolute top-1/4 -left-24 w-96 h-96 bg-amber-500/15 rounded-[8px] blur-[130px]" />
        <div className="pointer-events-none absolute bottom-10 right-0 w-[460px] h-[460px] bg-orange-600/10 rounded-[8px] blur-[140px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>SOFTWARE HOUSE • IT CONSULTING • DEVELOPER ECOSYSTEM</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Wujudkan Ekosistem{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Produk Digital
                </span>{' '}
                untuk Bisnis & Startup Anda.
              </h1>

              <p className="text-base sm:text-lg text-[#D5C7B8] leading-relaxed max-w-2xl">
                <strong className="text-white">KanaKoding</strong> —{' '}
                <em className="text-amber-300 not-italic font-medium">Your Digital Partner</em>.
                Kami merancang aplikasi web & mobile berkualitas industri, mendampingi validasi
                MVP startup, serta menggerakkan komunitas dan edukasi pemrograman terbuka di
                Indonesia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#portofolio"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all shadow-xl shadow-amber-500/20"
                >
                  <span>Eksplorasi Portofolio</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-sm font-semibold bg-white/5 hover:bg-white/10 text-[#F7F1EB] border border-white/15 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Konsultasi Gratis</span>
                </a>
              </div>

              {/* Stats Strip */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold font-display text-amber-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#B5A392]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Visual: KanaKoding Brand & Interactive Code Blueprint */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[8px] bg-[#180C06]/90 border border-amber-500/25 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Terminal Window Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#221109] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-[8px] bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-[8px] bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-[8px] bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-[#A89482]">
                    kanakoding.config.ts
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[8px] bg-amber-500/20 text-amber-300">
                    v2.0
                  </span>
                </div>

                {/* Brand Visual Banner */}
                <div className="relative p-6 pb-5 border-b border-white/10 bg-gradient-to-br from-[#231109] to-[#140904] flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[8px] bg-[#F7F1EB] p-2.5 shrink-0 shadow-lg flex items-center justify-center">
                    <img
                      src="/assets/img/logo.png"
                      alt="Logo KanaKoding"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                      Digital Partner & Ecosystem
                    </div>
                    <h2 className="text-xl font-bold text-white mt-0.5">
                      KanaKoding Studio
                    </h2>
                    <p className="text-xs text-[#C7B6A6] mt-1">
                      Menghubungkan rekayasa perangkat lunak modern dengan pertumbuhan bisnis.
                    </p>
                  </div>
                </div>

                {/* Code Block */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#E5D9CE] space-y-2 bg-[#120804]/70">
                  <div>
                    <span className="text-amber-400">const</span>{' '}
                    <span className="text-orange-300">kanakoding</span> = {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-[#A89482]">fokus:</span>{' '}
                    <span className="text-emerald-400">&apos;Solusi IT &amp; Produk Digital&apos;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#A89482]">layanan:</span> [
                    <span className="text-amber-300">&apos;Web &amp; Mobile App&apos;</span>,{' '}
                    <span className="text-amber-300">&apos;Startup Consulting&apos;</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-[#A89482]">ekosistem:</span> [
                    <span className="text-sky-300">&apos;Komunitas Dev&apos;</span>,{' '}
                    <span className="text-sky-300">&apos;E-Learning Gratis&apos;</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-[#A89482]">misi:</span>{' '}
                    <span className="text-emerald-400">
                      &apos;Menuju Indonesia Industri 4.0&apos;
                    </span>
                  </div>
                  <div>{'}'};</div>
                </div>

                {/* Quick Links Footer inside Hero Card */}
                <div className="px-5 py-3.5 bg-[#1C0E07] border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#B5A392]">Siap berkolaborasi dengan tim kami?</span>
                  <Link
                    to="/portofolio"
                    className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <span>Lihat Karya</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TENTANG KAMI (ABOUT SECTION) ================= */}
      <section id="tentang" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Collage with Real Assets */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[8px] overflow-hidden border border-amber-500/20 shadow-2xl">
                <img
                  src="/assets/img/background4.jpg"
                  alt="Tim Developer KanaKoding"
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120804] via-[#120804]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-[8px] bg-[#180C06]/90 backdrop-blur-md border border-amber-500/25">
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                    Visi Ekosistem Kami
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-white italic">
                    &ldquo;{BRAND_INFO.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* About Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Tentang KanaKoding</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Mitra Konsultasi Teknologi &amp; Rumah Kolaborasi Developer Indonesia
              </h2>

              <p className="text-[#D5C7B8] text-base leading-relaxed">
                <strong className="text-white">KanaKoding</strong> dirancang untuk memberikan
                solusi di berbagai aspek bisnis melalui pendekatan Teknologi Informasi yang
                aplikatif. Kami memadukan kapabilitas{' '}
                <strong className="text-amber-300">Software House &amp; Konsultan IT</strong>{' '}
                dengan semangat berbagi melalui forum tanya jawab, tutorial teknis, dan
                e-learning terbuka.
              </p>

              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Bagi para <strong className="text-white">entrepreneur, UMKM, dan perintis startup</strong>,
                kami membantu menerjemahkan ide bisnis Anda menjadi produk digital yang siap
                dipasarkan—didukung oleh jaringan talenta dari komunitas software developer
                Indonesia.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-[8px] bg-[#180C06] border border-white/10">
                  <div className="text-amber-400 font-mono text-xs font-semibold mb-1">
                    01 // SOLUTIF
                  </div>
                  <div className="text-sm font-bold text-white">Berorientasi Bisnis</div>
                  <p className="text-xs text-[#B5A392] mt-1">
                    Teknologi yang dirancang untuk menjawab target operasional &amp; konversi.
                  </p>
                </div>
                <div className="p-4 rounded-[8px] bg-[#180C06] border border-white/10">
                  <div className="text-amber-400 font-mono text-xs font-semibold mb-1">
                    02 // KOLABORATIF
                  </div>
                  <div className="text-sm font-bold text-white">Dukungan Komunitas</div>
                  <p className="text-xs text-[#B5A392] mt-1">
                    Didukung ekosistem talenta engineer dan budaya berbagi ilmu terbuka.
                  </p>
                </div>
                <div className="p-4 rounded-[8px] bg-[#180C06] border border-white/10">
                  <div className="text-amber-400 font-mono text-xs font-semibold mb-1">
                    03 // MODERN
                  </div>
                  <div className="text-sm font-bold text-white">Standar Industri 4.0</div>
                  <p className="text-xs text-[#B5A392] mt-1">
                    Arsitektur kode yang bersih, cepat, responsif, dan mudah dikembangkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LAYANAN KAMI (INTERACTIVE SERVICES) ================= */}
      <section
        id="layanan"
        className="py-24 bg-[#140904] border-y border-amber-500/15 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span>Layanan &amp; Pilar Ekosistem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Solusi End-to-End dari Pengembangan Produk hingga Edukasi Talenta
            </h2>
            <p className="text-[#C7B6A6] text-base">
              Pilih pilar layanan di bawah ini untuk melihat bagaimana KanaKoding mendukung
              kebutuhan bisnis maupun perjalanan belajar pemrograman Anda.
            </p>
          </div>

          {/* Interactive Service Selector Pills */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {SERVICES.map((service) => {
              const isActive = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  className={`flex items-center gap-3 p-4 rounded-[8px] text-left transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-[#1B0D07] border-white/10 text-[#C7B6A6] hover:border-white/25 hover:text-white'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-[8px] shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-[#1A0B05]'
                        : 'bg-white/5 text-amber-400'
                    }`}
                  >
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">{service.title}</div>
                    <div className="text-[11px] text-[#A89482] truncate">
                      {service.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Spotlight Card */}
          <div className="rounded-[8px] bg-[#1B0D07] border border-amber-500/25 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#1B0D07]/30 to-[#1B0D07]" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-semibold bg-[#120804]/90 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    {activeService.badge}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeService.title}
                  </h3>
                  <p className="text-[#D5C7B8] leading-relaxed text-base">
                    {activeService.description}
                  </p>

                  <div className="pt-2 space-y-2.5">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      Cakupan Layanan &amp; Fitur Utama:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 p-3 rounded-[8px] bg-[#120804]/70 border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#E5D9CE]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#A89482]">
                    Butuh solusi khusus untuk kebutuhan organisasi Anda?
                  </span>
                  {activeService.ctaLink.startsWith('/') ? (
                    <Link
                      to={activeService.ctaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={activeService.ctaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all"
                    >
                      <span>{activeService.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORTOFOLIO & STUDI KASUS ================= */}
      <section id="portofolio" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Portofolio &amp; Rekam Jejak</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Karya &amp; Produk Digital yang Telah Kami Bangun
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Dari portal pembiayaan multifinance hingga marketplace lelang properti dan
                platform komunitas developer. Klik pada proyek untuk membaca studi kasus
                lengkapnya.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivePortfolioCategory(cat)}
                  className={`px-3.5 py-2 rounded-[8px] text-xs font-medium transition-all cursor-pointer ${
                    activePortfolioCategory === cat
                      ? 'bg-amber-500 text-[#1A0B05] font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#180C06] text-[#C7B6A6] border border-white/10 hover:border-amber-500/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPortfolio.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="group rounded-[8px] bg-[#180C06] border border-white/10 hover:border-amber-500/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#0E0603] border-b border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180C06] via-transparent to-black/20 opacity-85" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-medium bg-[#120804]/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-black/70 text-[#E5D9CE] backdrop-blur-md">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono text-amber-400">
                      {item.client}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#C7B6A6] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-[8px] text-[11px] font-mono bg-white/5 text-[#D5C7B8] border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Studi Kasus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/portofolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-sm font-semibold bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/30 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Buka Halaman Portofolio Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PROSES KERJA KAMI (HOW WE WORK) ================= */}
      <section className="py-20 bg-[#140904] border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Metodologi Pengerjaan
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Bagaimana Kami Mewujudkan Proyek Anda
            </h2>
            <p className="text-[#C7B6A6] text-sm sm:text-base">
              Alur kerja yang terstruktur, transparan, dan kolaboratif sejak diskusi pertama
              hingga produk digunakan oleh pelanggan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-[8px] bg-[#1B0D07] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <span className="inline-block text-3xl font-bold font-mono text-amber-400/90">
                    {wf.step}
                  </span>
                  <h3 className="text-lg font-bold text-white">{wf.title}</h3>
                  <p className="text-xs sm:text-sm text-[#C7B6A6] leading-relaxed">
                    {wf.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-amber-300 block">
                    Output: {wf.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG & ARTIKEL TERBARU ================= */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Blog, Wawasan &amp; Tutorial</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Artikel Terbaru dari Tim &amp; Komunitas KanaKoding
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Temukan bahasan seputar rekayasa perangkat lunak, strategi membangun produk
                startup, serta studi kasus transformasi digital.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-[#1A0B05] transition-all shrink-0"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-[8px] bg-[#180C06] border border-white/10 hover:border-amber-500/40 overflow-hidden flex flex-col transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-[#0E0603]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-mono font-medium bg-[#120804]/90 text-amber-300 border border-amber-500/30">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-[#A89482]">
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
                    <p className="text-xs sm:text-sm text-[#C7B6A6] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#A89482]">{post.author}</span>
                    <span className="font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HUBUNGI KAMI (CONTACT & CONSULTATION) ================= */}
      <section
        id="kontak"
        className="py-24 bg-gradient-to-b from-[#140904] to-[#0B0503] border-t border-amber-500/20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Hubungi Kami</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Mari Wujudkan Ide &amp; Proyek Digital Anda Bersama KanaKoding
              </h2>
              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Ingin membangun aplikasi web/mobile baru, melakukan modernisasi website
                perusahaan, atau berkonsultasi mengenai MVP startup Anda? Tim kami siap
                berdiskusi.
              </p>

              {/* Brand Quote Card */}
              <div className="p-6 rounded-[8px] bg-[#1B0D07] border border-amber-500/25 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[8px] bg-[#F7F1EB] p-2 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/img/logo.png"
                      alt="KanaKoding"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {BRAND_INFO.subQuote}
                    </div>
                    <div className="text-xs text-amber-400">
                      KanaKoding — Your Digital Partner
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs sm:text-sm text-[#D5C7B8]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A89482]">Email Resmi:</span>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="font-mono text-amber-300 hover:underline"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A89482]">Waktu Respons:</span>
                    <span className="text-white font-medium">&lt; 24 Jam Kerja</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-[8px] bg-[#180C06] border border-white/10 shadow-2xl">
                {formSubmitted ? (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-16 h-16 rounded-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-white">
                        Pesan Anda Siap Dikirim!
                      </h3>
                      <p className="text-sm text-[#C7B6A6]">
                        Terima kasih, <strong className="text-white">{formName}</strong>.
                        Pilih kanal pengiriman langsung di bawah ini untuk terhubung dengan
                        tim KanaKoding:
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                          `[${formTopic}] Diskusi dari ${formName}`
                        )}&body=${encodeURIComponent(
                          `Nama: ${formName}\nEmail: ${formEmail}\nTopik: ${formTopic}\n\nPesan:\n${formMessage}`
                        )}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05]"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Kirim via Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormName('');
                          setFormEmail('');
                          setFormMessage('');
                        }}
                        className="px-4 py-3 rounded-[8px] text-sm font-medium bg-white/5 hover:bg-white/10 text-[#E5D9CE] border border-white/10 cursor-pointer"
                      >
                        Tulis Pesan Baru
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono uppercase tracking-wider text-[#C7B6A6] mb-2"
                        >
                          Nama Lengkap *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Nama Anda atau Perusahaan"
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#7A6858] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono uppercase tracking-wider text-[#C7B6A6] mb-2"
                        >
                          Alamat Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="nama@perusahaan.com"
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#7A6858] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7B6A6] mb-2"
                      >
                        Topik Kebutuhan
                      </label>
                      <select
                        id="contact-topic"
                        value={formTopic}
                        onChange={(e) => setFormTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Project Development">
                          Project Development (Web / Mobile App / Compro)
                        </option>
                        <option value="Konsultasi Startup & MVP">
                          Konsultasi Aplikasi &amp; Bisnis Digital (Startup MVP)
                        </option>
                        <option value="Komunitas & Edukasi">
                          Kolaborasi Komunitas &amp; E-Learning
                        </option>
                        <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7B6A6] mb-2"
                      >
                        Ceritakan Kebutuhan atau Proyek Anda *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Jelaskan secara singkat tujuan proyek, fitur yang diinginkan, atau jadwal yang Anda targetkan..."
                        className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#7A6858] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Konsultasi</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromPortfolio}
      />
    </div>
  );
};
