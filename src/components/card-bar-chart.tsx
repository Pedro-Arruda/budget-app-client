import { ReactNode } from "react";

interface CardBarChartProps {
  title: string;
  children: ReactNode;
}

export const CardBarChart = ({ children, title }: CardBarChartProps) => {
  return (
    <section className="bg-transparent   rounded-sm p-3  mt-5 md:overflow-y-auto max-h-[300px]">
      <legend className="text-xl font-semibold text-gray-500 mb-4">
        {title}
      </legend>
      <div className="flex flex-col gap-2 ">{children}</div>
    </section>
  );
};
