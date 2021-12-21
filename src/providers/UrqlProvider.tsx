import {client} from '../lib/urql'
import {FC, ReactNode} from 'react'
import {Provider} from 'urql'

interface UrqlProviderProps {
  children: ReactNode
}
export const UrqlProvider: FC<UrqlProviderProps> = ({children}) => {
  return <Provider value={client}>{children}</Provider>
}
