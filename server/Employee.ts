"use server"
import { EmployeeSignUpSchema } from './../schema/Employee';
import * as z from "zod"
import { auth } from "@/lib/auth"
import prisma from "@/utils/prisma"
import { EmployeeLoginSchema } from "@/schema/Employee"
import { headers } from "next/headers"

export const EmployerLogin = async (data: z.infer<typeof EmployeeLoginSchema>) => {
    try {
        const validatedData = EmployeeLoginSchema.parse(data);
        if (!validatedData) {
            return {
                error: "Invalid data",
                message: "Please check your input and try again.",
            }
        }
        const { email, password } = validatedData;

        const user = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        });

        if (!user) {
            return {
                error: "Invalid credentials",
                message: "Please check your email and password.",
            }
        }

        return {
            success: true,
            message: "Login successful",
            user,
        }
    } catch (error) {
        console.error("Error during login:", error);
        return {
            error: "Login failed",
            message: "Please check your credentials and try again.",
            instanceofError: error instanceof Error ? error.message : String(error),
        }
    }
}

export const EmployeeSignUp = async (data: z.infer<typeof EmployeeSignUpSchema>) => {
    try {
        const validatedData = EmployeeSignUpSchema.parse(data);
        if (!validatedData) {
            return {
                error: "Invalid data",
                message: "Please check your input and try again.",
            }
        }
        const { fullName, email, password } = validatedData;

        const user = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName,
            }
        });

        if (!user) {
            return {
                error: "Invalid credentials",
                message: "Please check your email and password.",
            }
        }

        // Send OTP email
        const otp = await auth.api.sendVerificationOTP({
            body: {
                email,
                type: "email-verification",
            }
        });


        console.log("OTP sent:", otp);
        return {
            success: true,
            message: "Login successful",
            user,
        }
    } catch (error) {
        console.error("Error during login:", error);
        return {
            error: "Login failed",
            message: "Please check your credentials and try again.",
            instanceofError: error instanceof Error ? error.message : String(error),
        }
    }
}

   