"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdmin = exports.loginAdmin = void 0;
const authService_1 = require("../services/authService");
const authService = new authService_1.AuthService();
const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const authData = await authService.login(email, password);
        res.status(200).json(authData);
    }
    catch (error) {
        res.status(401);
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
const registerAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const authData = await authService.registerAdmin(email, password);
        res.status(201).json(authData);
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.registerAdmin = registerAdmin;
//# sourceMappingURL=authController.js.map