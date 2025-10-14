import prisma from '../../prisma/prisma.ts';

// Here, We can also directly USE `controllers / services` functions for each task in 'Query' & 'Mutation'...
// So, In this way the same `controllers` can be used for both 'REST-endpoints' & 'GraphQL-resolvers'...
export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
        user: async (_: any, { input }: { input: { id: number } }) =>
            await prisma.user.findUnique({ where: { id: input.id } }),
    },

    Mutation: {
        createUser: async (_: any, { input }: { input: { name: string; email: string } }) => {
            return await prisma.user.create({ data: input });
        },

        updateUser: async (_: any, { input }: { input: { id: number, email?: string, name?: string } }) => {
            const data: Record<string, any> = {};
            if (input.email !== undefined) data.email = input.email;
            if (input.name !== undefined) data.name = input.name;
            return await prisma.user.update({ where: { id: input.id }, data });
        },

        deleteUser: async (_: any, { input }: { input: { id: number } }) => {
            return await prisma.user.delete({ where: { id: input.id } });
        },
    },
};
