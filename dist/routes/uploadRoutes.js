"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../utils/upload");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, authMiddleware_1.admin, upload_1.upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const url = await (0, upload_1.uploadToCloudinary)(req.file.buffer, req.file.originalname);
        res.status(200).json({
            message: 'Image uploaded successfully',
            url: url,
        });
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({
            message: error.message || 'Image upload failed',
        });
    }
});
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map