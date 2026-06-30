import Image from "next/image";
import { Star } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  const {
    patientName,
    patientPhoto,
    rating,
    testimonial,
    doctorName,
    specialization,
  } = review;

  return (
    <article
      className="shrink-0 w-[320px] bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 select-none"
      aria-label={`Review by ${patientName}`}
    >
      {/* Rating */}
      <StarRating rating={rating} />

      {/* Testimonial text */}
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-1">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Patient info */}
      <div className="flex items-center gap-3">
        {/* <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E8F4FD]">
          <Image
            src={patientPhoto || }
            alt={`Photo of ${patientName}`}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div> */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E8F4FD]">
          {patientPhoto ? (
            <Image
              src={patientPhoto}
              alt={`Photo of ${patientName}`}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            // ফটো না থাকলে নামের প্রথম অক্ষর বা কোনো আইকন দেখাতে পারেন
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
              {patientName?.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-slate-800 text-sm font-semibold truncate">
            {patientName}
          </p>
          <p className="text-[#1A9DD9] text-xs truncate">
            {doctorName} · {specialization}
          </p>
        </div>
      </div>
    </article>
  );
}
