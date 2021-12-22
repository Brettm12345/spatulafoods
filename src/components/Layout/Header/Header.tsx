import {LogoutIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import {signOut, useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../../public/logo.png'
import {Button} from '../../Button'
import {ThemeSwitcher} from './ThemeSwitcher'

export const Header = () => {
  const session = useSession()
  const handleSignOut = () => {
    signOut()
  }
  return (
    <header
      className={clsx(
        'relative',
        'max-h-18',
        'px-2 sm:px-4 py-2.5',
        'transition-colors ease-mantine duration-200'
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
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
