import type {FC, ReactNode} from 'react'

import {Header} from './Header'

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({children}) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
    <Header />
    {children}
  </div>
)

export default Layout
