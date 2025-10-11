// Connecting to Neon-PostGreSQL-DB via Prisma...
import { PrismaClient } from '@prisma/client';

declare global {
    // allow global var in dev to avoid multiple clients when hot reloading
    // eslint-disable-next-line no-var
    namespace NodeJS {
        interface Global {
            __prisma?: PrismaClient;
        }
    }
}

const globalForPrisma = global as typeof global & { __prisma?: PrismaClient };
const prisma = globalForPrisma.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.__prisma = prisma;
}

export default prisma;  // Neon-DB instance (similar to MongoDB connection via mongoose)...
