import { Router } from "express";
import { userService } from "./userService";
import xlsx from "node-xlsx";
// var xlsx = require("node-xlsx");
import XLSX from "xlsx";
import { convertCompilerOptionsFromJson } from "typescript";

const router = Router();

router.get("/id/:id", async (req, res) => {
  const data = req.params.id;

  console.log("data", data);

  try {
    await userService.getUser(data);
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/test", async (req, res) => {
  const data = req.body;

  console.log(data);

  // const workbook = XLSX.readFile("src/financial.xlsx");
  // const sheet_name_list = workbook.SheetNames;
  // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));

  const test = XLSX.utils.json_to_sheet(data);
  console.log(test);

  // const buildWorkdbook = XLSX.utils.book_new();
  // console.log((buildWorkdbook.SheetNames = ["Sheet1"]));
  // const buildSheet = XLSX.write(buildWorkdbook, data);
  // console.log(buildSheet);

  // console.log(obj1[0].data);
});

router.post("", async (req, res) => {
  const { name, email } = req.body;

  try {
    await userService.addUser({ name, email });
    res.json("account created");
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.patch("", async (req, res) => {
  const { id, name, email } = req.body;

  try {
    await userService.updateUser({ id, name, email });
    res.json("account updated");
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
