import { useEffect, useState } from "react";
import { DefaultLayout } from "../../components/DefaultLayout";
import { useAuth } from "../../contexts/PlugglyContext";
import { fetchApi } from "../../functions/fetchApi";
import { CreditCart } from "./components/CreditCart";
import { FixedExpenses } from "./components/FixedExpenses";
import { Incomes } from "./components/Incomes";
import { LatestTransacitons } from "./components/LatestTransacitons";
import { MonthReports } from "./components/monthReports";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState<any>({
    month: String(new Date().getMonth() + 1),
    year: String(new Date().getFullYear()),
  });

  const { auth } = useAuth();
  const [monthsReport, setMonthsReport] = useState<string[][]>();
  const [account, setAccount] = useState<IAccount>();
  const [fixedExpenses, setFixedExpenses] = useState<IFixedExpense[]>();
  const [incomes, setIncomes] = useState<IIncome[]>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const fetchReports = async () => {
    if (auth) {
      const reports = await fetchApi("/transactions/months-report", "POST", {
        itemId: auth.itemId,
      });

      const formattedReport: string[][] = reports.map((report: any) => {
        return [...Object.values(report)];
      });

      setMonthsReport(formattedReport);
    }
  };

  const fetchAccount = async () => {
    if (auth) {
      const account = await fetchApi("/accounts", "POST", {
        itemId: auth.itemId,
      });

      setAccount(account);
    }
  };

  const fetchFixedExpenses = async () => {
    if (auth) {
      const fixedExpenses = await fetchApi("/fixed-expenses", "POST", {
        accountId: auth.account.id,
      });

      setFixedExpenses(fixedExpenses);
    }
  };

  const fetchIncomes = async () => {
    if (auth) {
      const incomes = await fetchApi("/incomes", "POST", {
        accountId: auth.account.id,
      });

      setIncomes(incomes);
    }
  };

  const fetchTransations = async () => {
    const { month, year } = fields;
    if (auth) {
      const transactions = await fetchApi("/transactions", "POST", {
        itemId: auth?.itemId,
        month,
        year,
        accountId: auth?.account.id,
      });

      setTransactions(transactions);
    }
  };

  const fetchAll = async () => {
    setIsLoading(true);

    const promisses = [
      fetchReports(),
      fetchAccount(),
      fetchFixedExpenses(),
      fetchIncomes(),
      fetchTransations(),
    ];

    await Promise.all(promisses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
    console.log("monthsReport", monthsReport);
  }, [fields, auth]);

  return (
    <DefaultLayout>
      {isLoading ? (
        <div className="h-full flex flex-col gap-3 justify-center items-center">
          <div className="loader-spinner" />
          <p className="text-xl font-semibold">Uploading your data</p>
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 bg-[#1d1d21]  p-5 rounded-md border-[3px] border-neutral-800 min-w-96 max-w-96">
            <CreditCart account={account} />
            <FixedExpenses fixedExpenses={fixedExpenses} />
            <Incomes incomes={incomes} />
          </div>
          <div className="flex flex-col gap-5 flex-1 bg-[#1d1d21]  p-5 rounded-md border-[3px] border-neutral-800">
            <LatestTransacitons
              transactions={transactions}
              fields={fields}
              setFields={setFields}
            />
            <MonthReports monthsReport={monthsReport} />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};
