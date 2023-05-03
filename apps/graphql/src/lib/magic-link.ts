import { PrismaClient, MagicToken, User } from "@prisma/client";

const prisma = new PrismaClient();

async function createToken(user: User) {
    
    const token = await prisma.magicToken.create({
        data: {
            createdAt: new Date(),
            expiryDate: new Date(new Date().getTime() + 30 * 60000),
            userID:user.id,
        },
    });
}
