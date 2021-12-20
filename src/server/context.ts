import {PrismaClient} from '@prisma/client'
import {ContextFunction} from 'apollo-server-core'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  user: JWT
}

const secret = process.env.NEXTAUTH_SECRET

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Context> => {
  console.log('cookies', req.headers.cookie)
  const user = await getSession({
    // @ts-ignore
    req: {
      headers: {
        ...req.headers,
        cookie: (req as unknown as {cookie: string})?.cookie,
      },
      ...req,
    },
  })
  console.log(user)
  return {prisma, user}
}
