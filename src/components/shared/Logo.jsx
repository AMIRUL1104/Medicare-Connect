import Link from "next/link";

/**
 * Reusable MediCare Connect logo.
 * Used in both Navbar and Footer.
 *
 * @param {string} size - "sm" | "md" | "lg"
 * @param {boolean} showText - show "MediCare Connect" text next to icon
 * @param {string} textColor - tailwind text color class for the wordmark
 */
export default function Logo({
  size = "md",
  showText = true,
  textColor = "text-[#a5bee0]",
}) {
  const sizes = {
    sm: { box: "w-7 h-7", icon: 18, text: "text-sm" },
    md: { box: "w-9 h-9", icon: 22, text: "text-lg" },
    lg: { box: "w-12 h-12", icon: 28, text: "text-xl" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="medicareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <path
          d="M12 48V16L24 32L36 16V48"
          stroke="url(#medicareGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M52 22C49 18 43 16 38 16C28.06 16 20 24.06 20 34C20 43.94 28.06 52 38 52C44 52 50 49 52 44"
          stroke="#1E293B"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="16" r="4" fill="#0EA5E9" />
      </svg>

      {showText && (
        <span className={`font-bold tracking-tight ${s.text} ${textColor}`}>
          MediCare Connect
        </span>
      )}
    </Link>
  );
}
