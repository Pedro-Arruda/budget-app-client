import { Plus } from "phosphor-react";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../contexts/PlugglyContext";
import { currencyFormat } from "../../../functions/formatters";
import { ModalAddFixedExpense } from "./ModalAddFixedExpense";

interface IFields {
  description: string;
  amount: string;
}

interface IFixedExpenses {
  fixedExpenses?: IFixedExpense[];
}

export const FixedExpenses = ({ fixedExpenses }: IFixedExpenses) => {
  const { auth } = useAuth();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const [fields, setFields] = useState<IFields>({
    description: "",
    amount: "",
  });

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:3000/fixed-expenses/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          fixedExpense: { ...fields },
          accountId: auth?.account.id,
        }),
      });

      setIsOpenAddModal(false);
      setFields({ description: "", amount: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpenAddModal && (
        <ModalAddFixedExpense
          fields={fields}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}

      <div className="flex flex-col gap-3 bg-neutral-[#202020] rounded-md border-[1px] border-neutral-700 py-2 px-5">
        {fixedExpenses && (
          <div>
            <div className="flex justify-between items-center mt-1">
              <h2 className="font-semibold text-xl">Fixed Expenses</h2>
              <Button className="py-0" onClick={() => setIsOpenAddModal(true)}>
                Add <Plus />
              </Button>
            </div>
            <div className="mt-3">
              {fixedExpenses.map((fixedExpense) => (
                <div className="flex gap-3" key={fixedExpense.id}>
                  <p className="font-semibold">{fixedExpense.description} - </p>
                  <p className="font-semibold">
                    {currencyFormat(fixedExpense.amount)}
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
