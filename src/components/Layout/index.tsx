import type {FC, ReactNode} from 'react'

import Head from 'next/head'

import {Header} from './Header'

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({children}) => (
  <div>
    <Head>
      <title>Spatulafoods Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Header />
      {children}
    </div>
  </div>
)

export default Layout
