import IUser from "~/components/interfaces/IUser";
import fs from "fs";
import { userRepository } from "./userRepository";
import { userFile } from "../../db/files";

class UserService {
  public async getUser(data: string) {
    return userRepository.getUser(data);
  }

  public async find(data: IUser) {
    const jsonData = fs.readFileSync(userFile, "utf8");

    const dataParse = JSON.parse(jsonData);

    let msg = "";

    const result = dataParse.find((element) => {
      return element.email == data.email;
    });
    if (result == undefined) {
      msg = "can create";
    } else if (result.email == data.email && !data.id) {
      msg = "cannot create";
    } else if (result.email !== data.email && !data.id) {
      msg = "can create";
    } else if (result.email == data.email && result.id != data.id) {
      msg = "cannot change";
    } else if (result.email !== data.email && result.id != data.id) {
      msg = "can create";
    }
    return msg;
  }

  public async addUser(data: IUser) {
    fs.existsSync(userFile)
      ? fs.readFileSync(userFile).length < 2
        ? fs.writeFileSync(userFile, "[]")
        : "false2"
      : fs.writeFileSync(userFile, "[]");

    const alreadyExists = await this.find(data);
    console.log("already", alreadyExists);
    if (alreadyExists == "cannot create") {
      throw new Error("Email already exists");
    }

    return userRepository.addUser(data);
  }

  public async updateUser(data: IUser) {
    const alreadyExists = await this.find(data);

    if (alreadyExists == "cannot change") {
      console.log("Email já existente");
      throw new Error("User not found");
    }

    return userRepository.updateUser(data);
  }
}

export const userService = new UserService();
