import IUser from "~/interfaces/IUser";
import fs from "fs";
import { userRepository } from "./userRepository";

class UserService {
  public async getUser(data: string) {
    return userRepository.getUser(data);
  }

  public async find(data: IUser) {
    const jsonData = fs.readFileSync("src/db/user.json", "utf8");

    const dataParse = JSON.parse(jsonData);

    let msg = "";
    dataParse.find((element) => {
      if (element.email == data.email && element.id != data.id) {
        msg = "cannot change";
        return;
      } else if (element.email !== data.email && element.id != data.id) {
        msg = "can create";
        return;
      }
    });
    return msg;
  }

  public async addUser(data: IUser) {
    fs.existsSync("src/db/user.json")
      ? fs.readFileSync("src/db/user.json").length < 2
        ? fs.writeFileSync("src/db/user.json", "[]")
        : "false2"
      : fs.writeFileSync("src/db/user.json", "[]");

    console.log(fs.readFileSync("src/db/user.json").length);

    const alreadyExists = await this.find(data);
    if (alreadyExists) {
      console.log("ja tem esse email");
      throw new Error("User already exists");
    }

    return userRepository.addUser(data);
  }

  public async updateUser(data: IUser) {
    const alreadyExists = await this.find(data);

    console.log("alreadyExists", alreadyExists);

    if (alreadyExists == "cannot change") {
      console.log("Email já existente");
      throw new Error("User not found");
    }

    return userRepository.updateUser(data);
  }
}

export const userService = new UserService();
