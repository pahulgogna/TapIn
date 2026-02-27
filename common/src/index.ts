import zod from 'zod';

export const registerUser = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().min(3).optional()
})

export const loginUser = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const rawTranscript = zod.object({
    text: zod.string(),
    userId: zod.string()
})

export type RawTranscript = zod.infer<typeof rawTranscript>
export type LoginUser = zod.infer<typeof loginUser>
export type RegisterUser = zod.infer<typeof registerUser>