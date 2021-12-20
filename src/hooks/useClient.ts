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
          ? 'https://localhost:3000/api/graphql'
          : `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
