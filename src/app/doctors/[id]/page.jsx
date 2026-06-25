import BookingCard from "@/components/Booking/BookingCard";
import DoctorInfoSection from "@/components/Doctor-Details/DoctorInfoSection";
import ReviewsSection from "@/components/Doctor-Details/ReviewsSection";
import { getUserSession } from "@/services/core/session";
import { getDoctorById } from "@/services/server/api";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctor = await getDoctorById(id, "id");
  return {
    title: doctor
      ? `Book ${doctor.doctorName} – MediCare Connect`
      : "Doctor Not Found",
  };
}

/**
 * Doctor booking page — Server Component.
 *
 * Fetches doctor data server-side (single source of truth). Layout:
 * desktop = 65% doctor info / 35% sticky booking card, side by side.
 * mobile = stacked: doctor info → booking card → reviews.
 *
 * BookingCard is the only major client component — it owns the
 * interactive multi-step booking flow (date → slot → symptoms → confirm).
 */
export default async function DoctorBookingPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  const doctor = await getDoctorById(id, "id");
  console.log(user);

  console.log("profile", doctor);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[65%_35%] gap-6 lg:gap-8 items-start">
          {/* Left / top: Doctor info (65% desktop) */}
          <div>
            <DoctorInfoSection doctor={doctor} />
            {/* Reviews below doctor info on both desktop and mobile per the left column */}
            <ReviewsSection doctorId={doctor._id} />
          </div>

          {/* Right / below: Sticky booking card (35% desktop) */}
          <div>
            <BookingCard doctor={doctor} user={user} />
          </div>
        </div>
      </div>
    </main>
  );
}
