'use client';

import React from 'react';
import Link from 'next/link';

interface MudraLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * MudraLogo — High-definition, transparent SVG recreation of the official Mudra logo.
 * 100% vector, zero background box, crisp at any resolution.
 */
export const MudraLogo: React.FC<MudraLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'lg',
}) => {
  const c = variant === 'dark' ? '#F5F0E5' : '#212529';
  const gold = '#C4A35A';

  const heightClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center select-none group transition-transform duration-200 hover:scale-[1.03] ${className}`}
      title="MUDRA FASHIONS"
    >
      <svg
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses[size]} w-auto drop-shadow-xs`}
      >
        {/* Top Chevron V pointing down */}
        <path
          d="M 28 28 L 100 86 L 172 28"
          stroke={c}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left vertical outer leg */}
        <line
          x1="28"
          y1="64"
          x2="28"
          y2="170"
          stroke={c}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Right vertical outer leg */}
        <line
          x1="172"
          y1="64"
          x2="172"
          y2="170"
          stroke={c}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Inner diagonals converging to center */}
        <path
          d="M 28 64 L 92 118"
          stroke={c}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 172 64 L 108 118"
          stroke={c}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center Loop / Teardrop Pendant */}
        <ellipse
          cx="100"
          cy="132"
          rx="10"
          ry="14"
          stroke={c}
          strokeWidth="6"
          fill="none"
        />

        {/* MUDRA Wordmark */}
        <text
          x="100"
          y="214"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Outfit', sans-serif"
          fontSize="29"
          fontWeight="900"
          letterSpacing="4"
          fill={c}
          className="group-hover:fill-[#C4A35A] transition-colors"
        >
          MUDRA
        </text>
      </svg>
    </Link>
  );
};
