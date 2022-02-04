import fs from "fs";
import { userRepository } from "./FinanacialRepository";
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

    return userRepository.addFinancial(userId);
  }
}

export const financialService = new FinancialService();
