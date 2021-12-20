import {PlusIcon} from '@heroicons/react/outline'
import {NextPage} from 'next'
import {useState} from 'react'
import {Button} from '../components/Button'
import {Faq} from '../components/Faq'
import {FaqModal} from '../components/FaqModal'
import {useFaqsQuery} from '../generated/graphql'

const FaqPage: NextPage = () => {
  const [{data}] = useFaqsQuery()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="container flex flex-col max-w-lg pb-20 mx-auto mt-10 space-y-2">
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
    </div>
  )
}

export default FaqPage
