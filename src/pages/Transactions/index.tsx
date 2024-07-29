import Pluggy from "pluggy-js";
import { DefaultLayout } from "../../components/DefaultLayout";
import { Table } from "../../components/Table";
import { useAuth } from "../../contexts/PlugglyContext";
import { useEffect, useState } from "react";

export const Transactions = () => {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>();

  // const fetchTransations = async () => {
  //   if (auth) {
  //     const client = new Pluggy(auth?.accessToken || "");
  //     const account = await client.fetchAccounts(auth?.item.id);
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         "X-API-KEY": `${auth?.apiKey}`,
  //       },
  //     };
  //     fetch(
  //       `https://api.pluggy.ai/transactions?accountId=${account.results[0].id}`,
  //       options
  //     )
  //       .then((response) => response.json())
  //       .then((response) => setTransactions(response.results))
  //       .catch((err) => console.error(err));
  //   }
  // };

  useEffect(() => {
    // fetchTransations();
  }, [auth]);

  return (
    <DefaultLayout>
      {/* {showPluggyConnect && (
        <PluggyConnect
          connectToken={token || ""}
          onSuccess={(data) => {
            onSuccess(data);
          }}
        />
      )} */}

      <h1 className="text-3xl font-semibold py-4">Transactions</h1>

      {transactions && (
        <Table
          columns={[
            { label: "Description", key: "description", type: "w-full" },
            { label: "Category", key: "category" },
            { label: "Amount", key: "amount" },
          ]}
          items={transactions}
        />
      )}

      <div className="absolute right-0 top-5">
        {/* <button onClick={() => login()}>Login</button> */}
        {/* <button onClick={() => fetchTransations()}>Get transactions</button> */}
      </div>
    </DefaultLayout>
  );
};
