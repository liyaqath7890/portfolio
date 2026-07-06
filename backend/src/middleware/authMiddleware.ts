import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token found' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true },
      });

      if (!admin) {
        return res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
      }

      req.user = admin;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};
