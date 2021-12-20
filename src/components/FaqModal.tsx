import {Dialog, Transition} from '@headlessui/react'
import Blockquote from '@tiptap/extension-blockquote'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {FC, Fragment, useState} from 'react'
import {useCreateFaqMutation, useUpdateFaqMutation} from '../generated/graphql'
import {Button} from './Button'
import {Tiptap} from './Tiptap'

interface FaqModalProps {
  question?: string
  answer?: string
  id?: number
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
  const [currentQuestion, setQuestion] = useState(question ?? '')
  const [{fetching: creating}, createFaq] = useCreateFaqMutation()
  const [{fetching: updating}, updateFaq] = useUpdateFaqMutation()

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
      question,
      answer: editor.getHTML(),
    } as const
    if (!!id) await updateFaq({id, data})
    else await createFaq({data})
    onClose()
  }
  console.log(isOpen)
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
            <Dialog.Overlay className="fixed inset-0" />
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
          <div className="fixed top-0 max-w-md p-6 my-8 align-middle -translate-x-1/2 bg-white dark:bg-gray-700 rounded-2xl left-1/2">
            <Dialog.Title>{id ? 'Edit faq' : 'Create faq'}</Dialog.Title>
            <div className="mt-6">
              <div className="mb-6">
                <label
                  htmlFor="question"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Question
                </label>
                <input
                  id="question"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={currentQuestion}
                  onChange={event => {
                    setQuestion(event.target.value)
                  }}
                  placeholder=""
                  required
                />
              </div>
              <label
                htmlFor="answer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Answer
              </label>
              <Tiptap editor={editor} />
              <div className="flex items-end justify-end mt-2 space-x-2">
                <Button className="btn-sm btn-light-gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="btn-sm btn-sky"
                  onClick={handleSubmit}
                  disabled={question === ''}
                  loading={!!id ? updating : creating}
                  loadingText={!!id ? 'Updating' : 'Creating'}
                >
                  {!!id ? 'Update' : 'Create'} Faq
                </Button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
