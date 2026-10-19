import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, Instagram, Facebook, Mail, MapPin, ArrowUpRight, Code2 } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0B0503] border-t border-amber-500/15 pt-16 pb-12 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-48 bg-amber-600/10 blur-[110px] rounded-[8px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/assets/img/logo-white.png"
                alt="KanaKoding"
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-[#C7B6A6] text-sm leading-relaxed max-w-md">
              {BRAND_INFO.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#A89482] pt-1">
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

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C7B6A6]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
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
                <Link to="/portofolio" className="hover:text-white transition-colors">
                  Portofolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog & Artikel
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Layanan & Ekosistem
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C7B6A6]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Web & App Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('layanan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Konsultasi Startup & MVP
                </button>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Komunitas Developer Indonesia
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  E-Learning & Tutorial Gratis
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA & Socials Column */}
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
                className="p-2.5 rounded-[8px] bg-white/5 border border-white/10 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-[8px] bg-white/5 border border-white/10 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-[8px] bg-white/5 border border-white/10 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('kontak')}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-[8px] text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-[#1A0B05] transition-all cursor-pointer"
            >
              <span>Mulai Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8A78]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-500" />
            <span>
              &copy; {new Date().getFullYear()} <strong className="text-[#E5D9CE]">KanaKoding</strong> — Your Digital Partner. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Menuju Indonesia Industri 4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
