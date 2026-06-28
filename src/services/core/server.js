"use server";

import { authHeader } from "./serverFetch";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST") => {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
    // console.log("API Result:", result);
  } catch (error) {
    // console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
