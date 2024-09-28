import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader;

  if (!token) {
    res.status(401).json({ message: "Invalid authorization format" });
    return;
  }

  try {
    const user = await userService.getUserByToken(token);
    if (!user) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
