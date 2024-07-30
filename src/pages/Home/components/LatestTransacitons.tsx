import { Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Button";
import { Table } from "../../../components/Table";
import { getNextAndPreviousYears } from "../../../functions/getDates";
import { sumKeyOfObject } from "../../../functions/sumOfKeyObject";
import { months } from "../../../utils/months";
import { ModalAddTransactions } from "./ModalAddTransaction";

interface IFieldsNewTransaction {
  date: string | Date;
  description: string;
  amount: string;
}

interface IFields {
  month: string;
  year: string;
}

export const LatestTransacitons = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const [fieldsNewTransactions, setFieldsNewTransaction] =
    useState<IFieldsNewTransaction>({
      description: "",
      amount: "",
      date: new Date(),
    });

  const [fields, setFields] = useState<IFields>({
    month: String(new Date().getMonth() + 1),
    year: String(new Date().getFullYear()),
  });

  const [transactions, setTransactions] = useState<ITransaction[]>();
  const timeoutRef = useRef<number | null>(null);

  const fetchTransations = async () => {
    const { month, year } = fields;

    const response = await fetch(`http://localhost:3000/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        itemId: "cc884117-f5b2-4774-97f9-694dd0b8762f",
        month,
        year,
      }),
    });

    const data: ITransaction[] = await response.json();

    setTransactions(data);
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:3000/transactions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(fieldsNewTransactions),
      });

      setIsOpenAddModal(false);
      setFieldsNewTransaction({
        description: "",
        amount: "",
        date: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      await fetchTransations();
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fields.month, fields.year]);

  return (
    <div className="flex flex-col gap-5">
      {isOpenAddModal && (
        <ModalAddTransactions
          fields={fieldsNewTransactions}
          setFields={setFieldsNewTransaction}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Latest Transactions</h1>
        <Button className="py-1" onClick={() => setIsOpenAddModal(true)}>
          Add <Plus />
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <form className="flex justify-between items-center w-full">
          {transactions && (
            <div className="flex gap-3 text-xl font-semibold py-2 px-5 bg-neutral-800 rounded-md border-[1px] border-neutral-700">
              <p>Total: </p>
              <p>{sumKeyOfObject(transactions, "amount")}</p>
            </div>
          )}
          <div className="flex gap-5 items-center">
            <select
              name="month"
              id="month"
              value={fields.month}
              onChange={(e) => setFields({ ...fields, month: e.target.value })}
              className="bg-transparent py-1.5 px-8 border-2 border-neutral-800 rounded-md outline-none text-neutral-300"
            >
              {months.map((month) => (
                <option
                  value={month.value}
                  className="bg-neutral-800 py-1.5 px-8 border-2 border-neutral-800 rounded-md outline-none text-neutral-300"
                >
                  {month.label}
                </option>
              ))}
            </select>

            <select
              name="year"
              id="year"
              value={fields.year}
              onChange={(e) => setFields({ ...fields, year: e.target.value })}
              className="bg-transparent py-1.5 px-8 border-2 border-neutral-800 rounded-md outline-none text-neutral-300"
            >
              {getNextAndPreviousYears(new Date().getFullYear()).map((year) => (
                <option
                  value={year}
                  className="bg-neutral-800 py-1.5 px-8 border-2 border-neutral-800 rounded-md outline-none text-neutral-300"
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="w-full flex justify-between gap-5">
        {transactions && (
          <>
            <Table
              columns={[
                { label: "Description", key: "description", type: "w-full" },
                { label: "Amount", key: "amount", type: "currency" },
                { label: "Category", key: "category" },
                { label: "Date", key: "date", type: "date" },
              ]}
              items={transactions}
              className="mb-3 w-full  max-h-[250px] "
            />
          </>
        )}
      </div>
    </div>
  );
};
