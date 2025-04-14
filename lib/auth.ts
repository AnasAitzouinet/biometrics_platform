import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/utils/prisma";
import { organization } from "better-auth/plugins"


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    plugins: [ 
        organization({
			async sendInvitationEmail(data) {
                const inviteLink = `http://localhost:3000/accept-invitation/${data.id}`
				console.log(inviteLink)
			},
		}),
    ] ,
    emailAndPassword: {  
        enabled: true
    },
});

