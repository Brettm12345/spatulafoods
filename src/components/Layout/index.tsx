import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Header />
      {children}
    </div>
  )
}

export default Layout
