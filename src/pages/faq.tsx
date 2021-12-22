import {PlusIcon} from '@heroicons/react/outline'
import type {NextPage} from 'next'

import {Button} from '../components/Button'
import {Faq, FaqSkeleton} from '../components/Faq'
import {FaqModal} from '../components/FaqModal'
import {useFaqsQuery} from '../generated/graphql'
import {useDisclosure} from '../hooks/useDisclosure'

const FaqPage: NextPage = () => {
  const [{data, fetching}] = useFaqsQuery()
  const {onClose, onOpen, isOpen} = useDisclosure()
  return (
    <div className="container flex flex-col max-w-lg pb-20 mx-auto mt-10 space-y-2">
      {fetching ? (
        [...Array(25)].map((_, index) => <FaqSkeleton key={index} />)
      ) : (
        <>
          {data?.faqs?.map(faq => (
            <Faq key={faq.id} {...faq} />
          ))}
          <Button className="mt-5 btn-blue max-w-fit" onClick={onOpen}>
            <PlusIcon /> Create FAQ
          </Button>
          <FaqModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </div>
  )
}

export default FaqPage
