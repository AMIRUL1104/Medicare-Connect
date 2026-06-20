import { Suspense } from "react";
import FadeIn from "@/components/doctors/FadeIn";
import DoctorResults from "@/components/doctors/DoctorResults";
import DoctorResultsSkeleton from "@/components/doctors/DoctorResultsSkeleton";

export const metadata = {
  title: "Find Doctors – MediCare Connect",
  description:
    "Search and book appointments with verified doctors across all specializations.",
};

/**
 * FindDoctorsPage — Server Component.
 *
 * `searchParams` comes from Next.js App Router automatically — no
 * client-side fetch needed. Suspense is keyed by the serialized
 * searchParams so each new search/sort/page triggers a fresh suspend
 * + skeleton, instead of showing stale data while the new fetch runs.
 */
export default async function FindDoctorsPage({ searchParams }) {
  // 👈 এখানেও searchParams অবজেক্টটিকে await করুন
  const resolvedSearchParams = (await searchParams) || {};
  const suspenseKey = JSON.stringify(resolvedSearchParams);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <FadeIn direction="up">
          <div className="mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">
              Find a Doctor
            </h1>
            <p className="text-[#64748B] mt-2 text-sm lg:text-base">
              Search verified specialists by name or specialty, then book in
              minutes.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8">
          <Suspense key={suspenseKey} fallback={<DoctorResultsSkeleton />}>
            <DoctorResults searchParams={resolvedSearchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
