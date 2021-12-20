import Head from 'next/head'
import {Select} from '../components/Select'
import {links} from '../data/links'
import {signIn} from 'next-auth/react'
import {Tiptap} from '../components/Tiptap'
import {Tooltip} from '../components/Tooltip'
import {useProductsQuery} from '../generated/graphql'
import {gql, useQuery} from 'urql'

export default function Home() {
  const [data] = useProductsQuery()
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {JSON.stringify(data)}
      <div className="container mx-auto my-20">
        <Tiptap />
      </div>
    </div>
  )
}
