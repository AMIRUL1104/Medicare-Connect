import FadeIn from "@/components/contact/FadeIn";
import FaqItem from "@/components/contact/FaqItem";

// Server Component. The heading, layout, and FAQ data are server-rendered.
// Each <FaqItem> is its own tiny client island for expand/collapse —
// the section itself never needs "use client".

const FAQS = [
  {
    question: "How do I book an appointment?",
    answer:
      "Go to the Find Doctors page, search by specialty or doctor name, choose an available time slot, and confirm your booking with secure payment.",
  },
  {
    question: "Can I get a refund if I cancel my appointment?",
    answer:
      "Yes — cancellations made at least 24 hours before your scheduled appointment are eligible for a full refund. Refunds are processed within 5–7 business days.",
  },
  {
    question: "Are the doctors on MediCare Connect verified?",
    answer:
      "Every doctor on our platform goes through a credential verification process before their profile is published, so you can book with confidence.",
  },
  {
    question: "How do I access my digital prescription?",
    answer:
      "After your consultation, your prescription appears in your patient dashboard under 'Prescriptions' — you can view or download it anytime.",
  },
  {
    question: "What if I need urgent medical help?",
    answer:
      "MediCare Connect is designed for scheduled consultations, not emergencies. If you're experiencing a medical emergency, please call your local emergency number immediately.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 lg:px-8">

        <FadeIn direction="up">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#D1FAE5] text-[#10B981] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Frequently Asked Questions
            </span>
            <h2 id="faq-heading" className="text-2xl lg:text-3xl font-bold text-[#1E293B]">
              Got Questions? We've Got Answers
            </h2>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
