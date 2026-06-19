import Logo from "@/components/Shared/Logo";
import NavLinks from "@/components/Shared/NavLinks";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">

          {/* Logo + tagline */}
          <div className="max-w-xs">
            <Logo size="md" textColor="text-white" />
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Book appointments, manage healthcare records, and connect with trusted doctors.
            </p>
          </div>

          {/* Reused nav links */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Links
            </p>
            <NavLinks
              direction="col"
              linkClassName="block py-1 text-sm text-white/70 hover:text-[#0EA5E9] transition-colors"
            />
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Contact
            </p>
            <ul className="space-y-1.5 text-sm text-white/70">
              <li>support@medicareconnect.com</li>
              <li>+880 1XXX-XXXXXX</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} MediCare Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
