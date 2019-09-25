import { Request, Response, NextFunction } from "express";
import * as jwtHandler from "../services/auth"
import IUser from "../models/IUser";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const user : IUser | null = jwtHandler.checkToken(token);
  if (user === null) {
    return res.status(401).send();
  }

  res.locals.user = user;
  return next();
};