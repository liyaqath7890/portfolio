"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../config/db");
class UserRepository {
    async findByEmail(email) {
        return await db_1.prisma.user.findUnique({
            where: { email },
        });
    }
    async create(data) {
        return await db_1.prisma.user.create({
            data,
        });
    }
    async findById(id) {
        return await db_1.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, role: true, createdAt: true, updatedAt: true }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map