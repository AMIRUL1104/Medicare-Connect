import LeftPanel from "@/components/signup/LeftPanel";
import SignupForm from "@/components/signup/SignupForm";

export const metadata = {
  title: "Sign Up – MediCare Connect",
  description:
    "Create your MediCare Connect account. Book appointments, manage healthcare records, and connect with trusted doctors.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[#0B1120] relative overflow-hidden">
      {/* SaaS Global Cyan Glowing Effect Layer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-[#0EA5E9]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Left — hero panel (40%) */}
      <LeftPanel />

      {/* Right — form panel (60%) */}
      <div className="lg:w-3/5 flex items-start lg:items-center justify-center py-8 px-4 overflow-y-auto relative z-10">
        <div className="w-full max-w-120">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
