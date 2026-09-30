import React from 'react';

interface WorldAutoLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'header' | 'footer' | 'lg';
}

export const WorldAutoLogo: React.FC<WorldAutoLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'header',
}) => {
  // Signature automotive racing red
  const red = '#DE1A22';
  // Deep navy for light headers, crisp pure white for dark footers (no background card)
  const textColor = variant === 'dark' ? '#FFFFFF' : '#051C48';

  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    header: 'h-10 sm:h-12 md:h-13 lg:h-14',
    footer: 'h-11 sm:h-13 md:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 10 460 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform`}
        aria-label="World Auto"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,900&display=swap');
              .wa-racing-title {
                font-family: 'Kanit', 'Montserrat', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                font-weight: 900;
                font-style: italic;
              }
            `}
          </style>
        </defs>

        {/* ================= LINE 1: World (Single unified word, W connected naturally to orld) ================= */}
        <g id="line-world">
          {/* Aerodynamic wing attached to top-left tip of W */}
          <polygon
            points="38,26 6,18 18,44 42,40"
            fill={red}
          />

          {/* Unified text: W and orld together in one flow with automatic font kerning */}
          <text
            x="32"
            y="114"
            fontSize="120"
            letterSpacing="-2px"
            className="wa-racing-title"
          >
            <tspan fill={red}>W</tspan>
            <tspan fill={textColor}>orld</tspan>
          </text>
        </g>

        {/* ================= LINE 2: Auto (Single unified word with underline under uto) ================= */}
        <g id="line-auto">
          {/* Unified text: A and uto together in one flow */}
          <text
            x="138"
            y="204"
            fontSize="118"
            letterSpacing="-2px"
            className="wa-racing-title"
          >
            <tspan fill={red}>A</tspan>
            <tspan fill={textColor}>uto</tspan>
          </text>

          {/* Red underline continuous with A running under uto */}
          <polygon
            points="218,206 422,206 406,220 218,220"
            fill={red}
          />
        </g>
      </svg>
    </div>
  );
};
