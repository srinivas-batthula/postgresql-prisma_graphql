import DataLoader from "dataloader";
import prisma from '../../prisma/prisma.ts';

export function createLoaders() {
    return {
        userLoader: new DataLoader(async (keys: readonly string[]) => {
            // Fetch all users with IDs in the 'keys' array
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        in: keys.map(k => Number(k)), // convert string IDs to numbers
                    },
                },
            });
            // Map users by their ID for quick lookup
            const userMap = new Map(users.map(user => [user.id, user]));

            // Return users in the same order as the keys
            return keys.map(key => userMap.get(Number(key)) || null);
        })
    };
}
