import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

const prisma = new PrismaClient();

// Get the resume
export const getResume = async (req: Request, res: Response) => {
  try {
    const resume = await prisma.resume.findFirst();
    res.status(200).json({
      success: true,
      message: 'Resume retrieved successfully',
      data: resume,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Retrieving resume failed',
    });
  }
};

// Upload or replace the resume
export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const title = req.body.title || 'My Resume';

    // Upload new resume to Cloudinary as 'raw' (for PDF files)
    const fileUrl = await uploadToCloudinary(
      req.file.buffer,
      'portfolio/resume',
      req.file.originalname,
      'raw'
    );

    // Check if a resume already exists
    const existingResume = await prisma.resume.findFirst();

    let resume;
    if (existingResume) {
      // Delete old file from Cloudinary
      await deleteFromCloudinary(existingResume.fileUrl);

      // Update existing record
      resume = await prisma.resume.update({
        where: { id: existingResume.id },
        data: {
          title,
          fileUrl,
        },
      });
    } else {
      // Create new record
      resume = await prisma.resume.create({
        data: {
          title,
          fileUrl,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: resume,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Uploading resume failed',
    });
  }
};

// Delete the resume
export const deleteResume = async (req: Request, res: Response) => {
  try {
    const existingResume = await prisma.resume.findFirst();

    if (!existingResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(existingResume.fileUrl);

    // Delete from database
    await prisma.resume.delete({
      where: { id: existingResume.id },
    });

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Deleting resume failed',
    });
  }
};
