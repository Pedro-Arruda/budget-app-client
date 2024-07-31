import { Plus } from "phosphor-react";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../contexts/PlugglyContext";
import { currencyFormat } from "../../../functions/formatters";
import { ModalAddIncome } from "./ModalAddIncome";

interface IFields {
  description: string;
  amount: string;
  everyMonth: boolean;
  month: number | null;
  year: number | null;
}

interface IIncomesProps {
  incomes?: IIncome[];
}

export const Incomes = ({ incomes }: IIncomesProps) => {
  const { auth } = useAuth();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const [fields, setFields] = useState<IFields>({
    description: "",
    amount: "",
    everyMonth: false,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleSubmit = async () => {
    const formattedFields = {
      income: {
        description: fields.description,
        amount: fields.amount,
        everyMonth: fields.everyMonth,
        ...(!fields.everyMonth && { month: fields.month }),
        ...(!fields.everyMonth && { year: fields.year }),
      },
      accountId: auth?.account.id,
    };

    try {
      await fetch(`http://localhost:3000/incomes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formattedFields),
      });

      setIsOpenAddModal(false);
      setFields({
        description: "",
        amount: "",
        everyMonth: false,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpenAddModal && (
        <ModalAddIncome
          fields={fields}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}

      <div className="flex flex-col gap-3 bg-neutral-[#202020] rounded-md border-[1px] border-neutral-700 py-2 px-5">
        {incomes && (
          <div>
            <div className="flex justify-between items-center mt-1">
              <h2 className="font-semibold text-xl">Incomes</h2>
              <Button className="py-0" onClick={() => setIsOpenAddModal(true)}>
                Add <Plus />
              </Button>
            </div>
            <div className="mt-3">
              {incomes.map((income) => (
                <div className="flex gap-3" key={income.id}>
                  <p className="font-semibold">{income.description} - </p>
                  <p className="font-semibold">
                    {currencyFormat(income.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
