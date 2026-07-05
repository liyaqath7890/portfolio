import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, admin } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { projectSchema } from '../utils/validators';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, validate(projectSchema), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, admin, validate(projectSchema), updateProject)
  .delete(protect, admin, deleteProject);

export default router;
