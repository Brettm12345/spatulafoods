import {FC, ReactNode} from 'react'

import clsx from 'clsx'

import {ElementProps} from '../types/react'
import {Spinner} from './Spinner'

interface ButtonProps extends ElementProps<HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  /** @default "loading" */
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled = false,
  leftIcon,
  rightIcon,
  loading,
  loadingText = 'loading...',
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      aria-busy={loading}
      aria-disabled={disabled}
      className={clsx('btn', className)}
      {...props}
    >
      {(leftIcon || loading) && (loading ? <Spinner /> : leftIcon)}
      {loading ? loadingText : children}
      {rightIcon && !loading && rightIcon}
    </button>
  )
}
