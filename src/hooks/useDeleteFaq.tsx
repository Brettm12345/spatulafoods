import clsx from 'clsx'
import type {Toast as ReactHotToast} from 'react-hot-toast'
import toast from 'react-hot-toast'

import {Toast} from '../components/Toast'
import {useCreateFaqMutation, useDeleteFaqMutation} from '../generated/graphql'
import type {FaqFragment} from '../generated/graphql'

interface UseDeleteFaqReturn {
  deleting: boolean
  deleteFaq: () => void
}

interface UseDeleteFaqProps {
  id: number
}

type UseDeleteFaq = (props: UseDeleteFaqProps) => UseDeleteFaqReturn

export const useDeleteFaq: UseDeleteFaq = ({id}) => {
  const [{fetching}, deleteFaq] = useDeleteFaqMutation()
  const [_, createFaq] = useCreateFaqMutation()
  const handleUndo = (data: FaqFragment, t: ReactHotToast) => async () => {
    await createFaq({
      data: {
        id: data.id,
        answer: data.answer,
        question: data.question,
      },
    })
    toast.dismiss(t.id)
  }
  const handleDelete = async () => {
    const {data: deletedData} = await deleteFaq({id})
    const faq = deletedData?.deleteFaq
    toast.custom(
      t => (
        <Toast t={t} title="Faq archived">
          <button
            onClick={handleUndo(faq, t)}
            className={clsx(
              'btn-text',
              'text-indigo-600 dark:text-indigo-400',
              'hover:text-indigo-800 hover:dark:text-indigo-300',
              'focus:text-indigo-800 focus:dark:text-indigo-300'
            )}
          >
            Undo
          </button>
        </Toast>
      ),
      {duration: 3000}
    )
  }
  return {
    deleteFaq: handleDelete,
    deleting: fetching,
  }
}
