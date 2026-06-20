import FadeIn from "@/components/Doctors/FadeIn";
import DoctorCard from "@/components/Doctors/DoctorCard";
import EmptyState from "@/components/Doctors/EmptyState";
import Pagination from "@/components/Doctors/Pagination";
import FiltersBar from "@/components/Doctors/FiltersBar";
import { getLimitedDoctors } from "@/services/server/api";
/**
 * DoctorResults — async Server Component.
 * Now calls the real getLimitedDoctors() (which hits /api/doctors via
 * serverFetch) instead of mock data. Response shape from the fixed
 * backend route: { doctors, total, totalPages, currentPage }.
 */
export default async function DoctorResults({ searchParams }) {
  // 👈 প্রথমে পুরো searchParams অবজেক্টটিকে await করুন
  const resolvedSearchParams = (await searchParams) || {};

  // এবার অবজেক্ট থেকে সাধারণ নিয়মে ডেটা নিন
  const search = resolvedSearchParams.search || "";
  const sort = resolvedSearchParams.sort || "";
  const page = Number(resolvedSearchParams.page);

  const { doctors, total, totalPages, currentPage } = await getLimitedDoctors({
    search,
    sort,
    page,
    limit: 6,
    verificationStatus: "verified",
  });

  return (
    <>
      <FiltersBar total={total} />

      {doctors.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {doctors.map((doctor, i) => (
              <li key={doctor._id} className="h-full">
                <FadeIn direction="up" delay={i * 0.06}>
                  <DoctorCard doctor={doctor} />
                </FadeIn>
              </li>
            ))}
          </ul>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
