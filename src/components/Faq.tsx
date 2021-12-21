import {Disclosure} from '@headlessui/react'
import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import React, {FC, useState} from 'react'
import {useDeleteFaqMutation} from '../generated/graphql'
import {Button} from './Button'
import {FaqModal} from './FaqModal'

export interface FaqProps {
  id: number
  question: string
  answer: string
}

export const Faq: FC<FaqProps> = ({id, question, answer}) => {
  const [{fetching}, deleteFaq] = useDeleteFaqMutation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Disclosure>
      {({open}) => (
        <div
          className={clsx(
            'border border-transparent w-full rounded-md mx-auto transition-colors ease-mantine',
            open && 'border-gray-200 dark:border-gray-600'
          )}
        >
          <Disclosure.Button
            className={clsx(
              'flex w-full px-4 py-4 space-x-2 rounded-t-md',
              'text-base font-medium text-left',
              'transition-colors ease-mantine duration-300 delay-[75ms]'
            )}
          >
            <PlusIcon
              className={clsx(
                'min-size-4 max-size-4 mr-3 mt-[0.4ch]',
                'transition-all ease-mantine duration-300 scale-y',
                open && 'transform rotate-45'
              )}
            />
            <span>{question}</span>
          </Disclosure.Button>
          <Disclosure.Panel
            className={clsx(
              'px-4 pt-1 pb-4 text-sm text-gray-600 bg-transparent delay-300 ease-mantine dark:text-gray-300 rounded-b-md'
            )}
          >
            <div
              className="prose-sm prose prose-slate dark:prose-invert max-w-unset"
              dangerouslySetInnerHTML={{__html: answer}}
            />
            <div className="flex mt-4 space-x-2">
              <Button
                onClick={() => {
                  deleteFaq({id})
                }}
                loading={fetching}
                leftIcon={<TrashIcon />}
                loadingText="Deleting..."
                className="btn-sm btn-rose"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(true)
                }}
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
                onClose={() => {
                  setIsOpen(false)
                }}
              />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
