import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // In production, use environment variables

export const register = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await userService.authenticateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    next(error);
  }
};
