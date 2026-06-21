// Pure Server Component placeholder. Wire to your real Reviews
// collection later — same pattern as the homepage testimonials section.
export default function ReviewsSection({ doctorId }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 mt-6">
      <h2 className="text-lg font-bold text-[#1E293B] mb-1">Patient Reviews</h2>
      <p className="text-[#64748B] text-sm">
        Reviews for this doctor will appear here once connected to the Reviews collection.
      </p>
    </div>
  );
}
