import {
  CalendarClock,
  ShieldCheck,
  LockKeyhole,
  CreditCard,
  ActivitySquare,
  FileText,
} from "lucide-react";

export const benefits = [
  {
    id: "booking",
    Icon: CalendarClock,
    heading: "24/7 Appointment Booking",
    description:
      "Schedule consultations any time of day or night — no waiting on hold. Our real-time availability engine shows confirmed slots instantly.",
    stat: "Avg. booked in 90 sec",
  },
  {
    id: "doctors",
    Icon: ShieldCheck,
    heading: "Verified Specialist Doctors",
    description:
      "Every doctor on our platform passes a multi-step credential check. Look for the Verified badge and consult with full confidence.",
    stat: "2,400+ verified doctors",
  },
  {
    id: "records",
    Icon: LockKeyhole,
    heading: "Secure Health Records",
    description:
      "Your data is encrypted end-to-end and stored in compliance with HIPAA standards. Only you and your care team can access your records.",
    stat: "AES-256 encrypted",
  },
  {
    id: "payments",
    Icon: CreditCard,
    heading: "Seamless Stripe Payments",
    description:
      "Pay consultation fees securely via Stripe. Instant confirmation, full refund support, and itemised receipts sent straight to your inbox.",
    stat: "0% payment failures",
  },
  {
    id: "status",
    Icon: ActivitySquare,
    heading: "Real-time Consultation Status",
    description:
      "Track your appointment from confirmed to in-progress to completed in one dashboard. Get notified the moment your doctor is ready.",
    stat: "Live status updates",
  },
  {
    id: "prescriptions",
    Icon: FileText,
    heading: "Digital Prescriptions",
    description:
      "Receive signed digital prescriptions directly after your consultation. Download, share with a pharmacy, or store for future reference.",
    stat: "Issued within minutes",
  },
];
