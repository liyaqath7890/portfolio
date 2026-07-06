import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Retrieving projects failed',
    });
  }
};

// Get single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Retrieving project failed',
    });
  }
};

// Create a project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, image, featured } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        technologies: Array.isArray(technologies) ? technologies : [],
        githubUrl,
        liveUrl,
        image,
        featured: !!featured,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Creating project failed',
    });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, technologies, githubUrl, liveUrl, image, featured } = req.body;

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingProject.title,
        description: description !== undefined ? description : existingProject.description,
        technologies: Array.isArray(technologies) ? technologies : existingProject.technologies,
        githubUrl: githubUrl !== undefined ? githubUrl : existingProject.githubUrl,
        liveUrl: liveUrl !== undefined ? liveUrl : existingProject.liveUrl,
        image: image !== undefined ? image : existingProject.image,
        featured: featured !== undefined ? !!featured : existingProject.featured,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Updating project failed',
    });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Deleting project failed',
    });
  }
};
