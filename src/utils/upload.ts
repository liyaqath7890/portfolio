import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'default_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'default_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'default_api_secret',
});

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

export const uploadToCloudinary = (fileBuffer: Buffer, originalName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const publicId = `${Date.now()}-${originalName.split('.')[0]}`;
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio',
        format: 'png',
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Upload to Cloudinary returned no result'));
        }
        resolve(result.secure_url || result.url);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};
