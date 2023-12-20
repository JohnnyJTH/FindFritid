import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(50)
})

export type LoginSchema = z.infer<typeof loginSchema>;