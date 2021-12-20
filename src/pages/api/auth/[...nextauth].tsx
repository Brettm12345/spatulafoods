import NextAuth from 'next-auth'

import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env?.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {id: 1, name: 'J Smith', email: 'jsmith@example.com'}

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
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
    redirect({baseUrl, url}) {
      console.log('Base URL', baseUrl)
      console.log('URL', url)
      return process.env.NODE_ENV === 'production'
        ? 'https://spatulafoods.vercel.app'
        : 'http://localhost:3000'
    },
  },
})
