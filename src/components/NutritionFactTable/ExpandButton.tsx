import type {FC} from 'react'

import {PlusIcon} from '@heroicons/react/outline'
import clsx from 'clsx'

import type {ElementProps} from '../../types/react'
import {Tooltip} from '../Tooltip'

interface ExpandButtonProps
  extends Omit<ElementProps<HTMLButtonElement>, 'children'> {
  isExpanded: boolean
}

export const ExpandButton: FC<ExpandButtonProps> = ({
  className,
  isExpanded,
  ...props
}) => (
  <Tooltip content={!isExpanded ? 'Open' : 'Close'}>
    <button
      aria-label={!isExpanded ? 'Open' : 'Close'}
      className={clsx(className, 'btn-table')}
      {...props}
    >
      <PlusIcon
        className={clsx(
          'transition-transform ease-mantine duration-300 scale-y',
          isExpanded && 'transform rotate-45'
        )}
      />
    </button>
  </Tooltip>
)
