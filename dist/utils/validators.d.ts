import { z } from 'zod';
export declare const projectSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        longDescription: z.ZodOptional<z.ZodString>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        technologies: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        screenshots: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        videos: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        architectureUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        databaseDesignUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        apiDocsUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        githubUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        liveUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        deploymentPlatform: z.ZodOptional<z.ZodString>;
        timeline: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodString>;
        teamSize: z.ZodOptional<z.ZodNumber>;
        responsibilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        challenges: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        solutions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        lessonsLearned: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validators.d.ts.map