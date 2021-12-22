import {ApolloServer} from 'apollo-server-micro'
import Cors from 'micro-cors'

import {schema} from '../../server/schema'
import {createContext} from './../../server/context'

const cors = Cors()
const apolloServer = new ApolloServer({
  context: createContext,
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}
const handler = apolloServer.createHandler({
  path: '/api/graphql',
})

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  return handler(req, res)
})
