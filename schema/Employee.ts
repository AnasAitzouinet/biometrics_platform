import * as z from "zod"

export const EmployeeLoginSchema = z.object({ 
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Email must be less than 100 characters" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50, { message: "Password must be less than 50 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),
})


export const EmployeeSignUpSchema = z.object({
    fullName: z.string()
        .min(1, { message: "Full name is required" })
        .max(100, { message: "Full name must be less than 100 characters" }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Email must be less than 100 characters" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50, { message: "Password must be less than 50 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),
})