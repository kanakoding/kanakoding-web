import React from 'react';

export const HeroStudioIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 420 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Subtle dot grid background */}
    <pattern id="kk-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#F7F1EB" fillOpacity="0.12" />
    </pattern>
    <rect x="0" y="0" width="420" height="220" rx="8" fill="url(#kk-dots)" />

    {/* Left: Warm Coffee Cup & Idea Note (Human touch) */}
    <g transform="translate(24, 46)">
      {/* Coaster / Note */}
      <rect
        x="0"
        y="78"
        width="92"
        height="56"
        rx="8"
        fill="#1E100A"
        stroke="#F7F1EB"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <path
        d="M16 98H64M16 112H48"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Coffee Mug */}
      <rect
        x="20"
        y="24"
        width="44"
        height="42"
        rx="8"
        fill="#27140C"
        stroke="#F7F1EB"
        strokeWidth="1.75"
      />
      <path
        d="M64 34H70C74.4183 34 78 37.5817 78 42V46C78 50.4183 74.4183 54 70 54H64"
        stroke="#F7F1EB"
        strokeWidth="1.75"
      />
      {/* Warm Steam Lines */}
      <path
        d="M34 14C34 10 38 8 38 4"
        stroke="#F59E0B"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M46 16C46 12 50 10 50 6"
        stroke="#F59E0B"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </g>

    {/* Connecting Flow Line from Idea to Digital Product */}
    <path
      d="M126 110C152 110 156 76 184 76"
      stroke="#F59E0B"
      strokeWidth="1.75"
      strokeDasharray="4 4"
      strokeLinecap="round"
    />
    <circle cx="126" cy="110" r="3.5" fill="#F59E0B" />
    <circle cx="184" cy="76" r="3.5" fill="#F59E0B" />

    {/* Right: Clean Digital Product Canvas */}
    <g transform="translate(188, 22)">
      <rect
        x="0"
        y="0"
        width="208"
        height="168"
        rx="8"
        fill="#1B0E08"
        stroke="#F7F1EB"
        strokeOpacity="0.25"
        strokeWidth="1.75"
      />
      {/* Minimal Header Bar */}
      <line
        x1="0"
        y1="30"
        x2="208"
        y2="30"
        stroke="#F7F1EB"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <rect x="14" y="11" width="28" height="8" rx="4" fill="#F59E0B" />
      <rect x="150" y="11" width="44" height="8" rx="4" fill="#F7F1EB" fillOpacity="0.18" />

      {/* Product Wireframe Blocks */}
      <rect
        x="16"
        y="44"
        width="106"
        height="64"
        rx="8"
        fill="#26130A"
        stroke="#F59E0B"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        d="M28 64H86M28 78H68M28 92H52"
        stroke="#F7F1EB"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Widget Block */}
      <rect
        x="132"
        y="44"
        width="60"
        height="64"
        rx="8"
        fill="#221109"
        stroke="#F7F1EB"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M144 92L156 76L166 84L180 62"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom Bar */}
      <rect
        x="16"
        y="120"
        width="176"
        height="32"
        rx="8"
        fill="#221109"
        stroke="#F7F1EB"
        strokeOpacity="0.12"
        strokeWidth="1.25"
      />
      <rect x="28" y="132" width="76" height="8" rx="4" fill="#F7F1EB" fillOpacity="0.3" />
      <rect x="146" y="128" width="36" height="16" rx="4" fill="#F59E0B" />
    </g>
  </svg>
);

export const ServiceIllustration: React.FC<{ id: string; className?: string }> = ({
  id,
  className = '',
}) => {
  if (id === 'development') {
    return (
      <svg
        viewBox="0 0 240 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <rect
          x="16"
          y="16"
          width="156"
          height="110"
          rx="8"
          fill="#1B0E08"
          stroke="#F7F1EB"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="38"
          x2="172"
          y2="38"
          stroke="#F7F1EB"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
        <rect x="28" y="24" width="20" height="6" rx="3" fill="#F59E0B" />
        <rect x="28" y="52" width="68" height="44" rx="8" fill="#26130A" stroke="#F59E0B" strokeOpacity="0.4" />
        <path d="M40 68H72M40 80H60" stroke="#F7F1EB" strokeWidth="2" strokeLinecap="round" />
        <rect x="106" y="52" width="52" height="18" rx="6" fill="#221109" />
        <rect x="106" y="78" width="52" height="18" rx="6" fill="#221109" />
        {/* Mobile Overlay */}
        <rect
          x="154"
          y="42"
          width="66"
          height="94"
          rx="8"
          fill="#24120B"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <rect x="166" y="56" width="42" height="28" rx="6" fill="#180C06" />
        <path d="M166 98H198M166 110H186" stroke="#F7F1EB" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'konsultasi') {
    return (
      <svg
        viewBox="0 0 240 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Node 1: Idea */}
        <rect
          x="20"
          y="46"
          width="56"
          height="56"
          rx="8"
          fill="#24120B"
          stroke="#F7F1EB"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <circle cx="48" cy="74" r="10" stroke="#F59E0B" strokeWidth="2" />
        {/* Connector */}
        <path d="M76 74H102" stroke="#F59E0B" strokeWidth="1.75" strokeDasharray="3 3" />
        {/* Node 2: Blueprint */}
        <rect
          x="102"
          y="30"
          width="64"
          height="88"
          rx="8"
          fill="#1B0E08"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <path
          d="M116 54H150M116 70H142M116 86H134"
          stroke="#F7F1EB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Connector */}
        <path d="M166 74H188" stroke="#F59E0B" strokeWidth="1.75" />
        {/* Node 3: Launch */}
        <rect
          x="188"
          y="54"
          width="36"
          height="40"
          rx="8"
          fill="#F59E0B"
        />
        <path
          d="M200 74L205 79L214 69"
          stroke="#1A0B05"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Open Journal / Book */}
      <rect
        x="32"
        y="26"
        width="86"
        height="98"
        rx="8"
        fill="#1B0E08"
        stroke="#F7F1EB"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <rect
        x="118"
        y="26"
        width="86"
        height="98"
        rx="8"
        fill="#24120B"
        stroke="#F59E0B"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d="M48 52H96M48 68H88M48 84H76"
        stroke="#F7F1EB"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M136 52H184M136 68H176M136 84H164"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
