// import Pluggy from "pluggy-js";
// import { useAuth } from "../contexts/PlugglyContext";
// import { useEffect, useState } from "react";
// import { refreshApiKey } from "./refreshApiKey";

// interface FetchApiResult<T> {
//   items: T[];
//   refetch: () => void;
// }

// export const usePlugglyFetch = (url: string) => {
//   const { auth } = useAuth();
//   const [items, setItems] = useState();

//   const fetchTransations = <T>(endpoint: string): FetchApiResult<T> {
//     if (auth) {
//       try {
//         const client = new Pluggy(auth?.accessToken || "");
//         const account = await client.fetchAccounts(auth?.item.id);
//         const options = {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             "X-API-KEY": `${auth?.apiKey}`,
//           },
//         };

//         const response = await fetch(`https://api.pluggy.ai/${url}`, options);
//       } catch (err: any) {
//         if (err.response.status == 403) {
//           await refreshApiKey(auth);
//           await fetchTransations(url);
//         }
//       }

//       //   const data = await response.json();

//       //   setItems(data);

//       // .then((response) => response.json())
//       // .then((response) => setTransactions(response.results))
//       // .catch((err) => console.error(err));
//     }
//   };

//   useEffect(() => {
//     fetchTransations(url);
//   }, []);

//   return { items };
// };

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/PlugglyContext";

interface FetchApiResult<T> {
  items: T[];
  refetch?: () => void;
}

export const usePlugglyFetch = <T>(endpoint: string): FetchApiResult<T> => {
  const { auth } = useAuth();

  const [items, setItems] = useState<T[]>([]);
  const url = `https://api.pluggy.ai/${endpoint}`;

  const fetchData = async () => {
    try {
      // const client = new Pluggy(auth?.accessToken || "");
      // const account = await client.fetchAccounts(auth?.item.id);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": `${auth?.apiKey}`,
        },
      };

      const response = await fetch(`https://api.pluggy.ai/${url}`, options);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { items };
};
