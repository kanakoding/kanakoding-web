import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/siteData';
import { PortfolioModal } from '../components/PortfolioModal';

export const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'Semua',
    ...Array.from(new Set(PORTFOLIO_ITEMS.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === 'Semua'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Page Header */}
        <div className="relative rounded-[8px] bg-[#180C06] border border-amber-500/25 p-8 sm:p-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('/assets/img/bg-kk.jpg')" }}
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTOFOLIO &amp; STUDI KASUS KANAKODING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Solusi Digital Nyata untuk Pertumbuhan Bisnis
            </h1>
            <p className="text-[#D5C7B8] text-base sm:text-lg leading-relaxed">
              Setiap produk yang kami rancang berangkat dari pemahaman mendalam terhadap
              proses bisnis klien—mulai dari portal simulasi pembiayaan multifinance hingga
              direktori lelang properti nasional.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-[#1A0B05] font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-[#180C06] text-[#C7B6A6] border border-white/10 hover:border-amber-500/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#A89482]">
            Menampilkan {filteredItems.length} Studi Kasus
          </span>
        </div>

        {/* Detailed Case Study Stack */}
        <div className="space-y-10">
          {filteredItems.map((project, index) => (
            <div
              key={project.id}
              className="rounded-[8px] bg-[#180C06] border border-white/10 hover:border-amber-500/35 overflow-hidden shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual */}
                <div
                  className={`lg:col-span-6 relative bg-[#0E0603] min-h-[280px] sm:min-h-[360px] overflow-hidden cursor-pointer ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-medium bg-[#120804]/90 text-amber-300 border border-amber-500/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {project.client}
                      </span>
                      <span className="text-[#A89482]">{project.year}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {project.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                        Deliverables &amp; Highlight:
                      </div>
                      {project.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5D9CE]">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400 mr-1" />
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-white/5 border border-white/10 text-[#D5C7B8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-[#1A0B05] transition-all cursor-pointer"
                    >
                      <span>Detail Studi Kasus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-[8px] bg-[#1E0F08] border border-amber-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Punya Ide Produk atau Kebutuhan Sistem Serupa?
            </h3>
            <p className="text-sm text-[#C7B6A6]">
              Konsultasikan kebutuhan teknis dan estimasi pengembangan aplikasi Anda bersama
              tim engineer KanaKoding.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#kontak')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
          >
            <span>Mulai Diskusi Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => navigate('/#kontak')}
      />
    </div>
  );
};
