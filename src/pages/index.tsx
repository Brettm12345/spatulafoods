import Head from 'next/head'
import {Select} from '../components/Select'
import {links} from '../data/links'
import {signIn} from 'next-auth/react'
import {Tiptap} from '../components/Tiptap'
import {Tooltip} from '../components/Tooltip'
import {useProductsQuery} from '../generated/graphql'
import {gql, useQuery} from 'urql'
import {Button} from '../components/Button'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button className="btn-blue" onClick={() => signIn('auth0')}>
        Sign In
      </Button>
    </div>
  )
}
