const PATHS = {
  graphic: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </>
  ),
  branding: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  websites: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M1 20h22l-2-4H3z" />
    </>
  ),
  "chevron-down": <path d="M6 9l6 6 6-6" />,
};

export default function Icon({ name = "graphic", size = 24, strokeWidth = 1.6, style, ...rest }) {
  const glyph = PATHS[name] || PATHS.graphic;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--ink)", flexShrink: 0, ...style }}
      {...rest}
    >
      {glyph}
    </svg>
  );
}
