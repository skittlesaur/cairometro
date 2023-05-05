import { PrismaClient, MagicToken, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createToken = async (user: User) => {

    const token = await prisma.magicToken.create({
        data: {
            createdAt: new Date(),
            expiryDate: new Date(new Date().getTime() + 30 * 60000),
            userID: user.id,
        },
    });
    return (token);

}
