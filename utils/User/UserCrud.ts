import prisma from "../prisma";


export async function createUser(data: any) {
    const user = await prisma.user.create({
        data: {
            ...data,
        },
    });
    return user;
}
export async function getUserById(id: string) {
    console.log("Fetching user with ID:", id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                members: {
                    where: {
                        role: {
                            in: ['ADMIN', 'MEMBER'] // Explicitly use values from the Roles enum
                        }
                    }
                }
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error(`Failed to get user with ID ${id}: ${error instanceof Error ? error.message : String(error)}`);
    }
}
