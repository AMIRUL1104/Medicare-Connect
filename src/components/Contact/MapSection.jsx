// Pure Server Component. An <iframe> embed needs no client JS.
export default function MapSection() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden h-full flex flex-col">
      <div className="p-6 lg:p-8 pb-4">
        <h3 className="text-xl lg:text-2xl font-bold text-[#1E293B] mb-1.5">
          Visit Our Office
        </h3>
        <p className="text-[#64748B] text-sm">
          {` Drop by during support hours — we're happy to help in person too.`}
        </p>
      </div>

      <div className="flex-1 min-h-70 relative">
        <iframe
          title="MediCare Connect office location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4479.543997930222!2d91.73286438718905!3d24.70847166513617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375105f49595064b%3A0x360b82781eb478f7!2sThames%20Tower!5e0!3m2!1sen!2sus!4v1781980283975!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="p-5 border-t border-[#E2E8F0] flex items-start gap-2.5">
        <svg
          className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-xs text-[#64748B]">
          House 12, Road 5, Banani, Dhaka 1213, Bangladesh
        </p>
      </div>
    </div>
  );
}
