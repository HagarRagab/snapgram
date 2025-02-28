import { z } from "zod";

export const signinValidationSchema = z.object({
    name: z.string().trim().min(2, { message: "At least 2 characters." }),
    username: z.string().trim().min(2, {
        message: "At least 2 characters.",
    }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string().trim().min(8, { message: "At least 8 characters." }),
});
