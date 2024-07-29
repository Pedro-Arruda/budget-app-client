import { useEffect, useState } from "react";
import { DefaultLayout } from "../../components/DefaultLayout";
import { CreditCart } from "./components/CreditCart";
import { FixedExpenses } from "./components/FixedExpenses";
import { Incomes } from "./components/Incomes";
import { LatestTransacitons } from "./components/LatestTransacitons";
import { MonthReports } from "./components/monthReports";

export const Home = () => {
  const [monthsReport, setMonthsReport] = useState<string[][]>();
  const [account, setAccount] = useState<IAccount>();
  const [fixedExpenses, setFixedExpenses] = useState<IFixedExpense[]>();
  const [incomes, setIncomes] = useState<IIncome[]>();

  const fetchReports = async () => {
    const response = await fetch(
      `http://localhost:3000/transactions/months-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          itemId: "cc884117-f5b2-4774-97f9-694dd0b8762f",
        }),
      }
    );

    const data: IMonthsReport[] = await response.json();

    if (data) {
      const formattedReport: string[][] = data.map((report) => {
        return [...Object.values(report)];
      });

      console.log(formattedReport);

      setMonthsReport(formattedReport);
    }
  };

  const fetchAccount = async () => {
    const response = await fetch(`http://localhost:3000/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        itemId: "cc884117-f5b2-4774-97f9-694dd0b8762f",
      }),
    });

    const data: IAccount = await response.json();

    if (data) {
      setAccount(data);
    }
  };

  const fetchFixedExpenses = async () => {
    const response = await fetch(`http://localhost:3000/fixed-expenses`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    const data: IFixedExpense[] = await response.json();

    if (data) {
      setFixedExpenses(data);
    }
  };

  const fetchIncomes = async () => {
    const response = await fetch(`http://localhost:3000/incomes`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    const data: IIncome[] = await response.json();

    if (data) {
      setIncomes(data);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchAccount();
    fetchFixedExpenses();
    fetchIncomes();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 bg-[#1d1d21]  p-5 rounded-md border-[3px] border-neutral-800 min-w-96 max-w-96">
          <CreditCart account={account} />
          <FixedExpenses fixedExpenses={fixedExpenses} />
          <Incomes incomes={incomes} />
        </div>
        <div className="flex flex-col gap-5 flex-1 bg-[#1d1d21]  p-5 rounded-md border-[3px] border-neutral-800">
          <LatestTransacitons />
          {monthsReport && <MonthReports monthsReport={monthsReport} />}
        </div>
      </div>
    </DefaultLayout>
  );
};
