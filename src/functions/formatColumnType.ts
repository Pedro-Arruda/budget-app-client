import { currencyFormat, dateFormat } from "./formatters";

export const formatColumnType = (column: IColumn, item: any) => {
  if (!column.type) return item;

  switch (column.type) {
    case "currency":
      return currencyFormat(item);
    case "date":
      return dateFormat(item);

    default:
      return item;
  }
};
