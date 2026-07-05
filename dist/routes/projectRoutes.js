"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const validators_1 = require("../utils/validators");
const router = express_1.default.Router();
router.route('/')
    .get(projectController_1.getProjects)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, (0, validateMiddleware_1.validate)(validators_1.projectSchema), projectController_1.createProject);
router.route('/:id')
    .get(projectController_1.getProjectById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, (0, validateMiddleware_1.validate)(validators_1.projectSchema), projectController_1.updateProject)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, projectController_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map