import type {ComponentProps, FC} from 'react'
import {useMemo} from 'react'

import {SunIcon, MoonIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import {useTheme} from 'next-themes'

import type {ElementProps} from '../../../types/react'
import {Tooltip} from '../../Tooltip'

interface ThemeToggleProps
  extends Omit<
    ElementProps<HTMLButtonElement>,
    'onClick' | 'aria-label' | 'children'
  > {
  iconProps?: ComponentProps<'svg'>
}

export const ThemeToggle: FC<ThemeToggleProps> = ({
  className,
  iconProps: {className: iconClassName, ...iconProps} = {},
  ...props
}) => {
  const {theme, setTheme} = useTheme()
  const label = 'Switch between dark and light theme'
  const localIconProps: ComponentProps<'svg'> = useMemo(
    () => ({
      className: clsx(iconClassName, 'size-6'),
      ...iconProps,
    }),
    [iconClassName, iconProps]
  )
  const icon = useMemo(
    () =>
      theme === 'dark' ? (
        <MoonIcon {...localIconProps} />
      ) : (
        <SunIcon {...localIconProps} />
      ),
    [theme, localIconProps]
  )
  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <Tooltip content={label}>
      <button
        aria-label={label}
        className={clsx(className, 'btn btn-icon btn-light-gray')}
        onClick={handleClick}
        {...props}
      >
        {icon}
      </button>
    </Tooltip>
  )
}
