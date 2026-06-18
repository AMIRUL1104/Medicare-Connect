"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data) => {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // console.log("API Result:", result);

    return result;
  } catch (error) {
    // console.log(error);

    return {
      error: "Something went wrong!",
    };
  }
};
