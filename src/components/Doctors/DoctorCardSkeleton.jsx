// Pure Server Component. CSS-only pulse animation (Tailwind's `animate-pulse`),
// no JS needed — used inside Suspense fallback while data loads.
export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-full flex flex-col animate-pulse" aria-hidden="true">
      <div className="w-full h-44 bg-[#E2E8F0]" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-4 bg-[#E2E8F0] rounded w-3/4" />
        <div className="h-3 bg-[#E2E8F0] rounded w-1/2 mt-2" />
        <div className="h-3 bg-[#E2E8F0] rounded w-2/3 mt-2" />
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-[#E2E8F0] rounded w-full" />
          <div className="h-3 bg-[#E2E8F0] rounded w-4/5" />
        </div>
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="h-5 bg-[#E2E8F0] rounded w-16" />
          <div className="h-8 bg-[#E2E8F0] rounded-[8px] w-24" />
        </div>
      </div>
    </div>
  );
}
