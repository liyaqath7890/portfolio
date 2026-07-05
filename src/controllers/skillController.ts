import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { level: 'desc' } });
    res.status(200).json(skills);
  } catch (error) { next(error); }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await prisma.skill.create({ data: req.body });
    res.status(201).json(skill);
  } catch (error) { next(error); }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id as string } });
    res.status(200).json({ message: 'Skill deleted' });
  } catch (error) { next(error); }
};
