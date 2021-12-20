import NextAuth from 'next-auth'

import Auth0Provider from 'next-auth/providers/auth0'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: 'PN3psswVHCE2WyRjDdacVz6grLMoxS2e',
      clientSecret:
        '35ZBMmMx_cfFJcUy4vZ3k6GfTujnkZ04ghG51mm8hHgnE-yt5UBV804tmoomc1xx',
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
    async session({session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
})
