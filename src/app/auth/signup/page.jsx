import LeftPanel from "@/components/Signup/LeftPanel";
import SignupForm from "@/components/Signup/SignupForm";

export const metadata = {
  title: "Sign Up – MediCare Connect",
  description:
    "Create your MediCare Connect account. Book appointments, manage healthcare records, and connect with trusted doctors.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Left — hero panel (40%) */}
      <LeftPanel />

      {/* Right — form panel (60%) */}
      <div className="lg:w-3/5 flex items-start lg:items-center justify-center py-8 px-4 overflow-y-auto">
        <div className="w-full max-w-120">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
