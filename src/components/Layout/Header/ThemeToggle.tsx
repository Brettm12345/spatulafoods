import {useTheme} from 'next-themes'
import {DetailedHTMLProps, FC, HTMLAttributes} from 'react'
import {SunIcon, MoonIcon} from '@heroicons/react/outline'
import {Tooltip} from '../../Tooltip'

type ThemeToggleProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onClick' | 'aria-label' | 'children'
>

export const ThemeToggle: FC<ThemeToggleProps> = props => {
  const {theme, setTheme} = useTheme()
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
