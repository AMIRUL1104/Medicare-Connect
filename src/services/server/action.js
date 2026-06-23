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
