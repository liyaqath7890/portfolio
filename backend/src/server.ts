import app from './app';
import { prisma } from './config/db';

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await prisma.$connect();
      console.log('Connected to PostgreSQL Database via Prisma');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  });
}
