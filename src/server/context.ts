import type {IncomingMessage} from 'http'

import {PrismaClient} from '@prisma/client'
import type {JWT} from 'next-auth/jwt'
import {getSession} from 'next-auth/react'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  user: JWT
}

interface CreateContextParams {
  req: IncomingMessage
}

type CreateContext = (params: CreateContextParams) => Promise<Context>
export const createContext: CreateContext = async ({req}) => {
  const user = await getSession({
    req,
  })
  return {prisma, user}
}
