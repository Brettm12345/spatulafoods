import {Editor} from '@tiptap/react'
import clsx from 'clsx'
import {FC} from 'react'
import {Tooltip} from '../Tooltip'
import {useButtons} from './useButtons'

interface MenuBarProps {
  editor: Editor
}
export const MenuBar: FC<MenuBarProps> = ({editor}) => {
  const buttons = useButtons(editor)
  return (
    <div className="flex flex-wrap gap-4 px-4 py-3 border-b border-b-gray-100 dark:border-b-gray-600 ">
      {buttons.map((group, groupId) => (
        <div className="flex" key={groupId.toString()}>
          {group.map(({isEnabled, Icon, tooltip, ...props}) => (
            <Tooltip
              key={tooltip}
              content={tooltip}
              placement="bottom"
              trigger="hover"
            >
              <button
                aria-label={tooltip}
                className={clsx(
                  props.className,
                  'flex items-center justify-center no-tap-highlight appearance-none size-6',
                  'bg-gray-100 dark:bg-gray-700 dark:text-gray-200',
                  'first-of-type:rounded-l-[4px] last-of-type:rounded-r-[4px]',
                  'focus:outline-none',
                  'transition-colors ease-in duration-200',
                  isEnabled
                    ? clsx(
                        'hover:bg-gray-200 hover:text-black',
                        'dark:hover:bg-gray-600 dark:hover:text-white ',
                        'focus-visible:bg-gray-200 focus-visible:text-black',
                        'dark:focus-visible:bg-gray-600 dark:focus-visible:text-white'
                      )
                    : 'bg-blue-200 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400'
                )}
                {...props}
              >
                <Icon width={15} height={15} className="size-[18px]" />
              </button>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  )
}