// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FileText, Edit, User, Calendar, Search } from "lucide-react";
// import { getPrescriptionsByDoctorId } from "@/services/server/api";

// import { authClient } from "@/lib/auth-client";

// export default function PrescriptionListPage() {
//   const router = useRouter();
//   const [prescriptions, setPrescriptions] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { session, isPending, error, refetch } = authClient.useSession();
//   const doctorId = session?.user?.id;
//   console.log("doctorId", doctorId, session);
//   if (isPending) {
//     return (
//       <div className="text-center p-12 text-gray-400 ">
//         Loading prescriptions...
//         <br />
//         {/* <Spinner size="3" /> */}
//       </div>
//     );
//   }

//   useEffect(() => {
//     async function loadPrescriptions() {
//       try {
//         const data = await getPrescriptionsByDoctorId(doctorId);
//         console.log(data);

//         if (data.ok) {
//           setPrescriptions(data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     loadPrescriptions();
//     // ডামি ডাটা দিয়ে টেস্ট করার জন্য:
//     // setPrescriptions([
//     //   {
//     //     _id: "6a3bf150c8a6fff262107e9f",
//     //     patientName: "Amirul Islam",
//     //     diagnosis: "High Fever",
//     //     date: "2026-06-26",
//     //   },
//     //   {
//     //     _id: "7b3bf150c8a6fff262107e9x",
//     //     patientName: "Fatima Al-Rashid",
//     //     diagnosis: "",
//     //     date: "2026-06-25",
//     //   }, // ডায়াগনোসিস খালি মানে নতুন অটো-তৈরি হওয়া
//     // ]);
//     // setLoading(false);
//   }, []);

//   const filteredData = prescriptions.filter((p) =>
//     p.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-[#0E121F] text-gray-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* হেডার */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161D30] border border-gray-800 p-6 rounded-2xl shadow-xl">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
//               <FileText className="size-6" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-white">
//                 Prescription Management
//               </h1>
//               <p className="text-xs text-gray-400 mt-0.5">
//                 Manage, write and update all patient prescriptions
//               </p>
//             </div>
//           </div>

//           {/* সার্চ বার */}
//           <div className="relative max-w-xs w-full">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search by patient name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-[#0E121F] border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-200 focus:outline-hidden focus:border-emerald-500 transition-colors"
//             />
//           </div>
//         </div>

//         {/* প্রেসক্রিপশন টেবিল */}
//         <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#0E121F]/40">
//                   <th className="py-4 px-6">Patient</th>
//                   <th className="py-4 px-6">Date</th>
//                   <th className="py-4 px-6">Status / Diagnosis</th>
//                   <th className="py-4 px-6 text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/60 text-sm">
//                 {filteredData.map((prescription) => (
//                   <tr
//                     key={prescription._id}
//                     className="hover:bg-[#1c243b]/40 transition-colors group"
//                   >
//                     <td className="py-4 px-6 font-medium text-gray-200">
//                       <div className="flex items-center gap-2">
//                         <User className="size-4 text-gray-500" />
//                         {prescription.patientName}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-gray-400">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="size-4 text-gray-600" />
//                         {prescription.date}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       {prescription.diagnosis ? (
//                         <span className="text-gray-300">
//                           {prescription.diagnosis}
//                         </span>
//                       ) : (
//                         <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs rounded-md font-medium">
//                           Pending Setup
//                         </span>
//                       )}
//                     </td>
//                     <td className="py-4 px-6 text-right">
//                       <button
//                         onClick={() =>
//                           router.push(
//                             `/dashboard/prescription/edit/${prescription._id}`,
//                           )
//                         }
//                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all"
//                       >
//                         <Edit className="size-3.5" />
//                         {prescription.diagnosis ? "Edit" : "Make Prescription"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

import { FileText } from "lucide-react";
import PrescriptionTable from "./DoctorPrescriptionsClient";
import { getUserSession } from "@/services/core/session";
import SearchPrescription from "./SearchPrescription";
import { getPrescriptionsByDoctorId } from "@/services/server/api";

export const metadata = {
  title: "Create & Manage Prescriptions | MediCare Connect",
  description:
    "Issue digital prescriptions, add medical guidelines, and view previous patient health histories.",
};

// 💡 এটি একটি Server Component
async function PrescriptionListPage({ searchParams }) {
  const user = await getUserSession();

  // URL থেকে সার্চ কুয়েরি নেওয়া (যেমন: ?search=Amirul)
  const query = searchParams?.search || "";

  // ডক্টরের আইডি ও সার্চ কুয়েরি দিয়ে ডাটাবেজ থেকে সরাসরি ডাটা ফেচ করা
  const prescriptions = await getPrescriptionsByDoctorId(user.id);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* হেডার ও সার্চ এরিয়া */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161D30] border border-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <FileText className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Prescription Management
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage, write and update all patient prescriptions
              </p>
            </div>
          </div>

          {/* 🔍 আলাদা করা সার্চ কম্পোনেন্ট */}
          <SearchPrescription placeholder="Search by patient name..." />
        </div>

        {/* 📊 আলাদা করা টেবিল কম্পোনেন্ট */}
        <PrescriptionTable prescriptions={prescriptions || []} />
      </div>
    </div>
  );
}

export default PrescriptionListPage;
