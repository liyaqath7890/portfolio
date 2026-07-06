import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import resumeRoutes from './routes/resumeRoutes';
import contactRoutes from './routes/contactRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app: Application = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running correctly and simplified.',
  });
});

// Fallback Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
