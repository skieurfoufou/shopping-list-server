import { Request, Response, Router } from "express";
import {
  getListById,
  getAllLists,
  createList,
  updateList,
  deleteList,
} from "../business-logic/lists/lists.logic";
import { authMiddleware } from "../middleware/auth.middleware";
const listsRouter = Router();

listsRouter.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await deleteList(req.params.id);
      res.send({ success: true });
    } catch (err: any) {
      res.status(err.status).send({ errors: err.message });
    }
  }
);

listsRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createListRes = await createList(body);
    res.send(createListRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

listsRouter.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateListRes = await updateList(id, body);
    res.send(updateListRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

listsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const listsRes = await getAllLists();
    res.send(listsRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

listsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const listsRes = await getListById(id);
    res.json(listsRes);
  } catch (err: any) {
    res.status(err.status).send({ errors: err.message });
  }
});

export default listsRouter;
