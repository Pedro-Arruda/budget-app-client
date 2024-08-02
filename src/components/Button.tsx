import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className={`bg-[#ACF463]  text-neutral-700 font-semibold cursor-pointer flex items-center justify-center gap-3 ${className}`}
    >
      {children}
    </button>
  );
};
