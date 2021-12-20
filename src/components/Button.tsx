import clsx from 'clsx'
import {
  ButtonHTMLAttributes,
  cloneElement,
  DetailedHTMLProps,
  FC,
  isValidElement,
  ReactNode,
} from 'react'
import {Spinner} from './Spinner'

const iconClasses = '-ml-1 size-5 fill-current mr-3'
const renderIcon = (icon: ReactNode) => {
  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: clsx(icon?.props?.className, iconClasses),
    })
  }
}
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  /** @default "loading" */
  loadingText?: string
  leftIcon?: ReactNode
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  leftIcon,
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
      {(leftIcon || loading) && (loading ? <Spinner /> : renderIcon(leftIcon))}
      {loading ? loadingText : children}
    </button>
  )
}
