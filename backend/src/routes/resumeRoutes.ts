import express from 'express';
import multer from 'multer';
import {
  getResume,
  uploadResume,
  deleteResume,
} from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.route('/')
  .get(getResume)
  .post(protect, upload.single('resume'), uploadResume)
  .put(protect, upload.single('resume'), uploadResume)
  .delete(protect, deleteResume);

export default router;
