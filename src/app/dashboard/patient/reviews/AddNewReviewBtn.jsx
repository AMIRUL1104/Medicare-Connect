"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";

function AddNewReviewBtn() {
  return (
    <Button
      color="primary"
      onClickCapture={() => {
        if (typeof window !== "undefined" && window.openAddReviewModal) {
          window.openAddReviewModal();
        }
      }}
      endContent={<Plus className="size-4" />}
      className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold rounded-xl px-5 h-11 self-start sm:self-auto transition-all shadow-lg shadow-sky-500/10"
    >
      Add New Review
    </Button>
  );
}

export default AddNewReviewBtn;
