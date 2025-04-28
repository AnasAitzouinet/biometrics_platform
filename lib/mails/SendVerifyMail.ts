import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined");

const resend = new Resend(RESEND_API_KEY);

interface SendVerifyMailParams {
    email: string;
    url: string;
}

export const sendVerifyMail = async ({ email, url }: SendVerifyMailParams) => {
    try {
        const data = await resend.emails.send({
            from: 'verify@letheio.com',
            to: [email],
            subject: 'Your Email Verification Link',
            html: `<p>Url is: <strong>${url}</strong></p>`,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        return { success: false, error };
    }
}
