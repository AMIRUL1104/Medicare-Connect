"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * serverFetch — matches the pattern already used elsewhere in this
 * project (see your existing serverFetch.js). Included here as a
 * reference; delete this file and import your real one instead.
 */
export async function serverFetch(path) {
  try {
    const res = await fetch(`${baseUrl}${path}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
