import fs from "fs";
import { financialRepository } from "./FinanacialRepository";
import { financeFile } from "../../db/files";

class FinancialService {
  public async addFinancial(userId: string) {
    fs.existsSync(financeFile)
      ? fs.readFileSync(financeFile).length < 2
        ? fs.writeFileSync(financeFile, "[]")
        : "false2"
      : fs.writeFileSync(financeFile, "[]");

    // const alreadyExists = await this.find(data);
    // console.log("already", alreadyExists);
    // if (alreadyExists == "cannot create") {
    //   throw new Error("Email already exists");
    // }

    return financialRepository.addFinancial(userId);
  }
  public async deleteFinancial(userId: string, financialId: string) {
    return financialRepository.deleteFinancial(userId, financialId);
  }

  public async getFinancial(userId: string) {
    return financialRepository.getFinancial(userId);
  }

  public async getExpense(userId: string, typesOfExpenses: string) {
    return financialRepository.getExpense(userId, typesOfExpenses);
  }
}

export const financialService = new FinancialService();
