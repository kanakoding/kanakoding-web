import React from 'react';
import { X, Check, Calendar } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-[8px] bg-[#160B06] border border-white/15 text-[#F7F1EB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#160B06] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-medium bg-[#221109] text-amber-300 border border-white/10">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#B5A392] inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {project.year}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup cerita proyek"
            className="p-2 rounded-[8px] bg-[#221109] hover:bg-[#2C160C] text-[#C7B6A6] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-[#0E0603] border-b border-white/10 overflow-hidden max-h-[380px] flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full max-h-[380px] object-cover object-top"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-amber-400 mb-1.5">
              Kolaborasi bersama {project.client}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-[#D5C7B8] text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-5 md:pr-6 space-y-2">
              <h4 className="text-xs font-mono text-amber-400">
                Awal Ceritanya
              </h4>
              <p className="text-sm text-[#D5C7B8] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="py-5 md:pl-6 space-y-2">
              <h4 className="text-xs font-mono text-amber-400">
                Yang Kami Lakukan
              </h4>
              <p className="text-sm text-[#D5C7B8] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-amber-400 pb-3 border-b border-white/10">
              Hal Penting yang Dihadirkan
            </h4>
            <ul className="divide-y divide-white/10 border-b border-white/10">
              {project.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="py-3 flex items-start justify-between gap-3 text-sm text-[#E5D9CE]"
                >
                  <span>{item}</span>
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[8px] text-xs font-mono bg-[#221109] border border-white/10 text-[#E5D9CE]"
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
                className="px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer shrink-0"
              >
                Bikin yang Seperti Ini
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
