import React, { useEffect } from 'react';
import { ADSENSE_CONFIG } from '../data/siteData';

interface AdUnitProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  layout?: 'in-article' | string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense Policy-Compliant Ad Unit Component.
 * - Uses official "Iklan" disclosure label (compliant with Google AdSense Placement Policies)
 * - Reserves minimum height to prevent Cumulative Layout Shift (CLS)
 * - Maintains safe spacing from navigation and interactive buttons to prevent accidental clicks
 * - Automatically stays hidden if ADSENSE_CONFIG.enabled is false (e.g. during initial site review before slot creation)
 */
export const AdUnit: React.FC<AdUnitProps> = ({
  slotId,
  format = 'auto',
  layout,
  className = '',
}) => {
  useEffect(() => {
    if (!ADSENSE_CONFIG.enabled || !ADSENSE_CONFIG.clientId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore duplicate push errors in SPA transitions
    }
  }, [slotId]);

  if (!ADSENSE_CONFIG.enabled) {
    return null;
  }

  return (
    <aside
      aria-label="Iklan"
      className={`my-8 py-4 px-4 rounded-[8px] bg-[#140904] border border-white/10 text-center overflow-hidden ${className}`}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B7968] mb-2 select-none">
        Iklan
      </div>
      <div className="min-h-[90px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADSENSE_CONFIG.clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          {...(layout ? { 'data-ad-layout': layout } : {})}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
