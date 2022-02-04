import { Router } from "express";
import { financialService } from "./FinancialService";

const router = Router();

router.post("/userId/:userId", async (req, res) => {
  const data = req.params.userId;

  try {
    await financialService.addFinancial(data);
    res.json("Dados financeiros adicionados com sucesso");
  } catch (err) {
    res.json({ error: err.message });
  }
});

// router.get("/id/:id", async (req, res) => {
//   const data = req.params.id;

//   try {
//     await userService.getUser(data);
//     res.json(data);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.post("", async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     await userService.addUser({ name, email });
//     res.json("account created");
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// router.patch("", async (req, res) => {
//   const { id, name, email } = req.body;

//   try {
//     await userService.updateUser({ id, name, email });
//     res.json("account updated");
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

export default router;
