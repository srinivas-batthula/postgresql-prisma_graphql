import prisma from '../../prisma/prisma.ts';

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
            return await prisma.user.update({ where: { id: args.id }, data: { email: args.email, name: args.name } });
        },

        deleteUser: async (_: any, args: { id: number }) => {
            return await prisma.user.delete({ where: { id: args.id } });
        },
    },
};
