import type {ComponentProps, DetailedHTMLProps, FC, HTMLAttributes} from 'react'

import {SunIcon, MoonIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import {useTheme} from 'next-themes'

import {Tooltip} from '../../Tooltip'

interface ThemeToggleProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
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
  const localIconProps: ComponentProps<'svg'> = {
    className: clsx(iconClassName, 'size-6'),
    ...iconProps,
  }
  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const icon =
    theme === 'dark' ? (
      <MoonIcon {...localIconProps} />
    ) : (
      <SunIcon {...localIconProps} />
    )
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
