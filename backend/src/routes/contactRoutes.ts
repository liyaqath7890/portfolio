import express from 'express';
import { submitContactMessage } from '../controllers/contactController';

const router = express.Router();

router.post('/', submitContactMessage);

export default router;
