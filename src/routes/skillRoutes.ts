import express from 'express';
import { getSkills, createSkill, deleteSkill } from '../controllers/skillController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, admin, createSkill);

router.route('/:id')
  .delete(protect, admin, deleteSkill);

export default router;
