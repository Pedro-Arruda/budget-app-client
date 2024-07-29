import { BarChart } from "../../../components/BarChart";

export const MonthReports = ({ monthsReport }: any) => {
  return (
    <div className="border-[1px] border-neutral-700 p-5">
      <h1 className="font-bold text-2xl">Month Reports</h1>

      <BarChart
        data={[
          ["Month", "Expenses", "Invoice Balance", "Income", "Profit"],
          ...monthsReport,
        ]}
      />
    </div>
  );
};
