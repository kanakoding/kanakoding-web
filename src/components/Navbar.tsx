import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Instagram, Facebook, Terminal } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleSectionNavigate = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#120804]/90 backdrop-blur-xl border-b border-amber-500/15 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#0F0704]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src="/assets/img/logo-white.png"
            alt="KanaKoding"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' && !location.hash
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-[#E5D9CE] hover:text-white hover:bg-white/5'
            }`}
          >
            Beranda
          </Link>
          <button
            type="button"
            onClick={() => handleSectionNavigate('tentang')}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#E5D9CE] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Tentang
          </button>
          <button
            type="button"
            onClick={() => handleSectionNavigate('layanan')}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#E5D9CE] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Layanan
          </button>
          <Link
            to="/portofolio"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname.startsWith('/portofolio')
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-[#E5D9CE] hover:text-white hover:bg-white/5'
            }`}
          >
            Portofolio
          </Link>
          <Link
            to="/blog"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname.startsWith('/blog')
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-[#E5D9CE] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Blog</span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Baru
            </span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 border-r border-white/10 pr-3">
            <a
              href={BRAND_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub KanaKoding"
              className="p-2 rounded-lg text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram KanaKoding"
              className="p-2 rounded-lg text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook KanaKoding"
              className="p-2 rounded-lg text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleSectionNavigate('kontak')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Diskusi Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#F7F1EB] hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#160A05]/98 backdrop-blur-2xl border-b border-amber-500/20 px-4 pt-4 pb-6 mt-3 space-y-2">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            Beranda
          </Link>
          <button
            type="button"
            onClick={() => handleSectionNavigate('tentang')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            Tentang Kami
          </button>
          <button
            type="button"
            onClick={() => handleSectionNavigate('layanan')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            Layanan
          </button>
          <Link
            to="/portofolio"
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            Portofolio & Studi Kasus
          </Link>
          <Link
            to="/blog"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            <span>Blog & Artikel</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              Markdown Ready
            </span>
          </Link>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <a
                href={BRAND_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleSectionNavigate('kontak')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05]"
            >
              <span>Hubungi Kami</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
