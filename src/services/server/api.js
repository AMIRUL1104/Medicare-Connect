// ========== all companies for admin =====================

import { serverFetch } from "../core/serverFetch";

export const getAllDoctors = async () => {
  return serverFetch(`/api/doctors`);
};
export const getLimetedDoctors = async () => {
  return serverFetch(`/api/doctors?limit=6`);
};

export const getPlanById = async (planId) => {
  return serverFetch(`/api/plans?plan_id=${planId}`);
};
