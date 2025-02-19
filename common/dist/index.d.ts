import zod from 'zod';
export declare const registerUser: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const loginUser: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const rawTranscript: zod.ZodObject<{
    text: zod.ZodString;
    userId: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    text: string;
    userId: string;
}, {
    text: string;
    userId: string;
}>;
export type RawTranscript = zod.infer<typeof rawTranscript>;
export type LoginUser = zod.infer<typeof loginUser>;
export type RegisterUser = zod.infer<typeof registerUser>;
