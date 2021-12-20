import NextAuth from 'next-auth'

import Auth0Provider from 'next-auth/providers/auth0'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env?.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: 'https://spatulafoods.us.auth0.com',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
})
