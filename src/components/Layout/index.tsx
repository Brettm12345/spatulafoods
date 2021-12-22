import type {FC, ReactNode} from 'react'

import clsx from 'clsx'
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
    <div
      className={clsx(
        'min-h-screen bg-gray-50 dark:bg-[#0B1120]',
        'transition-colors ease-mantine duration-200'
      )}
    >
      <Header />
      {children}
    </div>
  </div>
)

export default Layout
