import {ApolloServer} from 'apollo-server-micro'
import {schema} from '../../server/schema'
import {createContext} from './../../server/context'

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({
  path: '/api/graphql',
})
