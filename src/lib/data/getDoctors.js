/**
 * getDoctors — mock data + server-side filter/sort/paginate logic.
 *
 * Replace the mock array + in-memory logic with a real DB query later,
 * e.g. with Mongo:
 *
 *   export async function getDoctors({ search, specialization, sort, page, limit }) {
 *     const query = { verificationStatus: "verified" };
 *     if (search) query.doctorName = { $regex: search, $options: "i" };
 *     if (specialization) query.specialization = specialization;
 *
 *     const sortMap = {
 *       "fee-asc": { consultationFee: 1 }, "fee-desc": { consultationFee: -1 },
 *       "experience-asc": { experience: 1 }, "experience-desc": { experience: -1 },
 *       "rating-desc": { rating: -1 },
 *     };
 *
 *     const total = await db.doctor.countDocuments(query);
 *     const doctors = await db.doctor
 *       .find(query)
 *       .sort(sortMap[sort] || {})
 *       .skip((page - 1) * limit)
 *       .limit(limit);
 *
 *     return { doctors, total };
 *   }
 *
 * Called from a Server Component with parsed searchParams — no client
 * fetch needed.
 */

const MOCK_DOCTORS = [
  { id: "1", doctorName: "Dr. Farhan Kabir", specialization: "Cardiology", qualifications: "MBBS, MD (Cardiology), FCPS", experience: 12, consultationFee: 1200, hospitalName: "City Medical Center", profileImage: "https://i.pravatar.cc/300?img=13", rating: 4.8, verificationStatus: "verified" },
  { id: "2", doctorName: "Dr. Nusrat Jahan", specialization: "Dermatology", qualifications: "MBBS, DDV", experience: 8, consultationFee: 900, hospitalName: "Green Life Hospital", profileImage: "https://i.pravatar.cc/300?img=45", rating: 4.6, verificationStatus: "verified" },
  { id: "3", doctorName: "Dr. Shafiq Islam", specialization: "Pediatrics", qualifications: "MBBS, DCH, FCPS", experience: 15, consultationFee: 800, hospitalName: "Square Hospital", profileImage: "https://i.pravatar.cc/300?img=51", rating: 4.9, verificationStatus: "verified" },
  { id: "4", doctorName: "Dr. Anika Chowdhury", specialization: "Orthopedics", qualifications: "MBBS, MS (Ortho)", experience: 10, consultationFee: 1000, hospitalName: "United Hospital", profileImage: "https://i.pravatar.cc/300?img=33", rating: 4.5, verificationStatus: "verified" },
  { id: "5", doctorName: "Dr. Imran Hasan", specialization: "Psychiatry", qualifications: "MBBS, MD (Psychiatry)", experience: 9, consultationFee: 1100, hospitalName: "Apollo Hospital", profileImage: "https://i.pravatar.cc/300?img=56", rating: 4.7, verificationStatus: "verified" },
  { id: "6", doctorName: "Dr. Farzana Yasmin", specialization: "General Medicine", qualifications: "MBBS, FCPS (Medicine)", experience: 11, consultationFee: 700, hospitalName: "Evercare Hospital", profileImage: "https://i.pravatar.cc/300?img=29", rating: 4.4, verificationStatus: "verified" },
  { id: "7", doctorName: "Dr. Tahmina Akhter", specialization: "Gynecology", qualifications: "MBBS, FCPS (Gynae)", experience: 14, consultationFee: 1300, hospitalName: "Ibn Sina Hospital", profileImage: "https://i.pravatar.cc/300?img=48", rating: 4.9, verificationStatus: "verified" },
  { id: "8", doctorName: "Dr. Rezaul Karim", specialization: "Neurology", qualifications: "MBBS, MD (Neurology)", experience: 18, consultationFee: 1500, hospitalName: "Labaid Hospital", profileImage: "https://i.pravatar.cc/300?img=60", rating: 4.8, verificationStatus: "verified" },
  { id: "9", doctorName: "Dr. Sumaiya Binte Noor", specialization: "Ophthalmology", qualifications: "MBBS, DO", experience: 7, consultationFee: 850, hospitalName: "Islamia Eye Hospital", profileImage: "https://i.pravatar.cc/300?img=24", rating: 4.3, verificationStatus: "verified" },
  { id: "10", doctorName: "Dr. Kamrul Hasan", specialization: "Dentistry", qualifications: "BDS, FCPS (Dental)", experience: 6, consultationFee: 600, hospitalName: "Dental Care Center", profileImage: "https://i.pravatar.cc/300?img=8", rating: 4.2, verificationStatus: "verified" },
  { id: "11", doctorName: "Dr. Mehjabin Sultana", specialization: "Cardiology", qualifications: "MBBS, MD (Cardiology)", experience: 16, consultationFee: 1400, hospitalName: "National Heart Foundation", profileImage: "https://i.pravatar.cc/300?img=41", rating: 4.9, verificationStatus: "verified" },
  { id: "12", doctorName: "Dr. Aminul Islam", specialization: "Orthopedics", qualifications: "MBBS, MS (Ortho), FCPS", experience: 13, consultationFee: 1050, hospitalName: "CMH Dhaka", profileImage: "https://i.pravatar.cc/300?img=53", rating: 4.6, verificationStatus: "verified" },
  { id: "13", doctorName: "Dr. Rumana Akter", specialization: "Pediatrics", qualifications: "MBBS, DCH", experience: 5, consultationFee: 650, hospitalName: "Shishu Hospital", profileImage: "https://i.pravatar.cc/300?img=36", rating: 4.1, verificationStatus: "verified" },
  { id: "14", doctorName: "Dr. Mahbubur Rahman", specialization: "General Medicine", qualifications: "MBBS, MD (Medicine)", experience: 20, consultationFee: 750, hospitalName: "Dhaka Medical College", profileImage: "https://i.pravatar.cc/300?img=11", rating: 4.7, verificationStatus: "verified" },
  { id: "15", doctorName: "Dr. Lubna Ferdousi", specialization: "Dermatology", qualifications: "MBBS, MD (Dermatology)", experience: 9, consultationFee: 950, hospitalName: "Skin Care Clinic", profileImage: "https://i.pravatar.cc/300?img=20", rating: 4.5, verificationStatus: "verified" },
  { id: "16", doctorName: "Dr. Nayeem Chowdhury", specialization: "Neurology", qualifications: "MBBS, MD (Neurology), FCPS", experience: 11, consultationFee: 1250, hospitalName: "NeuroCare Hospital", profileImage: "https://i.pravatar.cc/300?img=17", rating: 4.6, verificationStatus: "verified" },
];

const SORT_MAP = {
  "fee-asc": (a, b) => a.consultationFee - b.consultationFee,
  "fee-desc": (a, b) => b.consultationFee - a.consultationFee,
  "experience-asc": (a, b) => a.experience - b.experience,
  "experience-desc": (a, b) => b.experience - a.experience,
  "rating-desc": (a, b) => b.rating - a.rating,
};

export async function getDoctors({
  search = "",
  sort = "",
  page = 1,
  limit = 6,
} = {}) {
  // Simulate DB/network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = MOCK_DOCTORS.filter((d) => d.verificationStatus === "verified");

  // Search by name OR specialization (case-insensitive)
  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (d) =>
        d.doctorName.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort && SORT_MAP[sort]) {
    results = [...results].sort(SORT_MAP[sort]);
  }

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

  const start = (currentPage - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return {
    doctors: paginated,
    total,
    totalPages,
    currentPage,
  };
}
