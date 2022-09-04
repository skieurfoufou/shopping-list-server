import express, { Express, Request, Response } from "express";
import env from "./utils/env";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./data-layer/db";
import listsRouter from "./routes/lists.router";
import authRouter from "./routes/auth.router";
import usersRouter from "./routes/users.router";

const app: Express = express();
const port = env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.all("/healthz", (req: Request, res: Response) => {
  res.status(200).send();
});

app.use("/lists", listsRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

app.listen(port, async () => {
  await connect();
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
