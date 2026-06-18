const baseUrl = process.env.NODE_ENV;

export const AddNewPatient = async (data) => {
  const res = await fetch(`${baseUrl}/api/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};
