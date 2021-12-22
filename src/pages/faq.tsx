import {useState} from 'react'

import {PlusIcon} from '@heroicons/react/outline'
import type {NextPage} from 'next'

import {Button} from '../components/Button'
import {Faq} from '../components/Faq'
import {FaqModal} from '../components/FaqModal'
import {useFaqsQuery} from '../generated/graphql'

const FaqPage: NextPage = () => {
  const [{data, fetching}] = useFaqsQuery()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="container flex flex-col max-w-lg pb-20 mx-auto mt-10 space-y-2">
      {fetching ? (
        [...Array(25)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[58px] rounded-md animate-pulse bg-gray-100 dark:bg-gray-600"
          />
        ))
      ) : (
        <>
          {data?.faqs?.map(faq => (
            <Faq key={faq.id} {...faq} />
          ))}
          <Button
            className="mt-5 btn-blue max-w-fit"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon /> Create FAQ
          </Button>
          <FaqModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
      )}
    </div>
  )
}

export default FaqPage
