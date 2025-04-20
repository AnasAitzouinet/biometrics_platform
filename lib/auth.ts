import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/utils/prisma";
import { organization } from "better-auth/plugins"
import { customSession } from "better-auth/plugins";
import { getUserById } from "@/utils/User/UserCrud";
import { Roles } from "@/lib/generated/prisma";

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
        customSession(async ({ user, session }) => {
            const userData = await getUserById(user.id)
            console.log(userData)
            if (userData && userData.members) {
                const hasOrganization = userData.members.length > 0 && userData.members[0].organizationId !== null && userData.members[0].role === Roles.ADMIN
                return {
                    ...session,
                    user: {
                        organizationId: userData.members[0].organizationId,
                        hasOrganization
                    }
                }
            }
            return session;
        }),
    ],
    emailAndPassword: {
        enabled: true
    },
});
