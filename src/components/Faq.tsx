import type {FC} from 'react'

import {Disclosure} from '@headlessui/react'
import {PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import toast from 'react-hot-toast'

import type {FaqFragment} from '../generated/graphql'
import {useCreateFaqMutation} from '../generated/graphql'
import {useDeleteFaqMutation} from '../generated/graphql'
import {useDisclosure} from '../hooks/useDisclosure'
import type {ElementProps} from '../types/react'
import {Button} from './Button'
import {FaqModal} from './FaqModal'
import {Toast} from './Toast'

export const FaqSkeleton: FC<ElementProps<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      className,
      'w-full h-[58px] rounded-md animate-pulse',
      ' bg-gray-200 dark:bg-gray-600'
    )}
    {...props}
  />
)

export const Faq: FC<FaqFragment> = ({id, question, answer}) => {
  const [{fetching}, deleteFaq] = useDeleteFaqMutation()
  const [_, createFaq] = useCreateFaqMutation()
  const {isOpen, onClose, onOpen} = useDisclosure()
  const handleDelete = async () => {
    const {
      data: {
        deleteFaq: {question: deletedQuestion, answer: deletedAnswer},
      },
    } = await deleteFaq({id})
    toast.custom(
      t => (
        <Toast t={t} title="Faq archived">
          <button
            onClick={async () => {
              await createFaq({
                data: {
                  question: deletedQuestion,
                  answer: deletedAnswer,
                },
              })
              toast.dismiss(t.id)
            }}
            className={clsx(
              'p-4 text-indigo-600 dark:text-indigo-400',
              'hover:text-indigo-800 hover:dark:text-indigo-300',
              'transition-colors ease-mantine duration-300',
              'focus:outline-none focus:text-indigo-800 focus:dark:text-indigo-300'
            )}
          >
            Undo
          </button>
        </Toast>
      ),
      {duration: 3000}
    )
  }
  return (
    <Disclosure>
      {({open}) => (
        <div
          className={clsx(
            'border border-transparent w-full rounded-md mx-auto',
            ' transition-colors ease-mantine',
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
                'force-size-4 mr-3 mt-[0.4ch]',
                'transition-all ease-mantine duration-300 scale-y',
                open && 'transform rotate-45'
              )}
            />
            <span>{question}</span>
          </Disclosure.Button>
          <Disclosure.Panel
            className={clsx(
              'px-4 pt-1 pb-4 text-sm text-gray-600 bg-transparent',
              'delay-300 ease-mantine dark:text-gray-300 rounded-b-md'
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
                onClick={handleDelete}
                loading={fetching}
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
