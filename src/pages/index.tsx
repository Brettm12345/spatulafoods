import {Auth0} from '@styled-icons/simple-icons/Auth0'
import {NextPage} from 'next'
import {signIn} from 'next-auth/react'
import {getSession, GetSessionParams} from 'next-auth/react'
import Head from 'next/head'

import {Button} from '../components/Button'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Spatulafoods Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container flex items-center justify-center max-w-full">
      <Button
        className="mx-auto mt-[30vh] btn-blue"
        leftIcon={<Auth0 />}
        onClick={() => signIn('auth0', {callbackUrl: '/faq'})}
      >
        Sign In With Auth0
      </Button>
    </div>
  </div>
)

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/faq',
        permanent: false,
      },
    }
  }
  return {
    props: {session},
  }
}

export default Home
