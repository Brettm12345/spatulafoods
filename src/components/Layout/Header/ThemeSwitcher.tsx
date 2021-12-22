import type {FC} from 'react'
import {Fragment} from 'react'

import {Listbox} from '@headlessui/react'
import clsx from 'clsx'
import {useTheme} from 'next-themes'

import {SunIcon, MoonIcon, settings} from './ThemeIcons'

interface ThemeSwitcherProps {
  iconClassName?: string
  panelClassName?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  iconClassName,
  panelClassName,
}) => {
  const {theme, setTheme} = useTheme()
  const iconClass = clsx(iconClassName, 'size-6')
  return (
    <Listbox value={theme} onChange={setTheme}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button type="button">
        <span className="dark:hidden">
          <SunIcon className={iconClass} selected={theme !== 'system'} />
        </span>
        <span className="hidden dark:inline">
          <MoonIcon className={iconClass} selected={theme !== 'system'} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={clsx(
          'absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300',
          panelClassName
        )}
      >
        {settings.map(({value, label, icon: Icon}) => (
          <Listbox.Option key={value} value={value} as={Fragment}>
            {({active, selected}) => (
              <li
                className={clsx(
                  'py-1 px-2 flex items-center cursor-pointer',
                  selected && 'text-sky-500',
                  active && 'bg-gray-50 dark:bg-gray-600/30'
                )}
              >
                <Icon selected={selected} className="w-6 h-6 mr-2" />
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
