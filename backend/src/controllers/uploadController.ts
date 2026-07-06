import { Request, Response } from 'express';
import { uploadToCloudinary } from '../utils/cloudinary';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // Upload to Cloudinary under folder 'portfolio/projects'
    const url = await uploadToCloudinary(
      req.file.buffer,
      'portfolio/projects',
      req.file.originalname,
      'image'
    );

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    });
  }
};
