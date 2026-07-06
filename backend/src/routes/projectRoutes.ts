import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
