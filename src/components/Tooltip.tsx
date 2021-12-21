import {FC, ReactElement} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'

type Placement = 'top' | 'right' | 'bottom' | 'left'
type Trigger = 'hover' | 'click'
type Variant = 'light' | 'dark'

interface TooltipProps {
  content: string | ReactElement
  children: ReactElement
  /** @default true */
  arrow?: boolean
  className?: string
  /** @default hover */
  trigger?: Trigger
  /** @default top */
  placement?: Placement
  /** @default dark */
  variant?: Variant
}
export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  trigger = 'hover',
  placement = 'top',
  variant = 'dark',
}) => (
  <Tippy
    content={content}
    popperOptions={{
      placement,
    }}
    className={clsx(
      'inline-block py-2 px-3 text-sm font-medium  rounded-lg shadow-sm tooltip',
      variant === 'dark'
        ? 'text-white bg-gray-900 dark:bg-gray-800'
        : 'text-gray-900 bg-white border border-gray-200'
    )}
  >
    {children}
  </Tippy>
)
