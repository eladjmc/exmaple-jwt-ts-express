import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userService.authenticateUser(username, password);
    if (user) {
      const token = uuidv4(); // Generate a new token
      await userService.updateUserToken(user.id, token); // Store the token
      res.json({ token }); // Return the token to the client
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    if (user) {
      await userService.updateUserToken(user.id, null); // Invalidate the token
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(400).json({ message: 'User not logged in' });
    }
  } catch (error) {
    next(error);
  }
};
