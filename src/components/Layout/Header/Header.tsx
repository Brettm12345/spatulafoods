import React from 'react'
import Link from 'next/link'
import logo from '../../../../public/logo.png'
import Image from 'next/image'
import {ThemeToggle} from './ThemeToggle'
import {HeaderButton} from './HeaderButton'
import {useSession} from 'next-auth/react'
import { Button } from '../../Button'

export const Header = () => {
  const session = useSession()

  return (
    <header className="bg-white max-h-18 dark:bg-gray-900 px-2 sm:px-4 py-2.5">
      <div className="flex flex-wrap items-center justify-between mx-auto max-h-14">
        <Link href="/">
          <Image
            className="logo"
            layout="fixed"
            width="80"
            height="50"
            src={logo}
            alt="Logo"
          />
        </Link>
        {session.status === 'authenticated' && (
          <nav>
            <HeaderButton href="/faq">Faq</HeaderButton>
          </nav>
        )}
        <ThemeToggle />
        {session.status === 'authenticated' && (
          <Button onClick={}
        )}
      </div>
    </header>
  )
}
