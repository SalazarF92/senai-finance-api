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

router.delete("/userId/:userId/financialId/:financialId", async (req, res) => {
  const data = {
    userId: req.params.userId,
    financialId: req.params.financialId,
  };

  try {
    await financialService.deleteFinancial(data.userId, data.financialId);
    res.json("Dados financeiros removidos com sucesso");
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/userId/:userId", async (req, res) => {
  const data = req.params.userId;

  try {
    const result = await financialService.getFinancial(data);
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get(
  "/userId/:userId/typesOfExpenses/:typesOfExpenses",
  async (req, res) => {
    const data = {
      userId: req.params.userId,
      typesOfExpenses: req.params.typesOfExpenses,
    };

    try {
      const result = await financialService.getExpense(
        data.userId,
        data.typesOfExpenses
      );
      res.json(result);
    } catch (err) {
      res.json({ error: err.message });
    }
  }
);

export default router;
