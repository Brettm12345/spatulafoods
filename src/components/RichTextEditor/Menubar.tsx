import type {FC} from 'react'

import type {Editor} from '@tiptap/react'
import clsx from 'clsx'

import type {ElementProps} from '../../types/react'
import {Tooltip} from '../Tooltip'
import {useButtons} from './useButtons'

interface MenuBarProps extends ElementProps<HTMLDivElement> {
  editor: Editor
}
export const MenuBar: FC<MenuBarProps> = ({editor, className, ...props}) => {
  const buttons = useButtons(editor)
  return (
    <div
      className={clsx(
        className,
        'flex flex-wrap gap-4 px-4 py-3',
        'border-b border-b-gray-100 dark:border-b-gray-600'
      )}
      {...props}
    >
      {buttons.map((group, groupId) => (
        <div className="flex" key={groupId.toString()}>
          {group.map(
            ({
              className,
              isEnabled,
              Icon,
              tooltip,
              iconProps: {
                className: iconClassName,
                width: iconWidth = 15,
                height: iconHeight = 15,
                ...iconProps
              } = {
                className: null,
                width: 15,
                height: 15,
              },
              ...props
            }) => (
              <Tooltip key={tooltip} content={tooltip} placement="bottom">
                <button
                  aria-label={tooltip}
                  className={clsx(
                    className,
                    'flex items-center justify-center no-tap-highlight appearance-none size-6',
                    'bg-gray-100 dark:text-gray-200',
                    'first-of-type:rounded-l-[4px] last-of-type:rounded-r-[4px]',
                    'focus:outline-none',
                    'transition-colors ease-in duration-200',
                    !isEnabled
                      ? clsx(
                          'hover:bg-gray-200 dark:bg-gray-600 hover:text-black',
                          'dark:hover:bg-gray-800 dark:hover:text-white',
                          'focus:bg-gray-200 focus:text-black',
                          'dark:focus:bg-gray-800 dark:focus:text-white'
                        )
                      : clsx(
                          'bg-blue-200 dark:bg-blue-500/30',
                          'text-blue-500 dark:text-blue-400',
                          'focus-visible:ring focus-visible:z-50',
                          'focus-visible:ring-blue-500'
                        )
                  )}
                  {...props}
                >
                  <Icon
                    width={iconHeight}
                    height={iconWidth}
                    className={clsx(iconClassName, 'size-[18px]')}
                    {...iconProps}
                  />
                </button>
              </Tooltip>
            )
          )}
        </div>
      ))}
    </div>
  )
}
