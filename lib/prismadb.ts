import { PrismaClient } from '@prisma/client';

//prevent next hot reload to keep creating new PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
