import { NextFunction, Request, Response } from "express";
import { isTokenValid } from "../business-logic/auth.logic";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!isTokenValid(req.headers.authorization)) {
    res.status(403).json({ message: "Token not valid" });
    return;
  }
  next();
};

module.exports = authMiddleware;
