/**
 * getPlatformStats — simulates a database query.
 *
 * Replace this with a real query later, e.g.:
 *
 *   import { db } from "@/lib/db";
 *   export async function getPlatformStats() {
 *     const [doctors, patients, appointments, reviews] = await Promise.all([
 *       db.user.count({ where: { role: "doctor" } }),
 *       db.user.count({ where: { role: "patient" } }),
 *       db.appointment.count(),
 *       db.review.count(),
 *     ]);
 *     return { totalDoctors: doctors, totalPatients: patients, totalAppointments: appointments, totalReviews: reviews };
 *   }
 *
 * Called from a Server Component, so this can stay an async function
 * with no client-side fetch/loading state needed.
 */
export async function getPlatformStats() {
  // Simulate network/DB latency
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Mock data — replace with real DB counts
  return {
    totalDoctors: 2400,
    totalPatients: 50000,
    totalAppointments: 120000,
    totalReviews: 18500,
  };
}
