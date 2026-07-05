"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const projectService_1 = require("../services/projectService");
const projectService = new projectService_1.ProjectService();
const getProjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const result = await projectService.getAllProjects(page, limit, search);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res, next) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        res.status(200).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res, next) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const updateProject = async (req, res, next) => {
    try {
        const project = await projectService.updateProject(req.params.id, req.body);
        res.status(200).json(project);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res, next) => {
    try {
        await projectService.deleteProject(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectController.js.map