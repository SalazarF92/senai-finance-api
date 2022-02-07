import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { financeFile } from "../../db/files";
import XLSX from "xlsx";
import IFinancialUser, {
  IFinancialData,
} from "~/components/interfaces/IFinance";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

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

  public async deleteFinancial(userId: string, financialId: string) {
    const jsonData = fs.readFileSync(financeFile, "utf8");
    const dataParse = JSON.parse(jsonData);

    const filterToDelete = dataParse.filter(
      (element) => element.userId !== userId && element.id !== financialId
    );

    fs.writeFile(financeFile, JSON.stringify(filterToDelete), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  public getFinancial(userId: string) {
    let sumData = 0;
    let arrayRaw = [];
    const jsonData = fs.readFileSync(financeFile, "utf8");

    const dataParse = JSON.parse(jsonData);

    const findFinancial = dataParse.filter((element) => {
      return element.userId == userId;
    });
    // console.log(findFinancial);

    if (findFinancial.length <= 0) {
      findFinancial.financialData.forEach((sum) => {
        const dataTest = new Date(Date.parse(sum.date));
        console.log("test", dataTest.getMonth() + 1);
      });
    } else {
      for (let i = 0; i < 12; i++) {
        sumData = 0;
        findFinancial.forEach((element) => {
          element.financialData
            .filter((filterMonth) => {
              const dataTest = new Date(Date.parse(filterMonth.date));
              return dataTest.getMonth() + 1 == i + 1;
            })
            .forEach((sum) => {
              sumData += sum.price;
            });
        });
        // return `O gasto do mês ${i + 1} foi de R$${sumData}`;
        arrayRaw.push(`O gasto do mês ${i + 1} foi de R$${sumData}`);
        console.log(`O gasto do mês ${i + 1} foi de R$${sumData}`);
      }
    }
    if (!findFinancial) {
      throw new Error("User not found");
    }

    return arrayRaw;
  }

  public getExpense(userId: string, typesOfExpenses: string) {
    let sumData = 0;
    let arrayRaw = [];
    const jsonData = fs.readFileSync(financeFile, "utf8");

    const dataParse = JSON.parse(jsonData);

    const findFinancial = dataParse.filter((element) => {
      return element.userId == userId;
    });
    // console.log(findFinancial);

    if (findFinancial.length <= 0) {
      findFinancial.financialData.forEach((sum) => {
        const dataTest = new Date(Date.parse(sum.date));
        console.log("test", dataTest.getMonth() + 1);
      });
    } else {
      for (let i = 0; i < 12; i++) {
        sumData = 0;
        findFinancial.forEach((element) => {
          element.financialData
            .filter((filterMonth) => {
              const dataTest = new Date(Date.parse(filterMonth.date));
              return (
                dataTest.getMonth() + 1 == i + 1 &&
                filterMonth.typesOfExpenses == typesOfExpenses
              );
            })
            .forEach((sum) => {
              sumData += sum.price;
            });
        });
        // return `O gasto do mês ${i + 1} foi de R$${sumData}`;
        arrayRaw.push(`O gasto do mês ${i + 1} foi de R$${sumData}`);
        console.log(`O gasto do mês ${i + 1} foi de R$${sumData}`);
      }
    }
    if (!findFinancial) {
      throw new Error("User not found");
    }

    return arrayRaw;
  }
}
export const financialRepository = new UserRepository();
