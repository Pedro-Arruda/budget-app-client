import { ChartLine, CurrencyCircleDollar } from "phosphor-react";

export const Sidebar = () => {
  return (
    <div className="flex flex-col items-center max-w-96 min-w-[250px] bg-[#1d1d21] p-10 h-screen text-neutral-300">
      <h1 className="text-2xl font-semibold">LOGO</h1>
      <ul className="mt-5 flex flex-col gap-3 text-xl">
        <li className="flex items-center gap-4">
          <ChartLine size={24} />
          <a className="font-medium decoration-transparent" href="/">
            Dashboard
          </a>
        </li>
        <li className="flex items-center gap-4">
          <CurrencyCircleDollar size={24} />
          <a className="font-medium" href="/compound-interest">
            Compound Interest
          </a>
        </li>
      </ul>
    </div>
  );
};
