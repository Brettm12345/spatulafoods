import 'tippy.js/animations/shift-away-subtle.css'
import type {FC, ReactElement} from 'react'

import Tippy from '@tippyjs/react'
import clsx from 'clsx'

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
  arrow = false,
  children,
  trigger,
  placement = 'top',
  variant = 'dark',
}) => (
  <Tippy
    trigger={trigger}
    arrow={arrow}
    content={content}
    popperOptions={{
      placement,
    }}
    animation="shift-away-subtle"
    className={clsx(
      'inline-block py-2 px-3 text-sm font-medium rounded-lg shadow-sm',
      variant === 'dark'
        ? 'text-white bg-gray-900 dark:bg-gray-900'
        : 'text-gray-900 bg-white border border-gray-200'
    )}
  >
    {children}
  </Tippy>
)
