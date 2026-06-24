import { serverMutation } from "../core/server";

export const AddNewPatient = async (data) => {
  return serverMutation("/api/patients", data);
};
export const AddNewDoctor = async (data) => {
  return serverMutation("/api/doctors", data);
};
export const AddNewAppointment = async (data) => {
  return serverMutation("/api/appointments", data);
};
export const updateAppointmentStatus = async (data) => {
  return serverMutation("/api/appointments", data, "PATCH");
};
export const newPayment = async (data) => {
  return serverMutation("/api/payment", data);
};

// review related data fetching
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
