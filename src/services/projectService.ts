import { ProjectRepository } from '../repositories/projectRepository';
import { Prisma } from '@prisma/client';

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async getAllProjects(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    let where: Prisma.ProjectWhereInput | undefined;
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

  async getProjectById(id: string) {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new Error('Project not found');
    return project;
  }

  async createProject(data: Prisma.ProjectCreateInput) {
    return await this.projectRepository.create(data);
  }

  async updateProject(id: string, data: Prisma.ProjectUpdateInput) {
    return await this.projectRepository.update(id, data);
  }

  async deleteProject(id: string) {
    return await this.projectRepository.delete(id);
  }
}
