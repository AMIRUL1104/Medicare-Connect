// Pure Server Component — static SVG illustration, no JS needed.
// Custom illustration: doctor consulting a patient in a modern clinic room.

export default function HeroIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of a doctor consulting with a patient in a modern clinic"
    >
      <defs>
        <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="scrubsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Background blob */}
      <rect x="0" y="0" width="560" height="520" rx="32" fill="url(#heroBg)" />

      {/* Decorative dots */}
      <circle cx="60" cy="60" r="5" fill="#0EA5E9" opacity="0.3" />
      <circle cx="500" cy="80" r="6" fill="#10B981" opacity="0.3" />
      <circle cx="40" cy="440" r="4" fill="#10B981" opacity="0.3" />
      <circle cx="520" cy="450" r="5" fill="#0EA5E9" opacity="0.3" />

      {/* Floor / desk shadow */}
      <ellipse cx="280" cy="460" rx="200" ry="18" fill="#1E293B" opacity="0.06" />

      {/* ── Desk / counter ── */}
      <rect x="120" y="360" width="320" height="90" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="120" y="360" width="320" height="14" rx="7" fill="#0EA5E9" opacity="0.85" />

      {/* Clipboard on desk */}
      <rect x="150" y="330" width="60" height="78" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="162" y="322" width="36" height="12" rx="4" fill="#0EA5E9" />
      <line x1="160" y1="352" x2="200" y2="352" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="364" x2="200" y2="364" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="376" x2="188" y2="376" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <path d="M165 392l6 6 12-12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Stethoscope on desk */}
      <path
        d="M330 335c0 14 10 24 24 24s24-10 24-24"
        stroke="#0EA5E9"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="330" cy="333" r="5" fill="#0EA5E9" />
      <circle cx="378" cy="333" r="5" fill="#0EA5E9" />
      <circle cx="354" cy="362" r="8" fill="#1E293B" />
      <circle cx="354" cy="362" r="4" fill="#0EA5E9" />

      {/* ── Doctor (left figure, standing) ── */}
      <g>
        {/* Legs */}
        <rect x="150" y="300" width="18" height="60" rx="8" fill="#1E293B" />
        <rect x="180" y="300" width="18" height="60" rx="8" fill="#1E293B" />
        {/* Coat body */}
        <path
          d="M130 230c0-22 18-40 42-40h10c24 0 42 18 42 40v75c0 8-6 14-14 14H144c-8 0-14-6-14-14v-75z"
          fill="url(#coatGrad)"
          stroke="#E2E8F0"
          strokeWidth="2"
        />
        {/* Coat lapel lines */}
        <line x1="168" y1="195" x2="160" y2="300" stroke="#E2E8F0" strokeWidth="2" />
        <line x1="178" y1="195" x2="186" y2="300" stroke="#E2E8F0" strokeWidth="2" />
        {/* Inner scrub collar */}
        <path d="M165 195h18l-9 14z" fill="#0EA5E9" />
        {/* Arms */}
        <rect x="118" y="235" width="16" height="55" rx="8" fill="url(#coatGrad)" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="206" y="235" width="16" height="55" rx="8" fill="url(#coatGrad)" stroke="#E2E8F0" strokeWidth="2" />
        {/* Hands */}
        <circle cx="126" cy="294" r="9" fill="#F4C9A0" />
        <circle cx="214" cy="294" r="9" fill="#F4C9A0" />
        {/* Neck + head */}
        <rect x="160" y="178" width="20" height="18" rx="6" fill="#F4C9A0" />
        <circle cx="170" cy="160" r="26" fill="#F4C9A0" />
        {/* Hair */}
        <path d="M146 152c0-16 11-28 24-28s24 12 24 28c0-10-9-18-24-18s-24 8-24 18z" fill="#1E293B" />
        {/* Simple face */}
        <circle cx="161" cy="160" r="2.4" fill="#1E293B" />
        <circle cx="179" cy="160" r="2.4" fill="#1E293B" />
        <path d="M163 170c3 3 11 3 14 0" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Stethoscope around neck */}
        <path
          d="M154 196c0 10 7 16 16 16s16-6 16-16"
          stroke="#0EA5E9"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* ID badge */}
        <rect x="186" y="225" width="16" height="20" rx="3" fill="#0EA5E9" />
        <circle cx="194" cy="232" r="4" fill="#FFFFFF" />
      </g>

      {/* ── Patient (right figure, seated) ── */}
      <g>
        {/* Chair */}
        <rect x="370" y="280" width="14" height="80" rx="6" fill="#CBD5E1" />
        <rect x="450" y="280" width="14" height="80" rx="6" fill="#CBD5E1" />
        <rect x="362" y="270" width="110" height="16" rx="8" fill="#94A3B8" />
        {/* Legs */}
        <rect x="392" y="320" width="16" height="50" rx="8" fill="#0F172A" />
        <rect x="420" y="320" width="16" height="50" rx="8" fill="#0F172A" />
        {/* Torso / sweater */}
        <path
          d="M382 240c0-20 16-36 36-36h6c20 0 36 16 36 36v70c0 7-5 12-12 12h-58c-7 0-12-5-12-12v-70z"
          fill="url(#scrubsGrad)"
        />
        {/* Arms */}
        <rect x="372" y="248" width="15" height="50" rx="7" fill="url(#scrubsGrad)" />
        <rect x="438" y="248" width="15" height="50" rx="7" fill="url(#scrubsGrad)" />
        {/* Hands resting on lap */}
        <circle cx="380" cy="300" r="8" fill="#E8B084" />
        <circle cx="446" cy="300" r="8" fill="#E8B084" />
        {/* Neck + head */}
        <rect x="406" y="190" width="18" height="18" rx="6" fill="#E8B084" />
        <circle cx="415" cy="172" r="24" fill="#E8B084" />
        {/* Hair */}
        <path d="M392 168c-1-16 9-30 23-30s24 14 23 30c-3-9-12-16-23-16s-20 7-23 16z" fill="#7C4A2D" />
        {/* Face */}
        <circle cx="407" cy="172" r="2.2" fill="#1E293B" />
        <circle cx="423" cy="172" r="2.2" fill="#1E293B" />
        <path d="M409 182c2 2 8 2 10 0" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="399" cy="178" r="3" fill="#F4A8A8" opacity="0.5" />
        <circle cx="431" cy="178" r="3" fill="#F4A8A8" opacity="0.5" />
      </g>

      {/* Speech/care bubble above doctor */}
      <g>
        <rect x="80" y="90" width="86" height="46" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M110 136l-10 16 18-10z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M98 108h50M98 120h32" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Heart/pulse badge top-right */}
      <g>
        <circle cx="470" cy="150" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <path
          d="M452 150h10l5-12 8 22 5-10h8"
          stroke="#0EA5E9"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
