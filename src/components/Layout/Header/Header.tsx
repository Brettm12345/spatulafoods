import {LogoutIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import {signOut, useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../../public/logo.png'
import {Button} from '../../Button'
import {ThemeToggle} from './ThemeToggle'

export const Header = () => {
  const session = useSession()
  const handleSignOut = () => {
    signOut()
  }
  return (
    <header
      className={clsx(
        'max-h-18',
        'bg-gray-50 dark:bg-gray-900',
        'px-2 sm:px-4 py-2.5'
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap items-center justify-between',
          'mx-auto max-h-14'
        )}
      >
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
        <div className="flex space-x-4">
          {session.status === 'authenticated' && (
            <Button
              className="text-base btn-light-gray"
              leftIcon={<LogoutIcon />}
              onClick={handleSignOut}
            >
              Logout
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
