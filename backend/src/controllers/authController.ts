import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.login(email, password);
    res.status(200).json(authData);
  } catch (error: any) {
    res.status(401);
    next(error);
  }
};

export const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.registerAdmin(email, password);
    res.status(201).json(authData);
  } catch (error: any) {
    res.status(400);
    next(error);
  }
};
