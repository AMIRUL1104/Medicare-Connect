"use server";
import { getUserToken } from "./session";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token} `,
      }
    : {};
  return header;
};

export async function serverFetch(path) {
  try {
    const res = await fetch(`${baseUrl}${path}`);

    // রেসপন্স ঠিক না থাকলে এরর থ্রো করবে
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // বা আপনার প্রয়োজন মতো এরর অবজেক্ট রিটার্ন করতে পারেন
  }
}

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });

  return res.json();
};
