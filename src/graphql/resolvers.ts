import prisma from '../../prisma/prisma.ts';

// Here, We can also directly USE `controllers / services` functions for each task in 'Query' & 'Mutation'...
// So, In this way the same `controllers` can be used for both 'REST-endpoints' & 'GraphQL-resolvers'...
export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
        user: async (_: any, args: { id: number }) =>
            await prisma.user.findUnique({ where: { id: args.id } }),
    },

    Mutation: {
        createUser: async (_: any, args: { name?: string; email: string }) => {
            return await prisma.user.create({ data: args });
        },

        updateUser: async (_: any, args: { id: number, email?: string, name?: string }) => {
            const data: Record<string, any> = {};
            if (args.email !== undefined) data.email = args.email;
            if (args.name !== undefined) data.name = args.name;
            return await prisma.user.update({ where: { id: args.id }, data });
        },

        deleteUser: async (_: any, args: { id: number }) => {
            return await prisma.user.delete({ where: { id: args.id } });
        },
    },
};
