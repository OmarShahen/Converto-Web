type IconProps = {
  height: string;
  width: string;
};

export const WebIcon = ({ width = "42", height = "42" }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ minWidth: "42px", alignSelf: "center" }}
    >
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#paint0_linear_WebIcon)"
      />
      <rect x="5" y="6" width="14" height="12" rx="2" fill="white" />
      <rect x="5" y="6" width="14" height="2.5" rx="2" fill="#4A5568" />
      <circle cx="7" cy="7.2" r="0.4" fill="#FED7D7" />
      <circle cx="8.2" cy="7.2" r="0.4" fill="#FEF5E7" />
      <circle cx="9.4" cy="7.2" r="0.4" fill="#C6F6D5" />
      <rect x="7" y="10" width="2" height="1.5" rx="0.3" fill="#2D3748" />
      <rect x="10" y="10" width="1.5" height="1.5" rx="0.3" fill="#2D3748" />
      <rect x="12.5" y="10" width="2.5" height="1.5" rx="0.3" fill="#2D3748" />
      <rect x="7" y="13" width="8" height="0.8" rx="0.4" fill="#E2E8F0" />
      <rect x="7" y="14.5" width="6" height="0.8" rx="0.4" fill="#E2E8F0" />
      <rect x="7" y="16" width="4" height="0.8" rx="0.4" fill="#E2E8F0" />
      <defs>
        <linearGradient
          id="paint0_linear_WebIcon"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#667EEA" />
          <stop offset="1" stopColor="#764BA2" />
        </linearGradient>
      </defs>
    </svg>
  );
};