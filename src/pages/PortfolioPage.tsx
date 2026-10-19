import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  ExternalLink,
} from 'lucide-react';
import { BRAND_INFO, PORTFOLIO_ITEMS, PortfolioItem } from '../data/siteData';
import { PortfolioModal } from '../components/PortfolioModal';
import { updatePageSeo } from '../utils/seo';
import { smoothScrollToY } from '../utils/smoothScroll';

export const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    smoothScrollToY(0, 500);
    updatePageSeo({
      title: `Karya & Cerita Proyek — ${BRAND_INFO.name} (${BRAND_INFO.tagline})`,
      description:
        'Cerita di balik pembuatan aplikasi web, portal simulasi pembiayaan, dan direktori properti yang diracik oleh tim KanaKoding.',
      canonicalPath: '/portofolio',
      ogType: 'website',
    });
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/12 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Karya &amp; Cerita Proyek
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.1rem)] font-bold text-white leading-tight">
              Produk Digital yang Pernah Kami Racik Bareng.
            </h1>
            <p className="text-[#D5C7B8] text-base sm:text-lg leading-relaxed">
              Setiap produk selalu berangkat dari masalah nyata yang dialami penggunanya—mulai
              dari menghitung cicilan tanpa ribet hingga mencari rumah lelang dengan tenang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-[#1A0B05] font-bold'
                    : 'bg-[#180C06] text-[#C7B6A6] border border-white/10 hover:border-amber-500/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/12 border-b border-white/12">
          {filteredItems.map((project, index) => (
            <article
              key={project.id}
              className="py-10 first:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
              <div
                className="lg:col-span-6 relative rounded-[8px] border border-white/12 bg-[#0E0603] overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[260px] sm:h-[320px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="p-3.5 bg-[#140904] border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300">{project.category}</span>
                  <span className="text-[#B5A392]">{project.year}</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-[#B5A392]">
                    0{index + 1} · Bersama <strong className="text-white">{project.client}</strong>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {project.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="text-xs font-mono text-amber-400 mb-2">
                    Yang Kami Hadirkan:
                  </div>
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {project.highlights.map((hl, i) => (
                      <li
                        key={i}
                        className="py-2.5 flex items-start justify-between gap-3 text-xs sm:text-sm text-[#E5D9CE]"
                      >
                        <span>{hl}</span>
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-[#180C06] border border-white/10 text-[#D5C7B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] text-xs font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    <span>Baca Cerita Lengkap</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-[8px] bg-[#160B06] border border-white/12 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Pengen Bikin Sesuatu yang Serupa?
            </h3>
            <p className="text-sm text-[#C7B6A6]">
              Yuk ceritakan kebutuhan Anda, nanti kita cari jalan paling simpel dan pas buat
              mewujudkannya.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#kontak')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
          >
            <span>Ngobrol Sekarang</span>
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
