/**
 * Uploads an image File to ImageBB and returns the hosted URL.
 * Set NEXT_PUBLIC_IMAGEBB_KEY in your .env.local
 */
export async function uploadToImageBB(file) {
  const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_KEY;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_IMAGEBB_KEY is not set in .env.local");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("ImageBB upload failed. Please try again.");
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error?.message || "ImageBB upload failed.");
  }

  return data.data.url; // e.g. "https://i.ibb.co/xxxxx/photo.jpg"
}

/**
 * Validates a file before uploading.
 * Returns an error string or null if valid.
 */
export function validateImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, JPEG, PNG, WEBP formats are accepted.";
  }
  if (file.size > maxSize) {
    return "File size must be under 5MB.";
  }
  return null;
}
