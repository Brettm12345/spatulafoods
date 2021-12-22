import type {FC} from 'react'

import {Disclosure} from '@headlessui/react'
import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/outline'
import clsx from 'clsx'

import type {FaqFragment} from '../generated/graphql'
import {useDeleteFaq} from '../hooks/useDeleteFaq'
import {useDisclosure} from '../hooks/useDisclosure'
import type {ElementProps} from '../types/react'
import {Button} from './Button'
import {FaqModal} from './FaqModal'

export const FaqSkeleton: FC<ElementProps<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      className,
      'animate-pulse',
      'w-full h-[58px] rounded-md',
      'bg-gray-200 dark:bg-gray-700'
    )}
    {...props}
  />
)

export const Faq: FC<FaqFragment> = ({id, question, answer}) => {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const {deleting, deleteFaq} = useDeleteFaq({id})
  return (
    <Disclosure>
      {({open}) => (
        <div
          className={clsx(
            'border border-transparent w-full rounded-md mx-auto',
            'transition-[border-color] ease-mantine',
            open && 'border-gray-200 dark:border-gray-600'
          )}
        >
          <Disclosure.Button
            className={clsx(
              'flex w-full px-4 py-4 space-x-2 rounded-t-md',
              'text-base font-medium text-left'
            )}
          >
            <PlusIcon
              className={clsx(
                'force-size-4 mr-3 mt-[0.4ch]',
                'transition-transform ease-mantine duration-300 scale-y',
                open && 'transform rotate-45'
              )}
            />
            <span>{question}</span>
          </Disclosure.Button>
          <Disclosure.Panel
            className={clsx(
              'px-4 pt-1 pb-4 text-sm text-gray-600 bg-transparent',
              'dark:text-gray-300 rounded-b-md'
            )}
          >
            <div
              className={clsx(
                'prose-sm prose prose-slate max-w-unset',
                'dark:prose-invert'
              )}
              dangerouslySetInnerHTML={{__html: answer}}
            />
            <div className="flex mt-4 space-x-2">
              <Button
                onClick={deleteFaq}
                loading={deleting}
                leftIcon={<TrashIcon />}
                loadingText="Deleting..."
                className="btn-sm btn-rose"
              >
                Delete
              </Button>
              <Button
                onClick={onOpen}
                className="btn-sm btn-sky"
                leftIcon={<PencilIcon />}
              >
                Edit
              </Button>
              <FaqModal
                id={id}
                question={question}
                answer={answer}
                isOpen={isOpen && open}
                onClose={onClose}
              />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
