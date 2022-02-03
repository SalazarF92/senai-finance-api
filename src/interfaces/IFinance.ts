export default interface IFinancialUser {
  id?: string;
  userId: number;
  financialData: IFinancialData;
}

interface IFinancialData {
  id: Number;
  price: Number;
  typesOfExpenses: String;
  date: Date;
  name: String;
}
