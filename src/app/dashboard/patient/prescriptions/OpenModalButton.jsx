import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

function OpenModalButton({ id, className = "" }) {
  return (
    <Link
      href={`?prescriptionId=${id}`}
      scroll={false}
      className={`inline-flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] sm:text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap active:scale-[0.98] ${className}`}
    >
      <Eye className="size-3.5 shrink-0" />
      <span>View Prescription</span>
    </Link>
  );
}

export default OpenModalButton;
