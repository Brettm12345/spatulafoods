import {PrismaClient} from '@prisma/client'
import {ContextFunction} from 'apollo-server-core'
import {NextApiRequest, NextApiResponse} from 'next'
import {getToken, JWT} from 'next-auth/jwt'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  user: JWT
}

const secret = process.env.JWT_SECRET

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Context> => {
  const user = await getToken({
    secret,
    req,
  })
  return {prisma, user}
}
