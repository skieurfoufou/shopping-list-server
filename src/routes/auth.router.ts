import { Request, Response, Router } from "express";
import { login } from "../business-logic/auth.logic";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    const token = await login(password, email);
    return res.json({ token });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status).json({ message: error.message });
  }
});

export default authRouter;
