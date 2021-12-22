import {FC, ReactNode} from 'react'

import {Provider} from 'urql'

import {client} from '../lib/urql'

interface UrqlProviderProps {
  children: ReactNode
}

export const UrqlProvider: FC<UrqlProviderProps> = ({children}) => (
  <Provider value={client}>{children}</Provider>
)
