import * as express from "express";
import FinancialRouter from "./components/Financial/FinancialRouter";
import UserRouter from "./components/User/UserRouter";

const router = express.Router();

router.use(express.json());

router.use("/user", UserRouter);

router.use("/financial", FinancialRouter);

router.get("/", (req, res) => {
  res.json({
    backend01: "1.0",
  });
});

export default router;
