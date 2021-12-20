import {Children, cloneElement, FC, isValidElement, ReactElement} from 'react'
import {useId} from '@react-aria/utils'
import clsx from 'clsx'

const {entries, fromEntries} = Object
type Placement = 'top' | 'right' | 'bottom' | 'left'
type Trigger = 'hover' | 'click'
type Variant = 'light' | 'dark'

interface TooltipAttrs {
  target: string
  placement: Placement
  trigger: Trigger
  style: Variant
}

const makeTooltipAttrs = (props: TooltipAttrs): Record<string, string> =>
  fromEntries(
    entries(props).map(([key, value]) => [`data-tooltip-${key}`, value])
  )

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
  arrow = false,
  trigger = 'hover',
  placement = 'top',
  variant = 'dark',
}) => {
  const id = useId()
  const childrenWithProps = Children.map(children, child =>
    isValidElement(child)
      ? cloneElement(
          child,
          makeTooltipAttrs({
            target: id,
            style: variant,
            placement: placement,
            trigger,
          })
        )
      : child
  )
  const isDark = variant === 'dark'
  return (
    <>
      {childrenWithProps}
      <div
        id={id}
        role="tooltip"
        className={clsx(
          'inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium  rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip',
          'ease-in transition-opacity duration-300',
          isDark
            ? 'text-white bg-gray-900 dark:bg-gray-700'
            : 'text-gray-900 bg-white border border-gray-200'
        )}
      >
        {content}
        {arrow && <div className="tooltip-arrow" data-popper-arrow />}
      </div>
    </>
  )
}
