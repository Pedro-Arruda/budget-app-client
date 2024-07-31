export const fetchApi = async (
  endpoint: string,
  method: "POST" | "GET" = "GET",
  body?: Record<string, any>
) => {
  const baseURL = "http://localhost:3000";
  const response = await fetch(`${baseURL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data: any = await response.json();

  if (!data || !response.ok) {
    throw new Error("Erro to fetch");
  }

  return data;
};
