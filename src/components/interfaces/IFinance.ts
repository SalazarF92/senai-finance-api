export default interface IFinancialUser {
  id?: string;
  userId: string;
  financialData: IFinancialData[];
}

export interface IFinancialData {
  id: string;
  price: number;
  typesOfExpenses: string;
  date: number;
  name: string;
}
