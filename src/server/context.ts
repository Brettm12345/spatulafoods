import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {JWT} from 'next-auth/jwt'
import {getSession} from 'next-auth/react'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  user: JWT
}

const secret = process.env.NEXTAUTH_SECRET

export const createContext = async ({
  req,
}: {
  req: NextApiRequest
}): Promise<Context> => {
  const user = await getSession({
    // @ts-ignore
    req: {
      headers: {
        ...req.headers,
        cookie: req.headers.cookie,
      },
      ...req,
    },
  })
  return {prisma, user}
}
