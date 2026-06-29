// Lucide icons ইনস্টল করা না থাকলে npm i lucide-react করে নিন
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "../shared/Logo";
import NavLinks from "../shared/NavLinks";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Responsive Grid System */}
        {/* min-[320px] এ ২-কলাম এবং lg স্ক্রিনে ৩-কলাম layout হবে */}
        <div className="grid grid-cols-1 min-[320px]:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1: Logo + Tagline + Social Links */}
          {/* min-[320px]:col-span-2 দিয়ে ছোট ডিভাইসে এটি পুরো উইডথ জুড়ে থাকবে যাতে রিড্যাবিলিটি ঠিক থাকে */}
          <div className="max-w-xs min-[320px]:col-span-2 lg:col-span-1">
            <Logo size="md" textColor="text-white" />
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Book appointments, manage healthcare records, and connect with
              trusted doctors.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-5">
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#0EA5E9] text-white/70 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#0EA5E9] text-white/70 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#0EA5E9] text-white/70 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-[#0EA5E9] text-white/70 hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Reused nav links */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Links
            </p>
            <NavLinks
              direction="col"
              linkClassName="block py-1 text-sm text-white/70 hover:text-[#0EA5E9] transition-colors"
            />
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Contact
            </p>
            <ul className="space-y-1.5 text-sm text-white/70">
              <li className="break-all">support@medicareconnect.com</li>
              <li>+880 1XXX-XXXXXX</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} MediCare Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
