import {Children, cloneElement, FC, isValidElement, ReactElement} from 'react'
import {useId} from '@react-aria/utils'
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
    className={clsx(
      'inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium  rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip',
      'ease-in transition-opacity duration-300',
      variant === 'dark'
        ? 'text-white bg-gray-900 dark:bg-gray-700'
        : 'text-gray-900 bg-white border border-gray-200'
    )}
  >
    {children}
  </Tippy>
)
