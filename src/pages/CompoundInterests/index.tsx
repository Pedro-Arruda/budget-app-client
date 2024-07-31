import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { DefaultLayout } from "../../components/DefaultLayout";
import { Table } from "../../components/Table";
import { ResultsCompoundInterests } from "./components/ResultsCompoundInterests";

interface IFields {
  initialValue: string;
  monthContribution: string;
  totalMonths: string;
  monthTax: string;
}

export const CompoundInterest = () => {
  const [compoundInterest, setCompoundInterest] =
    useState<IResponseCompoundInterest>();

  const [multipleCompoundInterest, setMultipleCompoundInterest] =
    useState<IRespondeMultipleCompoundInterest[]>();

  const [columns, setColumns] = useState<IColumn[]>();

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

    const responseCompoundInterests = await fetch(
      `http://localhost:3000/compound-interests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formattedFields),
      }
    );

    const dataCompoundInterest: IResponseCompoundInterest =
      await responseCompoundInterests.json();

    if (dataCompoundInterest) setCompoundInterest(dataCompoundInterest);

    const responseMultipleCompoundInterests = await fetch(
      `http://localhost:3000/compound-interests/multiple`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formattedFields),
      }
    );

    const dataMultipleCompoundInterests: IRespondeMultipleCompoundInterest[] =
      await responseMultipleCompoundInterests.json();

    if (dataMultipleCompoundInterests)
      setMultipleCompoundInterest(dataMultipleCompoundInterests);
  };

  useEffect(() => {
    if (multipleCompoundInterest) {
      const columns: IColumn[] = Object.keys(multipleCompoundInterest[0]).map(
        (column) => ({
          label: column,
          key: column,
          type: "currency",
        })
      );

      setColumns(columns);
    }
  }, [multipleCompoundInterest]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5 px-5">
        <h1 className="text-3xl font-semibold">Calculator</h1>
        <form className="flex gap-5 items-end">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="initialValue" className="font-semibold">
              Initial value
            </label>
            <input
              type="text"
              value={fields.initialValue}
              onChange={(e) =>
                setFields({ ...fields, initialValue: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="initialValue" className="font-semibold">
              Month contribution
            </label>
            <input
              type="text"
              value={fields.monthContribution}
              onChange={(e) =>
                setFields({ ...fields, monthContribution: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="initialValue" className="font-semibold">
              Month Tax
            </label>
            <input
              type="text"
              value={fields.monthTax}
              onChange={(e) =>
                setFields({ ...fields, monthTax: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="initialValue" className="font-semibold">
              Total months
            </label>
            <input
              type="text"
              value={fields.totalMonths}
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

      <div className="mt-10">
        {multipleCompoundInterest && columns && (
          <Table columns={columns} items={multipleCompoundInterest} />
        )}
      </div>
    </DefaultLayout>
  );
};
