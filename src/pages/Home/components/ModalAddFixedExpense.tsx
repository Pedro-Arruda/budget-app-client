import { Plus } from "phosphor-react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";

interface IFields {
  description: string;
  amount: string;
}

interface ModalAddFixedExpense {
  fields: IFields;
  setFields: (fields: IFields) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

export const ModalAddFixedExpense = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
}: ModalAddFixedExpense) => {
  return (
    <Modal onClose={() => setIsOpenModal(false)}>
      <div className="bg-neutral-800  rounded-md px-7 py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-3 font-semibold">New Expense</h1>
          <Button className="py-1 font-semibold" onClick={() => handleSubmit()}>
            Add <Plus weight="bold" />
          </Button>
        </div>
        <form className="flex flex-col gap-5">
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
        </form>
      </div>
    </Modal>
  );
};
