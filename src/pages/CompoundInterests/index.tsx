import { useState } from "react";
import { Button } from "../../components/Button";
import { DefaultLayout } from "../../components/DefaultLayout";
import { ResultsCompoundInterests } from "./components/ResultsCompoundInterests";

interface IFields {
  initialValue: string;
  monthContribution: string;
  totalMonths: string;
  monthTax: string;
}

export interface IRespondeCompoundInterest {
  totalAmount: string;
  totalFees: string;
  totalInvested: string;
}

export const CompoundInterest = () => {
  const [compoundInterest, setCompoundInterest] =
    useState<IRespondeCompoundInterest>();

  const [fields, setFields] = useState<IFields>({
    initialValue: "",
    monthContribution: "",
    monthTax: "",
    totalMonths: "",
  });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formattedFields = {
      initialValue: Number(fields.initialValue),
      monthContribution: Number(fields.monthContribution),
      monthTax: Number(fields.monthTax),
      totalMonths: Number(fields.totalMonths),
    };
    const response = await fetch(`http://localhost:3000/compound-interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formattedFields),
    });

    const data: IRespondeCompoundInterest = await response.json();

    if (data) setCompoundInterest(data);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5 px-5">
        <h1 className="text-3xl font-semibold">Calculator</h1>
        <form className="flex gap-5 items-end">
          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={fields.initialValue}
              placeholder="Initial value"
              onChange={(e) =>
                setFields({ ...fields, initialValue: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              placeholder="Month contribution"
              value={fields.monthContribution}
              onChange={(e) =>
                setFields({ ...fields, monthContribution: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={fields.monthTax}
              placeholder="Month tax"
              onChange={(e) =>
                setFields({ ...fields, monthTax: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={fields.totalMonths}
              placeholder="Total months"
              onChange={(e) =>
                setFields({ ...fields, totalMonths: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <Button className="py-1.5 px-10" onClick={(e) => handleSubmit(e)}>
            Calculate
          </Button>
        </form>

        <ResultsCompoundInterests compoundInterest={compoundInterest} />
      </div>
    </DefaultLayout>
  );
};
