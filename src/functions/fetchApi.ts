export const fetchApi = async (
  endpoint: string,
  method: "POST" | "GET" = "GET",
  body?: Record<string, any>
) => {
  const baseURL = import.meta.env.VITE_API_URL;
  console.log(baseURL);

  const response = await fetch(`https://app-budget-api.vercel.app${endpoint}`, {
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
