import type {FC, ReactNode} from 'react'

import {XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import type {Toast as ReactHotToast} from 'react-hot-toast'
import {toast} from 'react-hot-toast'

import type {ElementProps} from '../types/react'

interface ToastProps extends Omit<ElementProps<HTMLDivElement>, 'title'> {
  t: ReactHotToast
  title: ReactNode
}

export const Toast: FC<ToastProps> = ({
  className,
  t,
  children,
  title,
  ...props
}) => (
  <div
    className={clsx(
      className,
      t.visible ? 'animate-enter' : 'animate-leave',
      'max-w-md w-full bg-white shadow-lg',
      'dark:bg-gray-900',
      'rounded-lg pointer-events-auto flex',
      'ring-1 ring-black ring-opacity-5'
    )}
    {...props}
  >
    <p
      className={clsx(
        'flex-1 w-0 p-4 text-sm font-medium',
        ' text-gray-900 dark:text-gray-200'
      )}
    >
      {title}
    </p>
    {children}
    <button
      onClick={() => toast.dismiss(t.id)}
      className={clsx(
        'p-4 text-gray-600 dark:text-gray-300',
        'hover:text-gray-900 hover:dark:text-white',
        'transition-colors ease-mantine duration-300',
        'focus:outline-none hover:text-gray-900 hover:dark:text-white'
      )}
    >
      <XIcon className="m-0 fill-current size-4" />
    </button>
  </div>
)
