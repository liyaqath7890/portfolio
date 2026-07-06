import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all skills
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
    res.status(200).json({
      success: true,
      message: 'Skills retrieved successfully',
      data: skills,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Retrieving skills failed',
    });
  }
};

// Create a skill
export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, category, percentage, icon } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required',
      });
    }

    const pct = parseInt(percentage, 10);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      return res.status(400).json({
        success: false,
        message: 'Percentage must be an integer between 0 and 100',
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        percentage: pct,
        icon,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Creating skill failed',
    });
  }
};

// Update a skill
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, category, percentage, icon } = req.body;

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    let pct = existingSkill.percentage;
    if (percentage !== undefined) {
      pct = parseInt(percentage, 10);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        return res.status(400).json({
          success: false,
          message: 'Percentage must be an integer between 0 and 100',
        });
      }
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingSkill.name,
        category: category !== undefined ? category : existingSkill.category,
        percentage: pct,
        icon: icon !== undefined ? icon : existingSkill.icon,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedSkill,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Updating skill failed',
    });
  }
};

// Delete a skill
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    await prisma.skill.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Deleting skill failed',
    });
  }
};
