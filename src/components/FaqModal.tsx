import type {FC} from 'react'
import {Fragment} from 'react'

import {Dialog, Transition} from '@headlessui/react'
import Blockquote from '@tiptap/extension-blockquote'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'

import type {FaqFragment} from '../generated/graphql'
import {useCreateFaqMutation, useUpdateFaqMutation} from '../generated/graphql'
import {useTextInput} from '../hooks/useTextInput'
import {Button} from './Button'
import {RichTextEditor} from './RichTextEditor'

interface Info {
  loadingText: string
  loading: boolean
  action: string
  title: string
}

type Actions = 'update' | 'create'
type ActionInfo = Record<Actions, Info>

interface FaqModalProps extends Partial<FaqFragment> {
  isOpen: boolean
  onClose: () => void
}

export const FaqModal: FC<FaqModalProps> = ({
  question,
  answer,
  id,
  isOpen,
  onClose,
}) => {
  const [currentQuestion, setQuestion] = useTextInput(question)
  const [{fetching: creating}, createFaq] = useCreateFaqMutation()
  const [{fetching: updating}, updateFaq] = useUpdateFaqMutation()

  const actionInfo: ActionInfo = {
    create: {
      loading: creating,
      action: 'Create Faq',
      loadingText: 'Creating',
      title: 'Create Faq',
    },
    update: {
      action: 'Update',
      title: 'Update Faq',
      loading: updating,
      loadingText: 'Updating',
    },
  }

  const {loading, loadingText, action, title} =
    actionInfo[!id ? 'create' : 'update']

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: answer,
  })
  const handleSubmit = async () => {
    const data = {
      question: currentQuestion,
      answer: editor.getHTML(),
    } as const
    if (!!id) await updateFaq({id, data})
    else await createFaq({data})
    onClose()
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/20" />
          </Transition.Child>
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={clsx(
              'fixed top-0 w-11/12 max-w-md px-4 py-4 my-8 ',
              'align-middle -translate-x-1/2',
              'bg-white dark:bg-gray-700 rounded-2xl left-1/2'
            )}
          >
            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
            <div className="mt-6">
              <div className="mb-6">
                <label htmlFor="question" className="form-label">
                  Question
                </label>
                <input
                  id="question"
                  className="input"
                  value={currentQuestion}
                  onChange={setQuestion}
                  placeholder=""
                  required
                />
              </div>
              <label htmlFor="answer" className="form-label">
                Answer
              </label>
              <RichTextEditor editor={editor} />
              <div className="flex items-end justify-end mt-4 space-x-2">
                <Button className="btn-sm btn-light-gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="btn-sm btn-sky"
                  onClick={handleSubmit}
                  disabled={question === ''}
                  loading={loading}
                  loadingText={loadingText}
                >
                  {action}
                </Button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
