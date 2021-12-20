import {createClient} from '@urql/core'
import {useSession} from 'next-auth/react'
import * as React from 'react'

const useClient = (options?: RequestInit) => {
  const session = useSession()
  const token = session?.data?.accessToken

  return React.useMemo(() => {
    const client = createClient({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/graphql'
          : `https://spatulafoods.vercel.app/api/graphql`,
      fetchOptions: () => {
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(options?.headers ? options.headers : {}),
          },
        }
      },
    })

    return client
  }, [options, token])
}

export default useClient
