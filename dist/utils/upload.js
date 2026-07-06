"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'default_cloud_name',
    api_key: process.env.CLOUDINARY_API_KEY || 'default_api_key',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'default_api_secret',
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (fileBuffer, originalName) => {
    return new Promise((resolve, reject) => {
        const publicId = `${Date.now()}-${originalName.split('.')[0]}`;
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'portfolio',
            format: 'png',
            public_id: publicId,
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (!result) {
                return reject(new Error('Upload to Cloudinary returned no result'));
            }
            resolve(result.secure_url || result.url);
        });
        stream_1.Readable.from(fileBuffer).pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=upload.js.map