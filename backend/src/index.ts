import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './config/db';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { notFound, errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import uploadRoutes from './routes/uploadRoutes';
import skillRoutes from './routes/skillRoutes';
import contactRoutes from './routes/contactRoutes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

// Test Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly.' });
});

app.use(notFound);
app.use(errorHandler);

// Start Server
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await prisma.$connect();
      console.log('Connected to PostgreSQL Database via Prisma');
    } catch (error) {
      console.error('Database connection failed', error);
    }
  });
}

export default app;
