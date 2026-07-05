"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.createSkill = exports.getSkills = void 0;
const db_1 = require("../config/db");
const getSkills = async (req, res, next) => {
    try {
        const skills = await db_1.prisma.skill.findMany({ orderBy: { level: 'desc' } });
        res.status(200).json(skills);
    }
    catch (error) {
        next(error);
    }
};
exports.getSkills = getSkills;
const createSkill = async (req, res, next) => {
    try {
        const skill = await db_1.prisma.skill.create({ data: req.body });
        res.status(201).json(skill);
    }
    catch (error) {
        next(error);
    }
};
exports.createSkill = createSkill;
const deleteSkill = async (req, res, next) => {
    try {
        await db_1.prisma.skill.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Skill deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skillController.js.map