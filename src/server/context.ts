import type {IncomingMessage} from 'http'

import {PrismaClient} from '@prisma/client'
import type {JWT} from 'next-auth/jwt'
import {getSession} from 'next-auth/react'
import Shopify from 'shopify-api-node'

const prisma = new PrismaClient()

const {SHOPIFY_API_KEY, SHOPIFY_SHOP_NAME, SHOPIFY_PASSWORD} = process.env

const shopify = new Shopify({
  apiKey: SHOPIFY_API_KEY,
  shopName: SHOPIFY_SHOP_NAME,
  password: SHOPIFY_PASSWORD,
})

export interface Context {
  prisma: PrismaClient
  user: JWT
  shopify: Shopify
}

interface CreateContextParams {
  req: IncomingMessage
}

type CreateContext = (params: CreateContextParams) => Promise<Context>
export const createContext: CreateContext = async ({req}) => {
  const user = await getSession({
    req,
  })
  return {prisma, user, shopify}
}
