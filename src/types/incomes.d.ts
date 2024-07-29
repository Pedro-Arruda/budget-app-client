interface IIncome {
  id: string;
  description: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
  everyMonth: boolean;
  month: number | null;
  year: number | null;
}
