type PawIconProps = {
  className?: string;
  size?: number;
};

export function PawIcon({ className = "", size = 24 }: PawIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 17.5c-1.5 2.5-5 2.5-5 0 0-1.5 2-4 5-4s5 2.5 5 4c0 2.5-3.5 2.5-5 0z" />
      <circle cx="7" cy="9" r="2" />
      <circle cx="10" cy="6" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="17" cy="9" r="2" />
    </svg>
  );
}
