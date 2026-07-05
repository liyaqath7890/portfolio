"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/skills', skillRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
// Test Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Backend is running correctly.' });
});
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
// Start Server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await db_1.prisma.$connect();
        console.log('Connected to PostgreSQL Database via Prisma');
    }
    catch (error) {
        console.error('Database connection failed', error);
    }
});
exports.default = app;
//# sourceMappingURL=index.js.map