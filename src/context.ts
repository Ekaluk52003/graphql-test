import { PrismaClient } from '@prisma/client'



declare global {
  var prisma: PrismaClient | undefined
}


const prisma = new PrismaClient()


export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma: prisma,
}
