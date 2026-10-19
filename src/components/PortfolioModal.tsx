import React from 'react';
import { X, CheckCircle2, Layers, Building2, Calendar } from 'lucide-react';
import { PortfolioItem } from '../data/siteData';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquire?: (projectTitle: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[8px] bg-[#180C06] border border-amber-500/25 shadow-2xl text-[#F7F1EB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#180C06]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {project.category}
            </span>
            <span className="text-xs text-[#A89482] inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail portofolio"
            className="p-2 rounded-[8px] bg-white/5 hover:bg-white/10 text-[#C7B6A6] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Visual Preview */}
        <div className="relative bg-[#0E0603] border-b border-white/10 overflow-hidden max-h-[420px] flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full max-h-[420px] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180C06] via-transparent to-transparent opacity-80" />
        </div>

        {/* Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span>Klien / Mitra: {project.client}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-[#D5C7B8] text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-[8px] bg-[#221109] border border-white/10 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Tantangan Bisnis
              </h4>
              <p className="text-sm text-[#D5C7B8] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="p-5 rounded-[8px] bg-[#221109] border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Solusi KanaKoding
              </h4>
              <p className="text-sm text-[#D5C7B8] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Fitur & Dampak Utama
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-[8px] bg-white/[0.03] border border-white/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-[#E5D9CE]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Action */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#A89482] mr-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Stack:
              </span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-white/5 border border-white/10 text-[#E5D9CE]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {onInquire && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire(project.title);
                }}
                className="px-5 py-2.5 rounded-[8px] text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] hover:from-amber-400 hover:to-orange-500 transition-all cursor-pointer shrink-0"
              >
                Bangun Proyek Serupa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
