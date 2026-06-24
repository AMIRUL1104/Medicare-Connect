import { getUserSession } from "@/services/core/session";
import {
  getAppointmentByPatientId,
  getPaymentsByPatientId,
} from "@/services/server/api";
import React from "react";

async function PatientDashboardPage() {
  const user = await getUserSession();
  const { totalPaid, history } = await getPaymentsByPatientId(user.id);
  const allAppointments = await getAppointmentByPatientId(user.id);
  return <div>PatientDashboardPage</div>;
}

export default PatientDashboardPage;

// result of getPaymentsByPatientId :
// {
//   "success": true,
//   "totalPaid": 800,
//   "history": [
//     {
//       "_id": "6a3ac5feb855b4c270897a98",
//       "appointmentId": "6a3ac5b2b855b4c270897a97",
//       "patientId": "6a34257c6f84e13c1d72ad86",
//       "doctorId": "6a3390e8e02dc6fdbfd5287c",
//       "amount": 800,
//       "transactionId": "pi_3TlYMnEOASEQ6VQY07hrRaz2",
//       "paymentDate": "2026-06-30",
//       "doctorName": "Dr. Nusrat Jahan",
//       "patientName": "Amirul Islam",
//       "appointmentDate": "2026-06-30",
//       "appointmentTime": "11:00 AM"
//     }
//   ]
// }
