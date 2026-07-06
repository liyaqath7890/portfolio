import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
  fileName: string,
  resourceType: 'raw' | 'image' = 'image'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${Date.now()}-${fileName.split('.')[0]}`,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload returned no result'));
        resolve(result.secure_url || result.url);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (fileUrl: string): Promise<void> => {
  try {
    // Extract public_id from url
    // Example: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.jpg
    const parts = fileUrl.split('/');
    const folderAndFile = parts.slice(parts.indexOf('upload') + 2).join('/');
    const publicId = folderAndFile.substring(0, folderAndFile.lastIndexOf('.'));
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};
