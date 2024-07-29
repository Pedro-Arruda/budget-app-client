import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface IDefaultLayout {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: IDefaultLayout) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
};
