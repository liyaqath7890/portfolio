"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
class ProjectService {
    projectRepository;
    constructor() {
        this.projectRepository = new projectRepository_1.ProjectRepository();
    }
    async getAllProjects(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        let where;
        if (search) {
            where = {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            };
        }
        const [projects, total] = await Promise.all([
            this.projectRepository.findAll(skip, limit, where),
            this.projectRepository.count(where),
        ]);
        return {
            projects,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getProjectById(id) {
        const project = await this.projectRepository.findById(id);
        if (!project)
            throw new Error('Project not found');
        return project;
    }
    async createProject(data) {
        return await this.projectRepository.create(data);
    }
    async updateProject(id, data) {
        return await this.projectRepository.update(id, data);
    }
    async deleteProject(id) {
        return await this.projectRepository.delete(id);
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=projectService.js.map