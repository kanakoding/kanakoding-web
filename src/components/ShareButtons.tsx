import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';

export interface ShareButtonsProps {
  title: string;
  url?: string;
  summary?: string;
  variant?: 'bar' | 'compact';
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  summary,
  variant = 'bar',
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url ||
    (typeof window !== 'undefined'
      ? window.location.href
      : 'https://kanakoding.com');

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // clipboard fallback
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary || title,
          url: shareUrl,
        });
      } catch {
        // user dismissed dialog or unsupported
      }
    } else {
      handleCopy(e);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`,
      hoverClass:
        'hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&via=kanakoding`,
      hoverClass: 'hover:text-white hover:border-white/40 hover:bg-white/10',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      hoverClass:
        'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      hoverClass:
        'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#180C06] hover:bg-[#221109] border border-white/12 text-xs font-mono text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer"
          title="Salin tautan artikel"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Tersalin!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Bagikan</span>
            </>
          )}
        </button>

        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-1.5 rounded-[5px] bg-[#180C06] hover:bg-[#221109] border border-white/12 text-[#E5D9CE] hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer sm:hidden"
            title="Bagikan lewat aplikasi lain"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1">
          {shareLinks.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-[5px] bg-[#180C06] border border-white/12 text-[#B5A392] transition-colors cursor-pointer ${item.hoverClass}`}
                title={`Bagikan ke ${item.name}`}
                aria-label={`Bagikan ke ${item.name}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-[8px] bg-[#150A05] border border-white/12 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Bagikan Catatan Ini</h4>
        </div>
        <p className="text-xs text-[#A89482]">
          Bermanfaat? Bagikan kepada rekan engineer atau tim produk Anda.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {shareLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] text-xs font-mono font-medium bg-[#1C0E08] border border-white/12 text-[#D5C7B8] transition-colors ${item.hoverClass}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </a>
          );
        })}

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] text-xs font-mono font-medium bg-[#1C0E08] border border-white/12 text-[#D5C7B8] hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer"
          title="Salin tautan ke clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Tautan Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Salin Tautan</span>
            </>
          )}
        </button>

        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] text-xs font-mono font-medium bg-[#221008] border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-[#1A0B05] transition-colors cursor-pointer sm:hidden"
            title="Bagikan lewat aplikasi lain"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan Lainnya</span>
          </button>
        )}
      </div>
    </div>
  );
};
