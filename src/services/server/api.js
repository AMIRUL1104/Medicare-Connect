// ========== all companies for admin =====================

import { serverFetch } from "../core/serverFetch";

/**
 * getLimitedDoctors — calls the real /api/doctors endpoint via serverFetch.
 *
 * Returns: { doctors, total, totalPages, currentPage } — matches the
 * fixed backend route's response shape. If serverFetch fails (returns
 * null), we fall back to a safe empty shape so the UI doesn't crash.
 */

//========================= get patients by id =====================
export const getPatientById = async (id) => {
  return serverFetch(`/api/patients/${id}`);
};

export const getLimitedDoctors = async ({
  search = "",
  sort = "",
  page,
  limit = 6,
  verificationStatus = "verified",
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (verificationStatus) params.set("verificationStatus", verificationStatus);

  const result = await serverFetch(`/api/doctors?${params.toString()}`);

  // serverFetch returns null on failure — guard against that here
  if (!result) {
    return { doctors: [], total: 0, totalPages: 1, currentPage: page };
  }

  return result;
};

// ======================get doctors by id =====================
export const getDoctorById = async (id, query) => {
  return serverFetch(`/api/doctors/${id}?from=${query}`);
};

// ====================== get stats =====================
export const getStats = async () => {
  return serverFetch(`/api/stats`);
};

export const getDoctorStats = async (doctorId) => {
  return serverFetch(`/api/stats/doctor?id=${doctorId}`);
};
//================= appointments related data fetching =====================
export const getAppointmentByPaymentId = async (id) => {
  return serverFetch(`/api/appointments/${id}?forPayment=true`);
};
export const getAppointmentByPatientId = async (id) => {
  return serverFetch(`/api/appointments/${id}?forPatient=true`);
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  return serverFetch(`/api/appointments/${doctorId}?forDoctor=true`);
};

export const getApointmentsByDoctorId = async (doctorId, date) => {
  return serverFetch(`/api/appointmentslots/${doctorId}?date=${date}`);
};

// ====================== payments related data fetching =====================
export const getPaymentsByDoctorId = async (doctorId) => {
  return serverFetch(`/api/payment/${doctorId}?forDoctor=true`);
};

export const getPaymentsByPatientId = async (patientId) => {
  return serverFetch(`/api/payment/${patientId}?forPatient=true`);
};

//===================== reviews related data fetching =====================
export const getReviewsByPatientId = async (patientId) => {
  return serverFetch(`/api/reviews/${patientId}?forPatient=true`);
};
export const getReviewsByDoctorId = async (doctorId) => {
  return serverFetch(`/api/reviews/${doctorId}?forDoctor=true`);
};
