import Link from "next/link";
export const metadata = {
  title: "Access Denied | MediCare Connect",
  description:
    "Security Warning: You do not have the required permissions to access this restricted dashboard or resource.",
};
export default function Unauthorized() {
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-[#0E121F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (Premium SaaS Feel) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-rose-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-blue-600/5 rounded-full blur-[110px] pointer-events-none" />

      {/* 📦 আনঅথরাইজড কন্টেইনার কার্ড */}
      <div className="w-full max-w-md bg-[#161D30] border border-gray-800/80 rounded-2xl p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] relative z-10">
        {/* 🔒 গ্লোয়িং লক আইকন (Pure SVG for Server Component) */}
        <div className="mx-auto w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(244,63,94,0.15)] animate-pulse">
          <svg
            className="w-7 h-7 text-rose-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* ⚠️ এরর কোড ব্যাজ */}
        <span className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-[11px] font-bold text-rose-400 tracking-widest uppercase mb-3">
          Error 401: Unauthorized
        </span>

        {/* টাইটেল ও ডেসক্রিপশন */}
        <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
          Access Denied
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          You do not have permission to view this page. Please sign in with an
          authorized account or contact support if you think this is a mistake.
        </p>

        {/* ℹ️ হেল্প জোন */}
        <div className="bg-[#0E121F]/60 border border-gray-800/40 rounded-xl p-4 mb-8 text-xs text-gray-400 leading-normal text-left flex items-start gap-2.5">
          <span className="text-rose-400 font-bold">Note:</span>
          <span>
            If you recently switched accounts or upgraded your plan, try logging
            out and logging back in to refresh your session.
          </span>
        </div>

        {/* 🔘 অ্যাকশন বাটন গ্রুপ */}
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all"
          >
            Sign In to Medicare Connnect
          </Link>

          <Link
            href="/"
            className="w-full h-11 bg-transparent border border-gray-800 hover:bg-gray-900 text-gray-300 font-medium text-sm rounded-xl flex items-center justify-center active:scale-[0.98] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
