import {createClient} from 'urql'

export const client = createClient({
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/graphql'
      : `https://spatulafoods.vercel.app/api/graphql`,
})
