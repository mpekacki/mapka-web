interface IconProps {
  size?: number;
}

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const ArrowLeftIcon = ({ size = 20 }: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

export const RefreshIcon = ({ size = 18 }: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

export const LocateIcon = ({ size = 18 }: IconProps) => (
  <svg {...svgProps(size)}>
    <line x1="2" x2="5" y1="12" y2="12" />
    <line x1="19" x2="22" y1="12" y2="12" />
    <line x1="12" x2="12" y1="2" y2="5" />
    <line x1="12" x2="12" y1="19" y2="22" />
    <circle cx="12" cy="12" r="7" />
  </svg>
);

export const ChevronUpIcon = ({ size = 18 }: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const ChevronDownIcon = ({ size = 18 }: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ size = 18 }: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
