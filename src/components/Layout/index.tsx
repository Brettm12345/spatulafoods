import React, {FC, ReactNode} from 'react'
import {Header} from './Header'

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Header />
      {children}
    </div>
  )
}

export default Layout
