"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        subtitle: zod_1.z.string().optional(),
        description: zod_1.z.string().min(1, 'Description is required'),
        longDescription: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional().default([]),
        technologies: zod_1.z.array(zod_1.z.string()).optional().default([]),
        screenshots: zod_1.z.array(zod_1.z.string()).optional().default([]),
        videos: zod_1.z.array(zod_1.z.string()).optional().default([]),
        architectureUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        databaseDesignUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        apiDocsUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        githubUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        liveUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        deploymentPlatform: zod_1.z.string().optional(),
        timeline: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        difficulty: zod_1.z.string().optional(),
        teamSize: zod_1.z.number().optional(),
        responsibilities: zod_1.z.array(zod_1.z.string()).optional().default([]),
        challenges: zod_1.z.array(zod_1.z.string()).optional().default([]),
        solutions: zod_1.z.array(zod_1.z.string()).optional().default([]),
        lessonsLearned: zod_1.z.array(zod_1.z.string()).optional().default([]),
    }),
});
//# sourceMappingURL=validators.js.map