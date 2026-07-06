import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class ProjectRepository {
  async findAll(skip?: number, take?: number, where?: Prisma.ProjectWhereInput) {
    return await prisma.project.findMany({
      ...(where ? { where } : {}),
      ...(skip !== undefined ? { skip } : {}),
      ...(take !== undefined ? { take } : {}),
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(where?: Prisma.ProjectWhereInput) {
    return await prisma.project.count({ 
      ...(where ? { where } : {}) 
    });
  }

  async findById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return await prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.project.delete({
      where: { id },
    });
  }
}
