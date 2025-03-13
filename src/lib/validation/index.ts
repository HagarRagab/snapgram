import { z } from "zod";

export const signupValidationSchema = z.object({
    name: z.string().trim().min(2, { message: "At least 2 characters." }),
    username: z.string().trim().min(2, {
        message: "At least 2 characters.",
    }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().trim().min(8, { message: "At least 8 characters." }),
});

export const signinValidationSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().trim().min(8, { message: "At least 8 characters." }),
});

export const PostValidationSchema = z.object({
    caption: z
        .string()
        .trim()
        .min(5, { message: "At least 5 characters." })
        .max(2200, { message: "Maximum 2200 characters." }),
    file: z.custom<File[]>(),
    location: z
        .string()
        .trim()
        .min(1, { message: "This field is required" })
        .max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
});

export const ProfileValidationSchema = z.object({
    file: z.custom<File[]>(),
    name: z.string().trim().min(2, { message: "At least 2 characters." }),
    username: z.string().trim().min(2, {
        message: "At least 2 characters.",
    }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    bio: z.string().trim().max(1000, { message: "Maximum 1000 characters." }),
});
