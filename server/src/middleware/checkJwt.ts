import { Request, Response, NextFunction } from "express";
import * as jwtHandler from "../services/auth"
import IUser from "../models/IUser";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers.authorization;
  if(tokenHeader === undefined){
    return res.status(401).send("missing token");
  }
  
  const token = tokenHeader.split(' ')[1];
  const user : IUser | null = jwtHandler.checkToken(token);
  if (user === null) {
    return res.status(401).send();
  }

  res.locals.user = user;
  return next();
};