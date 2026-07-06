import { z } from 'zod';

export const projectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    longDescription: z.string().optional(),
    features: z.array(z.string()).optional().default([]),
    technologies: z.array(z.string()).optional().default([]),
    screenshots: z.array(z.string()).optional().default([]),
    videos: z.array(z.string()).optional().default([]),
    architectureUrl: z.string().url().optional().or(z.literal('')),
    databaseDesignUrl: z.string().url().optional().or(z.literal('')),
    apiDocsUrl: z.string().url().optional().or(z.literal('')),
    githubUrl: z.string().url().optional().or(z.literal('')),
    liveUrl: z.string().url().optional().or(z.literal('')),
    deploymentPlatform: z.string().optional(),
    timeline: z.string().optional(),
    status: z.string().optional(),
    category: z.string().optional(),
    difficulty: z.string().optional(),
    teamSize: z.number().optional(),
    responsibilities: z.array(z.string()).optional().default([]),
    challenges: z.array(z.string()).optional().default([]),
    solutions: z.array(z.string()).optional().default([]),
    lessonsLearned: z.array(z.string()).optional().default([]),
  }),
});
