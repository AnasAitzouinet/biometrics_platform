import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined");

const resend = new Resend(RESEND_API_KEY);

interface SendOtpMailParams {
    email: string;
    otp: string;
}

export const sendOtpMail = async ({ email, otp }: SendOtpMailParams) => {
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Your One-Time Password',
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        return { success: false, error };
    }
}
