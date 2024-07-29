import { Plus } from "phosphor-react";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { Modal } from "../../../components/Modal";
import { getNextAndPreviousYears } from "../../../functions/getDates";
import { months } from "../../../utils/months";

interface IFields {
  description: string;
  amount: string;
  everyMonth: boolean;
  month: number | null;
  year: number | null;
}

interface ModalAddIncome {
  fields: IFields;
  setFields: (fields: IFields) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

export const ModalAddIncome = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
}: ModalAddIncome) => {
  return (
    <Modal onClose={() => setIsOpenModal(false)}>
      <div className="bg-neutral-800  rounded-md px-7 py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-3 font-semibold">New Income</h1>
          <Button className="py-1 font-semibold" onClick={() => handleSubmit()}>
            Add <Plus weight="bold" />
          </Button>
        </div>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              id="description"
              className="font-semibold"
            >
              Description
            </label>
            <input
              type="text"
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" id="amount" className="font-semibold">
              Amount
            </label>
            <input
              type="text"
              value={fields.amount}
              onChange={(e) => setFields({ ...fields, amount: e.target.value })}
              className="outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
            />
          </div>

          <div className="flex gap-5 mt-3 items-center">
            {!fields.everyMonth && (
              <>
                <select
                  name="month"
                  id="month"
                  value={Number(fields.month)}
                  onChange={(e) =>
                    setFields({ ...fields, month: Number(e.target.value) })
                  }
                  className="flex-1 outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
                >
                  {months.map((month) => (
                    <option
                      value={month.value}
                      className="bg-neutral-800 py-1.5 px-8 border-2 border-neutral-800 rounded-sm outline-none text-neutral-300"
                    >
                      {month.label}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  id="year"
                  value={Number(fields.year)}
                  onChange={(e) =>
                    setFields({ ...fields, year: Number(e.target.value) })
                  }
                  className=" flex-1 outline-none bg-transparent border-2 border-neutral-500 font-medium py-1 px-3"
                >
                  {getNextAndPreviousYears(new Date().getFullYear()).map(
                    (year) => (
                      <option
                        value={year}
                        className="bg-neutral-800 py-1.5 px-8 border-2 border-neutral-800 rounded-md outline-none text-neutral-300"
                      >
                        {year}
                      </option>
                    )
                  )}
                </select>
              </>
            )}
            <div className="ml-auto">
              <Checkbox
                label="Every month"
                checked={fields.everyMonth}
                onChange={(e) => setFields({ ...fields, everyMonth: e })}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
