import { Calendar, CalendarX } from "phosphor-react";
import { currencyFormat, dateFormat } from "../../../functions/formatters";

interface ICreditCart {
  account?: IAccount;
}

export const CreditCart = ({ account }: ICreditCart) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Credit Cart</h1>
      </div>

      {account && (
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col justify-between font-semibold border-2 shadow-neutral-900 shadow-2xl  border-neutral-800 bg-neutral-900 rounded-3xl  p-5">
            <div className="flex justify-between">
              <p>{account.name}</p>
              <p>{account.brand}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="flex">
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                </div>

                <div className="flex">
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                </div>

                <div className="flex">
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                  <span className="text-5xl mb-8">.</span>
                </div>

                <div className="flex">
                  <p className="text-xl">{account.finalNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <CalendarX size={20} />
                  Close Date
                </div>
                <p>{dateFormat(account.balanceCloseDate)}</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Due Date
                </div>
                <p>{dateFormat(account.balanceDueDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-neutral-[#202020] rounded-md border-[1px] border-neutral-700 py-2 px-5">
            <h2 className="font-semibold text-xl">General infos</h2>
            <div className="flex gap-3">
              <p className="font-semibold">Balance:</p>
              <p className="font-semibold">{currencyFormat(account.balance)}</p>
            </div>
            <div className="flex gap-3">
              <p className="font-medium">Total limit:</p>
              <p className="font-semibold">
                {currencyFormat(account.creditLimit)}
              </p>
            </div>
            <div className="flex gap-3">
              <p className="font-medium">Available limit:</p>
              <p className="font-semibold">
                {currencyFormat(account.availableCreditLimit)}
              </p>
            </div>
          </div>

          <hr className="h-px my-4 border-0 bg-gray-600" />
        </div>
      )}
    </div>
  );
};
