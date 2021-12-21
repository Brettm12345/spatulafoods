import clsx from 'clsx'
import {ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode} from 'react'
import {Spinner} from './Spinner'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  /** @default "loading" */
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
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
