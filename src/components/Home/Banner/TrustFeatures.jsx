// Pure Server Component. Static list, no interactivity needed.

const TRUST_FEATURES = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Verified Doctors",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "Secure Payments",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Digital Prescriptions",
  },
];

export default function TrustFeatures() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8" aria-label="Platform trust features">
      {TRUST_FEATURES.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-sm text-[#1E293B]">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#D1FAE5] text-[#10B981] shrink-0">
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
