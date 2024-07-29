import { IRespondeCompoundInterest } from "..";
import { currencyFormat } from "../../../functions/formatters";

interface IResultsCompoundInterests {
  compoundInterest?: IRespondeCompoundInterest;
}

export const ResultsCompoundInterests = ({
  compoundInterest,
}: IResultsCompoundInterests) => {
  return (
    <>
      {compoundInterest && (
        <div className="flex gap-5">
          <div className="bg-neutral-800 flex-1 text-center py-3 px-20 mt-5 w-max border-2 border-neutral-700 shadow-neutral-800 shadow-2xl ">
            <p className="font-semibold text-xl">Total Amount</p>
            <p className="font-semibold text-xl">
              {currencyFormat(compoundInterest.totalAmount)}
            </p>
          </div>
          <div className="bg-neutral-800 flex-1 text-center py-3 px-20 mt-5 w-max border-2 border-neutral-700 shadow-neutral-800 shadow-2xl ">
            <p className="font-semibold text-xl">Total Invested</p>
            <p className="font-semibold text-xl">
              {currencyFormat(compoundInterest.totalInvested)}
            </p>
          </div>
          <div className="bg-neutral-800 flex-1 text-center py-3 px-20 mt-5 w-max border-2 border-neutral-700 shadow-neutral-800 shadow-2xl ">
            <p className="font-semibold text-xl">Total Fees</p>
            <p className="font-semibold text-xl">
              {currencyFormat(compoundInterest.totalFees)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
