import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Instagram, Facebook, Terminal } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';
import { smoothScrollToElement } from '../utils/smoothScroll';

const NAV_SECTIONS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'portofolio', label: 'Portofolio' },
  { id: 'proses', label: 'Cara Kerja' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      if (location.pathname === '/') {
        const checkIds = ['kontak', 'proses', 'portofolio', 'layanan', 'tentang', 'beranda'];
        for (const id of checkIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top <= 160) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleSectionNavigate = (sectionId: string) => {
    setMobileOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    smoothScrollToElement(sectionId, 850);
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
        <button
          type="button"
          onClick={() => handleSectionNavigate('beranda')}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <img
            src="/assets/img/logo-white.png"
            alt="KanaKoding"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {NAV_SECTIONS.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionNavigate(item.id)}
                className={`px-3.5 py-2 rounded-[8px] text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-[#E5D9CE] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <Link
            to="/blog"
            className={`px-3.5 py-2 rounded-[8px] text-sm font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname.startsWith('/blog')
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-[#E5D9CE] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Blog</span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
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
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram KanaKoding"
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook KanaKoding"
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleSectionNavigate('kontak')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
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
          className="md:hidden p-2.5 rounded-[8px] bg-white/5 border border-white/10 text-[#F7F1EB] hover:bg-white/10"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#160A05]/98 backdrop-blur-2xl border-b border-amber-500/20 px-4 pt-4 pb-6 mt-3 space-y-2">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionNavigate(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-[8px] text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <Link
            to="/portofolio"
            className="block px-4 py-2.5 rounded-[8px] text-sm font-mono text-amber-300 hover:bg-amber-500/10"
          >
            &rarr; Buka Halaman Detail Portofolio
          </Link>

          <Link
            to="/blog"
            className="flex items-center justify-between px-4 py-2.5 rounded-[8px] text-base font-medium text-[#F7F1EB] hover:bg-amber-500/10 hover:text-amber-400"
          >
            <span>Blog &amp; Artikel</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-[8px] bg-amber-500/20 text-amber-300">
              Markdown Ready
            </span>
          </Link>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <a
                href={BRAND_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[8px] bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[8px] bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[8px] bg-white/5 text-[#E5D9CE] hover:text-amber-400"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleSectionNavigate('kontak')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] cursor-pointer"
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
