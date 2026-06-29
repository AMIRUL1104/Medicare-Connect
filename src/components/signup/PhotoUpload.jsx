"use client";

import { useState, useRef } from "react";
import { uploadToImageBB, validateImageFile } from "@/lib/imagebb";
import Image from "next/image";

export default function PhotoUpload({
  onUploadComplete,
  onUploadStart,
  error,
}) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  async function processFile(file) {
    const validationError = validateImageFile(file);
    if (validationError) {
      onUploadComplete(null, validationError);
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFileName(
        file.name.length > 26 ? file.name.slice(0, 24) + "…" : file.name,
      );
    };
    reader.readAsDataURL(file);

    // Upload to ImageBB with simulated progress
    setUploading(true);
    setProgress(0);
    onUploadStart?.();

    // Fake progress tick while uploading
    const interval = setInterval(() => {
      setProgress((p) => (p >= 85 ? 85 : p + Math.random() * 18));
    }, 200);

    try {
      const url = await uploadToImageBB(file);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setUploading(false);
        onUploadComplete(url, null);
      }, 300);
    } catch (err) {
      clearInterval(interval);
      setUploading(false);
      setProgress(0);
      setPreview(null);
      onUploadComplete(null, err.message || "Upload failed. Please try again.");
    }
  }

  function handleFileChange(e) {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  }

  function resetPhoto(e) {
    e.stopPropagation();
    setPreview(null);
    setFileName("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
    onUploadComplete(null, null);
  }

  // zoneClass এর জন্য ডার্ক থিম কন্ডিশন (আপনার মূল কোডের সুবিধার্থে যোগ করা হলো)
  const zoneClass = [
    "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 bg-[#1E293B]/40 backdrop-blur-sm",
    isDragging
      ? "border-[#0EA5E9] bg-[#1E293B] shadow-[0_0_15px_rgba(14,165,233,0.1)]"
      : error
        ? "border-red-500/50 bg-red-950/10"
        : "border-gray-800 hover:border-[#0EA5E9] hover:bg-[#1E293B]/50",
  ].join(" ");

  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-200 mb-2">
        Profile Photo <span className="text-red-400">*</span>
        <span className="ml-1 text-gray-400 font-normal text-[11px]">
          JPG, PNG, WEBP · Max 5MB
        </span>
      </label>

      <div
        className={zoneClass}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Default state */}
        {!preview && !uploading && (
          <div>
            <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-gray-800 flex items-center justify-center mx-auto mb-3 shadow-[0_0_10px_rgba(14,165,233,0.05)]">
              <svg
                className="w-5 h-5 text-[#38BDF8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Drop photo here or{" "}
              <span className="text-[#38BDF8] font-semibold hover:underline">
                browse
              </span>
            </p>
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#38BDF8] font-medium">
              Uploading to ImageBB…
            </p>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #0EA5E9, #10B981)",
                }}
              />
            </div>
            <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
          </div>
        )}

        {/* Preview */}
        {preview && !uploading && (
          <div className="flex flex-col items-center gap-2">
            <Image
              width={20}
              height={20}
              src={preview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#10B981] ring-offset-2 ring-offset-[#111827]"
            />
            <p className="text-sm font-medium text-gray-100">{fileName}</p>
            <p className="text-xs text-[#34D399] font-semibold flex items-center gap-1">
              Uploaded successfully
            </p>
            <button
              type="button"
              onClick={resetPhoto}
              className="text-xs text-red-400 hover:underline mt-0.5"
            >
              Remove photo
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
          <span>⚠</span> {error.message}
        </p>
      )}
    </div>
  );
}
