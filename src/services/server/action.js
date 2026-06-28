import { serverMutation } from "../core/server";
import { getAppointmentByAppointmentId } from "./api";

// ============patient related data fetching =============
export const AddNewPatient = async (data) => {
  return serverMutation("/api/patients", data);
};

// ============doctor related data fetching =============
export const AddNewDoctor = async (data) => {
  return serverMutation("/api/doctors", data);
};

export const updateDoctorScheduleAction = async (data) => {
  return serverMutation("/api/doctors/schedule", data, "PATCH");
};

export const updateDoctorProfile = async (data) => {
  return serverMutation("/api/doctors/profile", data, "PATCH");
};

// ============app related data fetching =============
export const AddNewAppointment = async (data) => {
  return serverMutation("/api/appointments", data);
};

export const updateAppointmentStatus = async (data) => {
  return serverMutation("/api/appointments", data, "PATCH");
};

export const newPayment = async (data) => {
  return serverMutation("/api/payment", data);
};

// ===============review related data fetching =================
export const addNewReview = async (data) => {
  return serverMutation("/api/reviews", data);
};
export const updateReview = async (data) => {
  return serverMutation("/api/reviews", data, "PATCH");
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const deleteReviewById = async (id) => {
  const response = await fetch(`${baseUrl}/api/reviews/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return result;
};

// ===============prescription related data fetching =================
export const createPrescription = async (appointmentId) => {
  const appointment = await getAppointmentByAppointmentId(appointmentId);

  const {
    doctorId,
    patientId,
    doctorName,
    patientName,
    date, // রোগী কোন তারিখে ডক্টর দেখিয়েছিল তার রেকর্ড
    slot,
    symptoms, // প্রেসক্রিপশনে হিস্ট্রি হিসেবে দেখানোর জন্য খুবই কাজের
  } = appointment;

  const newPrescription = {
    appointmentId,
    doctorId,
    patientId,
    doctorName,
    patientName,
    appointmentDate: date,
    appointmentSlot: slot,
    symptoms,

    // ডক্টর এডিট পেজে যাওয়ার পর এগুলো আপডেট করবেন, শুরুতে ডিফল্ট স্টেট:
    diagnosis: "",
    medications: [
      {
        name: "",
        dosage: "",
        duration: "",
      },
    ],
    notes: "",
    createdAt: new Date(), // "2026-06-26T09:28:29.000Z" (অটো জেনারেটেড কারেন্ট টাইম)
  };

  return serverMutation("/api/prescriptions", newPrescription);
};

export const updatePrescriptionData = async (data) => {
  return serverMutation("/api/prescriptions", data, "PATCH");
};

export const deleteUser = async (id) => {
  const response = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();

  return result;
};

export const suspendUser = async (id, data) => {
  return serverMutation(`/api/users/${id}`, data, "PATCH");
};
