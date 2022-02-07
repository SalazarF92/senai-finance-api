import { Router } from "express";
import { userService } from "./userService";

const router = Router();

router.get("/id/:id", async (req, res) => {
  const data = req.params.id;

  console.log("data", data);

  try {
    const result = await userService.getUser(data);
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
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
