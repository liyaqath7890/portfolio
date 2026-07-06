import express, { Request, Response } from 'express';
import { upload, uploadToCloudinary } from '../utils/upload';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const url = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: url,
    });
  } catch (error: any) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({
      message: error.message || 'Image upload failed',
    });
  }
});

export default router;
