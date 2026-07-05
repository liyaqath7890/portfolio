"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const db_1 = require("../config/db");
const protect = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            if (!token)
                throw new Error('No token found');
            const decoded = (0, jwt_1.verifyToken)(token);
            const user = await db_1.prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, role: true },
            });
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
exports.admin = admin;
//# sourceMappingURL=authMiddleware.js.map