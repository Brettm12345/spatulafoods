import useClient from '../hooks/useClient'
import {FC, ReactNode} from 'react'
import {Provider} from 'urql'

interface UrqlProviderProps {
  children: ReactNode
}
export const UrqlProvider: FC<UrqlProviderProps> = ({children}) => {
  const client = useClient()
  return <Provider value={client}>{children}</Provider>
}
