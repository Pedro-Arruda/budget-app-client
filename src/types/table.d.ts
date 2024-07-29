type IColumnType = "currency" | "date" | "w-full";

interface IColumn {
  label: string;
  key: string;
  type?: IColumnType;
}
