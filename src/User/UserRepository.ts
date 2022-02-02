import IUser from "~/interfaces/IUser";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const userFile = "src/db/user.json";

class UserRepository {
  public getUser(data: string) {
    const jsonData = fs.readFileSync("src/db/user.json", "utf8");

    const dataParse = JSON.parse(jsonData);

    const findId = dataParse.find((element) => {
      return element.id == data;
    });
    if (!findId) {
      throw new Error("User not found");
    }
    return findId;
  }

  public addUser(data: IUser) {
    let arrayJson: IUser[] = [];
    const id = uuidv4();

    const jsonData = fs.readFileSync(userFile, "utf8");
    const dataParse = JSON.parse(jsonData);

    for (let data of dataParse) {
      arrayJson.push(data);
    }

    arrayJson.push({ id: id, name: data.name, email: data.email });

    console.log("arrayJson", arrayJson);

    fs.writeFile(userFile, JSON.stringify(arrayJson), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  public updateUser(data: IUser) {
    const jsonData = fs.readFileSync("src/db/user.json", "utf8");

    const dataParse = JSON.parse(jsonData);

    const findId = dataParse.find((element) => {
      return element.id == data.id;
    });

    fs.readFile(userFile, "utf8", function (err, file) {
      if (err) {
        return console.log(err);
      }
      let result = file.replace(findId.email, data.email);
      result = result.replace(findId.name, data.name);

      fs.writeFile(userFile, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
    });
  }
}
export const userRepository = new UserRepository();
