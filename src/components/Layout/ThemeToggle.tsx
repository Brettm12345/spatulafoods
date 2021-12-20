import {useTheme} from 'next-themes'
import {DetailedHTMLProps, FC, HTMLAttributes} from 'react'
import {SunIcon, MoonIcon} from '@heroicons/react/outline'
import {Tooltip} from '../Tooltip'

const icons = {
  dark: MoonIcon,
  light: SunIcon,
} as const
type ThemeToggleProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onClick' | 'aria-label' | 'children'
>

export const ThemeToggle: FC<ThemeToggleProps> = props => {
  const {theme, setTheme} = useTheme()
  const Icon = icons[theme as 'dark' | 'light']
  const label = 'Switch between dark and light theme'
  const iconClass = 'size-6'
  return (
    <Tooltip content={label}>
      <button
        aria-label={label}
        className="btn btn-icon btn-light-gray"
        {...props}
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        {theme === 'dark' ? (
          <MoonIcon className={iconClass} />
        ) : (
          <SunIcon className={iconClass} />
        )}
      </button>
    </Tooltip>
  )
}
