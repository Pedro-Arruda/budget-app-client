const getAccessTokenAndItemId = async (authorizationCode: string) => {
  const response = await fetch("https://api.pluggy.ai/auth/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: "a83fe026-fdda-4b50-b99b-31f2639433ab",
      client_secret: "b8f866ef-b636-41d2-91f6-27953dd75c7f",
      code: authorizationCode,
      redirect_uri: "http://127.0.0.1:5173/",
      grant_type: "authorization_code",
    }),
  });
  const data = await response.json();
  return { accessToken: data.access_token, itemId: data.item_id };
};
