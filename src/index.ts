import express, { Express, Request, Response } from "express";
import env from "./utils/env";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();
const port = env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.all("/healthz", (req: Request, res: Response) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
