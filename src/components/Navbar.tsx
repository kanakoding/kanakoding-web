import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Instagram, Facebook } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#120804]/95 border-b border-white/12 py-3.5'
          : 'bg-[#0F0704]/85 border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleSectionNavigate('beranda')}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <img
            src="/assets/img/logo-white.png"
            alt="KanaKoding"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </button>

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
                    ? 'text-amber-400 bg-[#1F1009]'
                    : 'text-[#E5D9CE] hover:text-white hover:bg-[#190C06]'
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
                ? 'text-amber-400 bg-[#1F1009]'
                : 'text-[#E5D9CE] hover:text-white hover:bg-[#190C06]'
            }`}
          >
            <span>Jurnal &amp; Blog</span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 border-r border-white/12 pr-3">
            <a
              href={BRAND_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub KanaKoding"
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-[#190C06] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram KanaKoding"
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-[#190C06] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={BRAND_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook KanaKoding"
              className="p-2 rounded-[8px] text-[#C7B6A6] hover:text-amber-400 hover:bg-[#190C06] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => handleSectionNavigate('kontak')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
          >
            <span>Diskusi Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2.5 rounded-[8px] bg-[#180C06] border border-white/15 text-[#F7F1EB] hover:bg-[#221109]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#140904] border-b border-white/15 px-4 pt-4 pb-6 mt-3 space-y-1.5">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionNavigate(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-[8px] text-base font-medium text-[#F7F1EB] hover:bg-[#1F1009] hover:text-amber-400 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <Link
            to="/portofolio"
            className="block px-4 py-2.5 rounded-[8px] text-sm font-mono text-amber-300 hover:bg-[#1F1009]"
          >
            &rarr; Indeks Studi Kasus Portofolio
          </Link>

          <Link
            to="/blog"
            className="block px-4 py-2.5 rounded-[8px] text-base font-medium text-[#F7F1EB] hover:bg-[#1F1009] hover:text-amber-400"
          >
            Jurnal &amp; Blog
          </Link>

          <div className="pt-3 border-t border-white/12 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <a
                href={BRAND_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub KanaKoding"
                className="p-2.5 rounded-[8px] bg-[#1C0E07] border border-white/10 text-[#E5D9CE] hover:text-amber-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram KanaKoding"
                className="p-2.5 rounded-[8px] bg-[#1C0E07] border border-white/10 text-[#E5D9CE] hover:text-amber-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook KanaKoding"
                className="p-2.5 rounded-[8px] bg-[#1C0E07] border border-white/10 text-[#E5D9CE] hover:text-amber-400"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleSectionNavigate('kontak')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
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
