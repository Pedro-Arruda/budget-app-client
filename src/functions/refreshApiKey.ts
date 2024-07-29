import Pluggy from "pluggy-js";
import { IAuth, useAuth } from "../contexts/PlugglyContext";
import { useState } from "react";

export const refreshApiKey = async (auth: IAuth) => {
  const { updateAuth } = useAuth();
  const [apiKey, setApiKey] = useState<any>();

  const options = {
    method: "POST",
    body: JSON.stringify({
      clientId: "a83fe026-fdda-4b50-b99b-31f2639433ab",
      clientSecret: "b8f866ef-b636-41d2-91f6-27953dd75c7f",
    }),
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  await fetch("https://api.pluggy.ai/auth", options)
    .then((response) => response.json())
    .then((response) => setApiKey(response))
    .catch((err) => console.error(err));

  const baseClient = new Pluggy(apiKey.apiKey);
  const { accessToken } = await baseClient.createConnectToken();
  updateAuth({ ...auth, accessToken, apiKey: apiKey.apiKey });
  //   setToken(accessToken);

  //   if (!auth?.item) {
  //     setShowPluggyConect(true);
  //   }
};
