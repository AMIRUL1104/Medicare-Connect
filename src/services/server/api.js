// ========== all companies for admin =====================

import { protectedFetch, serverFetch } from "../core/serverFetch";

//========================= get patients by id =====================
export const getPatientById = async (id) => {
  return protectedFetch(`/api/patients/${id}`);
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
  return protectedFetch(`/api/doctors/${id}?from=${query}`);
};

// ====================== get stats =====================
export const getStats = async () => {
  return serverFetch(`/api/stats`);
};

export const getDoctorStats = async (doctorId) => {
  return protectedFetch(`/api/stats/doctor?id=${doctorId}`);
};
//================= appointments related data fetching =====================
export const getAppointmentByAppointmentId = async (id) => {
  return protectedFetch(`/api/appointments/${id}?forAppointment=true`);
};
export const getAppointmentByPaymentId = async (id) => {
  return protectedFetch(`/api/appointments/${id}?forPayment=true`);
};
export const getAppointmentByPatientId = async (id) => {
  return protectedFetch(`/api/appointments/${id}?forPatient=true`);
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  return protectedFetch(`/api/appointments/${doctorId}?forDoctor=true`);
};

export const getApointmentsByDoctorId = async (doctorId, date) => {
  return protectedFetch(`/api/appointmentslots/${doctorId}?date=${date}`);
};

// ====================== payments related data fetching =====================
export const getPaymentsByDoctorId = async (doctorId) => {
  return protectedFetch(`/api/payment/${doctorId}?forDoctor=true`);
};

export const getPaymentsByPatientId = async (patientId) => {
  return protectedFetch(`/api/payment/${patientId}?forPatient=true`);
};

//===================== reviews related data fetching =====================
export const getReviewsByPatientId = async (patientId) => {
  return protectedFetch(`/api/reviews/${patientId}?forPatient=true`);
};
export const getReviewsByDoctorId = async (doctorId) => {
  return protectedFetch(`/api/reviews/${doctorId}?forDoctor=true`);
};

export const getAllReviews = async () => {
  return serverFetch(`/api/reviews`);
};

export const searchDoctorsFromServer = async (searchQuery) => {
  const result = await serverFetch(`/api/doctors/search?search=${searchQuery}`);

  return result;
};

// ===================== prescriptions related data fetching =====================

// ডক্টর এডিট পেজে যাওয়ার পর এগুলো আপডেট করবেন, শুরুতে ডিফল্ট স্টেট:
export const getPrescriptionsByDoctorId = async (doctorId) => {
  return protectedFetch(`/api/prescriptions/${doctorId}?forDoctor=true`);
};
export const getPrescriptionsByPatientId = async (patientId) => {
  return protectedFetch(`/api/prescriptions/${patientId}?forPatient=true`);
};

export const getPrescriptionById = async (id) => {
  return protectedFetch(`/api/prescriptions/${id}`);
};

// ===================== admin related data fetching =====================

export const getAdminStats = async () => {
  return protectedFetch(`/api/stats/admin`);
};

export const getAllUsers = async () => {
  return protectedFetch(`/api/users`);
};

export const getAllDoctors = async () => {
  return protectedFetch(`/api/doctors?allDoctors=true`);
};

export const getAllAppointment = async () => {
  return protectedFetch(`/api/appointments`);
};

export const getUserById = async (id) => {
  return protectedFetch(`/api/users/${id}`);
};

export const getPaymentHistory = async () => {
  return protectedFetch(`/api/payment`);
};

export const getTopRatedDocors = async () => {
  return protectedFetch(`/api/reviews/chartdata`);
};
