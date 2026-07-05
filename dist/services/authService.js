"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../repositories/userRepository");
const jwt_1 = require("../utils/jwt");
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            token,
        };
    }
    // Used only initially to seed an admin (should be secured or removed later)
    async registerAdmin(email, password) {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new Error('Admin already exists');
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            role: 'ADMIN',
        });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            token,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map