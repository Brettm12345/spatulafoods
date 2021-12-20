import React from 'react'
import Link from 'next/link'
import {useTheme} from 'next-themes'
import logo from '../../../public/logo.png'
import Image from 'next/image'
import {ThemeToggle} from './ThemeToggle'

const Header = () => {
  const {setTheme, theme} = useTheme()
  return (
    <header className="bg-white max-h-18 dark:bg-gray-900 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto max-h-14">
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
        <nav>
          <Link href="/faq">Faq</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
