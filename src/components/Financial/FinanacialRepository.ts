import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { financeFile } from "../../db/files";
import XLSX from "xlsx";
import IFinancialUser, {
  IFinancialData,
} from "~/components/interfaces/IFinance";

class UserRepository {
  public addFinancial(userId: string) {
    let arrayJsonFinancial: IFinancialUser[] = [];
    const idUser = uuidv4();
    const id = uuidv4();
    let arrayFinancial: IFinancialData[] = [];

    const jsonData = fs.readFileSync(financeFile, "utf8");
    const dataParse = JSON.parse(jsonData);

    if (dataParse.length > 0) {
      for (let data of dataParse) {
        arrayJsonFinancial.push(data);
      }
    }

    const workbook = XLSX.readFile("src/financial.xlsx", {
      type: "binary",
      cellDates: true,
      dateNF: "yyyy/mm/dd;@",
    });
    const sheet_name_list = workbook.SheetNames;
    const dataFinancial = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    // console.log(dataFinancial);

    for (let data of dataFinancial as IFinancialData[]) {
      arrayFinancial.push({
        id: uuidv4() as string,
        price: data.price,
        typesOfExpenses: data.typesOfExpenses,
        date: data.date,
        name: data.name,
      });
      console.log(arrayFinancial);
    }

    arrayJsonFinancial.push({
      id: idUser,
      userId: userId,
      financialData: arrayFinancial as IFinancialData[],
    });

    fs.writeFile(financeFile, JSON.stringify(arrayJsonFinancial), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
export const userRepository = new UserRepository();
