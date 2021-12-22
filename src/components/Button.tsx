import type {FC, ReactNode} from 'react'
import {forwardRef} from 'react'

import clsx from 'clsx'

import type {ElementProps} from '../types/react'
import {Spinner} from './Spinner'

interface ButtonProps extends ElementProps<HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  /** @default "loading" */
  loadingText?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  spinner?: ReactNode
}
export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      disabled = false,
      leftIcon,
      rightIcon,
      loading,
      spinner = <Spinner />,
      loadingText = 'loading...',
      ...props
    },
    ref
  ) => {
    const hasLeftContent = leftIcon || loading
    const leftContent = loading ? spinner : leftIcon
    const hasRightContent = rightIcon && !loading
    const mainContent = loading ? loadingText : children
    return (
      <button
        disabled={loading || disabled}
        aria-busy={loading}
        aria-disabled={disabled}
        ref={ref}
        className={clsx('btn', className)}
        {...props}
      >
        {hasLeftContent && leftContent}
        {mainContent}
        {hasRightContent && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
