import { formatColumnType } from "../functions/formatColumnType";

interface ITable {
  columns: IColumn[];
  items: any[];
  className?: string;
}

export const Table = ({ columns, items, className }: ITable) => {
  return (
    <div
      className={`border-[1px] bg-[#1d1d21] border-neutral-700 max-h-[300px] rounded-md ${className}   overflow-y-auto`}
    >
      <table className="w-full">
        <thead className="border-b-[1px] border-neutral-700">
          <tr>
            {columns.map((column, index) => (
              <th
                className={`px-10 py-3 text-left `}
                key={`${index}-${column.key}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${index}-tr`}
              className={
                index !== items.length - 1
                  ? `border-b-[1px] border-neutral-700`
                  : ""
              }
            >
              {columns.map((column, index) => (
                <td className={`px-10 py-3 whitespace-nowrap`} key={index}>
                  {formatColumnType(column, item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
