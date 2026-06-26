import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

// 💡 এটি একটি বিশুদ্ধ Server Component
function OpenModalButton({ id, className = "" }) {
  return (
    <Link
      href={`?prescriptionId=${id}`}
      scroll={false} // মোডাল খোলার সময় পেজ যেন স্ক্রল আপ না হয়
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all ${className}`}
    >
      <Eye className="size-3.5" />
      View Prescription
    </Link>
  );
}

export default OpenModalButton;
