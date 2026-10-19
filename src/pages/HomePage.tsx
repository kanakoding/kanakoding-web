import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  GraduationCap,
  Mail,
  MessageSquare,
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
import { smoothScrollToElement } from '../utils/smoothScroll';
import { updatePageSeo } from '../utils/seo';

export const HomePage: React.FC = () => {
  const [activeHeroProjectId, setActiveHeroProjectId] = useState<string>(
    PORTFOLIO_ITEMS[0].id
  );
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTopic, setFormTopic] = useState('Project Development');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    updatePageSeo({
      title: `${BRAND_INFO.name} — ${BRAND_INFO.tagline} | Software House, Konsultan IT & Produk Digital`,
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

  const activeHeroProject =
    PORTFOLIO_ITEMS.find((p) => p.id === activeHeroProjectId) || PORTFOLIO_ITEMS[0];

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
    smoothScrollToElement('kontak', 850);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;
    setFormSubmitted(true);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'development':
        return <Cpu className="w-4 h-4" />;
      case 'konsultasi':
        return <Compass className="w-4 h-4" />;
      case 'kursus':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB]">
      <section
        id="beranda"
        className="relative min-h-[88dvh] flex items-center pt-28 pb-20 overflow-hidden border-b border-white/12"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/assets/img/bg-kk.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0704]/90 via-[#140904]/92 to-[#0F0704]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-6 pt-2">
              <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>{BRAND_INFO.name} — {BRAND_INFO.tagline}</span>
              </div>

              <h1 className="text-[clamp(2.15rem,4.5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.08]">
                Rekayasa Produk Digital &amp; Konsultasi Teknologi untuk{' '}
                <span className="text-amber-400">Pertumbuhan Bisnis.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D5C7B8] leading-relaxed max-w-2xl">
                <strong className="text-white">KanaKoding</strong> merancang sistem web
                enterprise, aplikasi mobile, dan arsitektur MVP startup yang terukur—membantu
                perusahaan dan pelaku bisnis mempercepat transformasi digital secara efisien.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('portofolio', 850)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <span>Eksplorasi Studi Kasus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('kontak', 850)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-sm font-semibold bg-[#180C06] hover:bg-[#221109] text-[#F7F1EB] border border-white/15 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Diskusi Proyek</span>
                </button>
              </div>

              <div className="pt-8">
                <dl className="grid grid-cols-2 sm:grid-cols-4 border-y border-white/12 divide-y sm:divide-y-0 sm:divide-x divide-white/12">
                  {HERO_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="py-4 sm:px-4 first:sm:pl-0 last:sm:pr-0"
                    >
                      <dt className="text-xs font-mono text-[#B5A392] uppercase tracking-wider">
                        {stat.label}
                      </dt>
                      <dd className="text-2xl sm:text-3xl font-bold font-display text-amber-400 mt-1">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[8px] bg-[#150A05] border border-white/15 overflow-hidden">
                <div className="px-5 py-3.5 bg-[#1B0D07] border-b border-white/12 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/img/logo.png"
                      alt="KanaKoding"
                      className="w-5 h-5 object-contain rounded-[8px] bg-[#F7F1EB] p-0.5"
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#E5D9CE]">
                      Arsip Studi Kasus Pilihan
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400">
                    {activeHeroProject.year}
                  </span>
                </div>

                <div className="grid grid-cols-4 border-b border-white/12 divide-x divide-white/12 bg-[#120804]">
                  {PORTFOLIO_ITEMS.map((proj, idx) => {
                    const active = proj.id === activeHeroProject.id;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setActiveHeroProjectId(proj.id)}
                        className={`px-3 py-2.5 text-left font-mono text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-amber-500 text-[#1A0B05] font-bold'
                            : 'text-[#B5A392] hover:bg-[#1B0D07] hover:text-white'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div
                  className="relative h-56 sm:h-60 bg-[#0B0503] border-b border-white/12 overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProject(activeHeroProject)}
                >
                  <img
                    src={activeHeroProject.image}
                    alt={activeHeroProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150A05] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 block">
                        {activeHeroProject.category}
                      </span>
                      <h2 className="text-lg font-bold text-white leading-snug">
                        {activeHeroProject.title}
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-mono bg-[#150A05]/95 text-amber-300 border border-amber-500/30 shrink-0">
                      Buka Detail
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs sm:text-sm text-[#D5C7B8] leading-relaxed">
                    {activeHeroProject.summary}
                  </p>

                  <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <dt className="font-mono text-[#A89482]">KLIEN / MITRA</dt>
                      <dd className="text-white font-medium mt-0.5 truncate">
                        {activeHeroProject.client}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[#A89482]">ARSITEKTUR</dt>
                      <dd className="text-amber-300 font-mono mt-0.5 truncate">
                        {activeHeroProject.techStack.slice(0, 2).join(' · ')}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(activeHeroProject)}
                      className="inline-flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <span>Pelajari Studi Kasus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to="/portofolio"
                      className="inline-flex items-center gap-1 text-[#C7B6A6] hover:text-white"
                    >
                      <span>Semua Karya</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-24 border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="rounded-[8px] overflow-hidden border border-white/15 bg-[#150A05]">
                <img
                  src="/assets/img/background4.jpg"
                  alt="Tim Developer KanaKoding"
                  className="w-full h-[340px] object-cover"
                />
                <div className="p-5 border-t border-white/12 bg-[#160B06] space-y-1.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Prinsip Utama Ekosistem
                  </div>
                  <blockquote className="text-sm sm:text-base font-semibold text-white">
                    &ldquo;{BRAND_INFO.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Profil Studio &amp; Rekayasa</span>
              </div>

              <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] font-bold text-white leading-tight">
                Mitra Konsultasi Teknologi &amp; Pengembangan Produk Digital
              </h2>

              <p className="text-[#D5C7B8] text-base leading-relaxed">
                <strong className="text-white">KanaKoding</strong> hadir untuk menjawab
                tantangan operasional dan skala bisnis melalui rekayasa perangkat lunak yang
                aplikatif. Kami memadukan disiplin teknis{' '}
                <strong className="text-amber-300">Software House &amp; Konsultan IT</strong>{' '}
                dengan standar dokumentasi teknis dan arsitektur sistem modern.
              </p>

              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Bagi para <strong className="text-white">entrepreneur, korporasi, dan perintis startup</strong>,
                kami menerjemahkan kebutuhan bisnis menjadi arsitektur aplikasi yang siap
                tumbuh, aman, dan mudah dikelola untuk jangka panjang.
              </p>

              <div className="pt-4 border-y border-white/12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/12">
                <div className="py-4 sm:pr-5">
                  <div className="text-amber-400 font-mono text-xs font-semibold">
                    01 / SOLUTIF
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Berorientasi Bisnis
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Keputusan arsitektur yang dirancang untuk efisiensi operasional dan
                    konversi pengguna nyata.
                  </p>
                </div>
                <div className="py-4 sm:px-5">
                  <div className="text-amber-400 font-mono text-xs font-semibold">
                    02 / KOLABORATIF
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Kemitraan Teknis
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Pendampingan langsung oleh tim engineer berpengalaman sejak perancangan
                    hingga rilis produksi.
                  </p>
                </div>
                <div className="py-4 sm:pl-5">
                  <div className="text-amber-400 font-mono text-xs font-semibold">
                    03 / TERUKUR
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Standar Produksi
                  </h3>
                  <p className="text-xs text-[#B5A392] mt-1.5 leading-relaxed">
                    Kode sumber yang modular, teruji, cepat diakses, dan mudah dipelihara
                    jangka panjang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="py-24 bg-[#140904] border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Layanan &amp; Kapabilitas</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] font-bold text-white leading-tight">
                Solusi End-to-End dari Rekayasa Sistem hingga Konsultasi Produk
              </h2>
            </div>
            <p className="text-[#C7B6A6] text-sm sm:text-base max-w-md">
              Pilih pilar layanan di bawah untuk meninjau cakupan teknis dan bentuk kolaborasi
              yang sesuai dengan organisasi Anda.
            </p>
          </div>

          <div className="rounded-[8px] border border-white/15 bg-[#180C06] overflow-hidden">
            <div
              role="tablist"
              aria-label="Pilar Layanan KanaKoding"
              className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/12 divide-y sm:divide-y-0 sm:divide-x divide-white/12 bg-[#120804]"
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
                    className={`p-4 sm:p-5 text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                      isActive
                        ? 'bg-[#221109] text-white'
                        : 'text-[#C7B6A6] hover:bg-[#190C06] hover:text-white'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={isActive ? 'text-amber-400 font-bold' : 'text-[#A89482]'}>
                          0{index + 1}
                        </span>
                        <span className="text-[#A89482]">/</span>
                        <span className="text-amber-400 truncate">{service.badge}</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold truncate">
                        {service.title}
                      </div>
                    </div>
                    <span
                      className={`p-2 rounded-[8px] shrink-0 ${
                        isActive
                          ? 'bg-amber-500 text-[#1A0B05]'
                          : 'bg-white/5 text-amber-400'
                      }`}
                    >
                      {getServiceIcon(service.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-white/12 bg-[#0E0603]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180C06] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-semibold bg-[#120804]/95 text-amber-300 border border-amber-500/35">
                    {activeService.badge}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeService.title}
                  </h3>
                  <p className="text-[#D5C7B8] leading-relaxed text-base">
                    {activeService.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400 pb-3 border-b border-white/12">
                      Spesifikasi &amp; Cakupan Layanan
                    </div>
                    <ul className="divide-y divide-white/10 border-b border-white/12">
                      {activeService.deliverables.map((item, idx) => (
                        <li
                          key={item}
                          className="py-3.5 flex items-start justify-between gap-4 text-sm text-[#E5D9CE]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-xs text-amber-400 mt-0.5">
                              0{idx + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#B5A392]">
                    Disesuaikan dengan skala dan target organisasi Anda.
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
        </div>
      </section>

      <section id="portofolio" className="py-24 border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Portofolio &amp; Rekam Jejak</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] font-bold text-white leading-tight">
                Implementasi Sistem &amp; Produk Digital Terpilih
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Dari sistem pembiayaan korporasi multifinance hingga portal agregator lelang
                properti nasional. Pilih studi kasus untuk melihat rincian arsitektur dan solusi.
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
                      : 'bg-[#180C06] text-[#C7B6A6] border border-white/12 hover:border-amber-500/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/15 divide-y divide-white/15">
            {filteredPortfolio.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
              >
                <div className="lg:col-span-5 overflow-hidden rounded-[8px] border border-white/12 bg-[#0E0603] h-60 sm:h-64 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-[#120804]/95 text-amber-300 border border-amber-500/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-bold">0{idx + 1}</span>
                      <span className="text-white/30">/</span>
                      <span className="text-[#E5D9CE]">{item.client}</span>
                    </div>
                    <span className="text-[#A89482]">{item.year}</span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#C7B6A6] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
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
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-amber-400">
                      <span>Buka Studi Kasus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/15">
            <p className="text-sm text-[#B5A392]">
              Ingin meninjau rincian tantangan bisnis dan solusi teknis tiap proyek secara
              berdampingan?
            </p>
            <Link
              to="/portofolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-[#180C06] hover:bg-[#221109] text-amber-300 border border-amber-500/35 transition-colors shrink-0"
            >
              <span>Halaman Indeks Portofolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="proses" className="py-24 bg-[#140904] border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Metodologi Pengerjaan</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-white leading-tight">
                Tahapan Rekayasa yang Terstruktur &amp; Transparan
              </h2>
              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Setiap proyek dikerjakan melalui siklus rekayasa yang terdokumentasi—mulai dari
                pemetaan kebutuhan bisnis hingga peluncuran dan pemeliharaan sistem produksi.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => smoothScrollToElement('kontak', 850)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-xs font-mono uppercase tracking-wider font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <span>Jadwalkan Sesi Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 border-y border-white/15 divide-y divide-white/15">
              {WORKFLOW_STEPS.map((wf) => (
                <div
                  key={wf.step}
                  className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                >
                  <div className="sm:col-span-2">
                    <span className="text-2xl font-bold font-mono text-amber-400">
                      {wf.step}
                    </span>
                  </div>
                  <div className="sm:col-span-10 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {wf.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-mono bg-[#1C0E07] text-amber-300 border border-amber-500/25">
                        Output: {wf.deliverable}
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

      <section id="artikel" className="py-24 border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Jurnal Teknis &amp; Wawasan</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] font-bold text-white leading-tight">
                Publikasi Terbaru Tim Engineering KanaKoding
              </h2>
              <p className="text-[#C7B6A6] text-base">
                Artikel seputar arsitektur perangkat lunak, validasi MVP startup, serta studi
                kasus transformasi digital di Indonesia.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors shrink-0"
            >
              <span>Indeks Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border border-white/15 rounded-[8px] divide-y lg:divide-y-0 lg:divide-x divide-white/15 bg-[#150A05] overflow-hidden">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col justify-between hover:bg-[#1B0D07] transition-colors"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#0E0603] border-b border-white/12">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-mono font-medium bg-[#120804]/95 text-amber-300 border border-amber-500/30">
                        {post.category}
                      </span>
                    </div>
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
                  <span className="text-[#B5A392]">{post.author}</span>
                  <span className="font-mono font-semibold text-amber-400 inline-flex items-center gap-1">
                    Baca <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="py-24 bg-[#120804]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="w-8 h-[2px] bg-amber-500" />
                <span>Hubungi Kami</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold text-white leading-tight">
                Diskusikan Arsitektur &amp; Proyek Digital Anda Bersama KanaKoding
              </h2>
              <p className="text-[#C7B6A6] text-base leading-relaxed">
                Ingin membangun aplikasi web/mobile baru, memperbarui sistem perusahaan, atau
                berkonsultasi mengenai validasi MVP startup Anda? Tim engineer kami siap
                membantu.
              </p>

              <div className="p-6 rounded-[8px] bg-[#180C06] border border-white/15 space-y-4">
                <div className="flex items-center gap-3.5">
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
                    <div className="text-xs font-mono text-amber-400 mt-0.5">
                      {BRAND_INFO.name} — {BRAND_INFO.tagline}
                    </div>
                  </div>
                </div>

                <dl className="pt-4 border-t border-white/12 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[#B5A392]">Email Resmi</dt>
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
                    <dt className="text-[#B5A392]">Target Respons</dt>
                    <dd className="text-white font-medium">&lt; 24 Jam Kerja</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-[8px] bg-[#180C06] border border-white/15">
                {formSubmitted ? (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-14 h-14 rounded-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-white">
                        Rincian Konsultasi Siap Dikirim
                      </h3>
                      <p className="text-sm text-[#C7B6A6]">
                        Terima kasih, <strong className="text-white">{formName}</strong>.
                        Lanjutkan pengiriman melalui aplikasi email Anda untuk terhubung
                        langsung dengan tim KanaKoding:
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                          `[${formTopic}] Diskusi dari ${formName}`
                        )}&body=${encodeURIComponent(
                          `Nama: ${formName}\nEmail: ${formEmail}\nTopik: ${formTopic}\n\nPesan:\n${formMessage}`
                        )}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Buka Aplikasi Email</span>
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
                          className="block text-xs font-mono uppercase tracking-wider text-[#D5C7B8] mb-2"
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
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono uppercase tracking-wider text-[#D5C7B8] mb-2"
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
                          className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-mono uppercase tracking-wider text-[#D5C7B8] mb-2"
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
                          Project Development (Web / Mobile App / Sistem Enterprise)
                        </option>
                        <option value="Konsultasi Startup & MVP">
                          Konsultasi Aplikasi &amp; Bisnis Digital (Startup MVP)
                        </option>
                        <option value="Modernisasi Website & Sistem">
                          Modernisasi Website &amp; Integrasi Sistem
                        </option>
                        <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase tracking-wider text-[#D5C7B8] mb-2"
                      >
                        Rincian Kebutuhan Proyek *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Jelaskan secara singkat tujuan bisnis, cakupan fitur utama, atau linimasa yang ditargetkan..."
                        className="w-full px-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-white placeholder-[#9E8A78] text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Permintaan Konsultasi</span>
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
