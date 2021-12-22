import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env?.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env?.NEXTAUTH_SECRET,
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: 'https://spatulafoods.us.auth0.com',
    }),
    // ...add more providers here
  ],
  callbacks: {
    redirect() {
      return process.env.NODE_ENV === 'production'
        ? 'https://spatulafoods.vercel.app'
        : 'http://localhost:3000'
    },
  },
})
