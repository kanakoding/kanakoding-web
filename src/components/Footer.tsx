import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, Instagram, Facebook, Mail, MapPin, ArrowUpRight, Code2 } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';
import { smoothScrollToElement } from '../utils/smoothScroll';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    smoothScrollToElement(id, 850);
  };

  return (
    <footer className="bg-[#0B0503] border-t border-white/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/12">
          <div className="lg:col-span-5 space-y-5">
            <button
              type="button"
              onClick={() => scrollToSection('beranda')}
              className="inline-block cursor-pointer"
            >
              <img
                src="/assets/img/logo-white.png"
                alt="KanaKoding"
                className="h-11 w-auto object-contain"
              />
            </button>
            <p className="text-[#C7B6A6] text-sm leading-relaxed max-w-md">
              {BRAND_INFO.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#B5A392] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {BRAND_INFO.location}
              </span>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {BRAND_INFO.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C7B6A6]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('beranda')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('tentang')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Layanan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('portofolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portofolio
                </button>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Jurnal &amp; Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Layanan &amp; Ekosistem
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C7B6A6]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Web &amp; App Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Konsultasi Startup &amp; MVP
                </button>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Komunitas Developer Indonesia
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  E-Learning &amp; Tutorial Gratis
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Terhubung
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={BRAND_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-[8px] bg-[#160B06] border border-white/12 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-[8px] bg-[#160B06] border border-white/12 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-[8px] bg-[#160B06] border border-white/12 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('kontak')}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-[8px] text-xs font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <span>Mulai Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A89482]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span>
              &copy; {new Date().getFullYear()} <strong className="text-[#E5D9CE]">KanaKoding</strong> — {BRAND_INFO.tagline}. All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/privasi" className="hover:text-amber-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link to="/tos" className="hover:text-amber-400 transition-colors">
              Syarat &amp; Ketentuan (ToS)
            </Link>
            <Link to="/disclaimer" className="hover:text-amber-400 transition-colors">
              Disclaimer &amp; Editorial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
