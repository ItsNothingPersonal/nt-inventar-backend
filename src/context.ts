import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  jwt?: string;
  hasWriteAccess?: boolean;
}

const prisma = new PrismaClient();

export const context: Context = {
  prisma,
};
