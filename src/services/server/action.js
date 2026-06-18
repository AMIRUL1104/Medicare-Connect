import { serverMutation } from "../core/server";

export const AddNewPatient = async (data) => {
  return serverMutation("/api/patients", data);
};
export const AddNewDoctor = async (data) => {
  return serverMutation("/api/doctors", data);
};
