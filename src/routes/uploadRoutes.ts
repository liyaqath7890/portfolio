import express, { Request, Response } from 'express';
import { upload } from '../utils/upload';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    url: req.file.path,
  });
});

export default router;
