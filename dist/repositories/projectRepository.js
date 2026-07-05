"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const db_1 = require("../config/db");
class ProjectRepository {
    async findAll(skip, take, where) {
        return await db_1.prisma.project.findMany({
            ...(where ? { where } : {}),
            ...(skip !== undefined ? { skip } : {}),
            ...(take !== undefined ? { take } : {}),
            orderBy: { createdAt: 'desc' },
        });
    }
    async count(where) {
        return await db_1.prisma.project.count({
            ...(where ? { where } : {})
        });
    }
    async findById(id) {
        return await db_1.prisma.project.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return await db_1.prisma.project.create({
            data,
        });
    }
    async update(id, data) {
        return await db_1.prisma.project.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await db_1.prisma.project.delete({
            where: { id },
        });
    }
}
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=projectRepository.js.map