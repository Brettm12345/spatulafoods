import {createClient, Client} from '@urql/core'
import {useMemo} from 'react'

const useClient = (options?: RequestInit): Client =>
  useMemo(() => {
    const client = createClient({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/graphql'
          : `https://spatulafoods.vercel.app/api/graphql`,
    })

    return client
  }, [options])

export default useClient
