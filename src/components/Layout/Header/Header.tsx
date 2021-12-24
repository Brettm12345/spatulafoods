import clsx from 'clsx'
import {signOut, useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../../public/logo.png'
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
        'px-8 py-2.5',
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
            <>
              <Link href="/products" passHref>
                <button
                  className={clsx(
                    'hover:text-sky-500 dark:hover:text-sky-400',
                    'transition-colors ease-mantine duration-200'
                  )}
                >
                  Products
                </button>
              </Link>
              <Link href="/faq" passHref>
                <button
                  className={clsx(
                    'hover:text-sky-500 dark:hover:text-sky-400',
                    'transition-colors ease-mantine duration-200'
                  )}
                >
                  Faq
                </button>
              </Link>
              <button
                className={clsx(
                  'hover:text-sky-500 dark:hover:text-sky-400',
                  'transition-colors ease-mantine duration-200'
                )}
                onClick={handleSignOut}
              >
                Logout
              </button>
            </>
          )}
          <div
            className={clsx(
              'flex space-x-4',
              'border-l border-gray-200 dark:border-gray-800'
            )}
          >
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
