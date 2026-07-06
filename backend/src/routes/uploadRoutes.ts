import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/image', protect, upload.single('image'), uploadImage);

export default router;
