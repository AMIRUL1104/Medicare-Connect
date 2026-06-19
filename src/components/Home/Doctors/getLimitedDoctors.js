/**
 * getLimitedDoctors — mock data for now.
 *
 * Replace with a real query later, e.g.:
 *
 *   import { db } from "@/lib/db";
 *   export async function getLimitedDoctors() {
 *     return db.doctor.findMany({
 *       where: { verificationStatus: "verified" },
 *       take: 6,
 *       orderBy: { createdAt: "desc" },
 *     });
 *   }
 *
 * Called from a Server Component — no client-side fetch needed.
 */
export async function getLimitedDoctors() {
  await new Promise((resolve) => setTimeout(resolve, 30)); // simulate DB latency

  return [
    {
      id: "1",
      doctorName: "Dr. Farhan Kabir",
      specialization: "Cardiology",
      qualifications: "MBBS, MD (Cardiology), FCPS",
      experience: 12,
      consultationFee: 1200,
      hospitalName: "City Medical Center",
      profileImage: "https://i.pravatar.cc/300?img=13",
      availableDays: ["Sun", "Mon", "Wed", "Thu"],
      verificationStatus: "verified",
    },
    {
      id: "2",
      doctorName: "Dr. Nusrat Jahan",
      specialization: "Dermatology",
      qualifications: "MBBS, DDV",
      experience: 8,
      consultationFee: 900,
      hospitalName: "Green Life Hospital",
      profileImage: "https://i.pravatar.cc/300?img=45",
      availableDays: ["Sat", "Sun", "Tue"],
      verificationStatus: "verified",
    },
    {
      id: "3",
      doctorName: "Dr. Shafiq Islam",
      specialization: "Pediatrics",
      qualifications: "MBBS, DCH, FCPS",
      experience: 15,
      consultationFee: 800,
      hospitalName: "Square Hospital",
      profileImage: "https://i.pravatar.cc/300?img=51",
      availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      verificationStatus: "verified",
    },
    {
      id: "4",
      doctorName: "Dr. Anika Chowdhury",
      specialization: "Orthopedics",
      qualifications: "MBBS, MS (Ortho)",
      experience: 10,
      consultationFee: 1000,
      hospitalName: "United Hospital",
      profileImage: "https://i.pravatar.cc/300?img=33",
      availableDays: ["Mon", "Wed", "Fri"],
      verificationStatus: "pending",
    },
    {
      id: "5",
      doctorName: "Dr. Imran Hasan",
      specialization: "Psychiatry",
      qualifications: "MBBS, MD (Psychiatry)",
      experience: 9,
      consultationFee: 1100,
      hospitalName: "Apollo Hospital",
      profileImage: "https://i.pravatar.cc/300?img=56",
      availableDays: ["Sun", "Tue", "Thu", "Sat"],
      verificationStatus: "verified",
    },
    {
      id: "6",
      doctorName: "Dr. Farzana Yasmin",
      specialization: "General Medicine",
      qualifications: "MBBS, FCPS (Medicine)",
      experience: 11,
      consultationFee: 700,
      hospitalName: "Evercare Hospital",
      profileImage: "https://i.pravatar.cc/300?img=29",
      availableDays: ["Sat", "Sun", "Mon", "Wed"],
      verificationStatus: "verified",
    },
    {
      id: "7",
      doctorName: "Dr. Tahmina Akhter",
      specialization: "Gynecology",
      qualifications: "MBBS, FCPS (Gynae)",
      experience: 14,
      consultationFee: 1300,
      hospitalName: "Ibn Sina Hospital",
      profileImage: "https://i.pravatar.cc/300?img=48",
      availableDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      verificationStatus: "verified",
    },
  ];
}
