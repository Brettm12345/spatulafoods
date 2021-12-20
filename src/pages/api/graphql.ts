import {ApolloServer} from 'apollo-server-micro'
import {schema} from '../../server/schema'
import Cors from 'micro-cors'
import {createContext} from './../../server/context'

const cors = new Cors()
const apolloServer = new ApolloServer({
  context: createContext,
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}
export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  return apolloServer.createHandler({
    path: '/api/graphql',
  })
})
