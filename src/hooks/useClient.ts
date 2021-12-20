import {createClient, Client} from '@urql/core'
import {useSession} from 'next-auth/react'
import {useMemo} from 'react'

const useClient = (options?: RequestInit): Client => {
  const session = useSession()
  console.log(session)
  const token = session?.data?.accessToken
  const headers = options?.headers ?? {}

  return useMemo(() => {
    const client = createClient({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/graphql'
          : `https://spatulafoods.vercel.app/api/graphql`,
      fetchOptions: () => {
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...headers,
          },
        }
      },
    })

    return client
  }, [options, token])
}

export default useClient
