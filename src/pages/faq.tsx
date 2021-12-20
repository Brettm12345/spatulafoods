import {NextPage} from 'next'
import {Faq} from '../components/Faq'
import {useFaqsQuery} from '../generated/graphql'

const FaqPage: NextPage = () => {
  const [{data}] = useFaqsQuery()
  return (
    <div className="container flex flex-col max-w-lg mx-auto mt-10 space-y-2">
      {data?.faqs?.map(faq => (
        <Faq key={faq.id} {...faq} />
      ))}
    </div>
  )
}

export default FaqPage
