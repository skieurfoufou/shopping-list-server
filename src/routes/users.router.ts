import { Request, Response, Router } from "express";
import {
  getUserById,
  getAllUsers,
  createUserByEmail,
} from "../business-logic/users/users.logic";
import { authMiddleware } from "../middleware/auth.middleware";
const usersRouter = Router();

usersRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createUserRes = await createUserByEmail(body);
    res.send(createUserRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const usersRes = await getAllUsers();
    res.send(usersRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usersRes = await getUserById(id);
    res.json(usersRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

export default usersRouter;
