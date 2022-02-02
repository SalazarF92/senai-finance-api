import * as express from "express";
import UserRouter from "./User/UserRouter";

const router = express.Router();

router.use(express.json());

router.use("/user", UserRouter);

router.get("/", (req, res) => {
  res.json({
    backend01: "1.0",
  });
});

export default router;
