import {Auth0} from '@styled-icons/simple-icons/Auth0'
import type {NextPage} from 'next'
import type {GetSessionParams} from 'next-auth/react'
import {signIn} from 'next-auth/react'
import {getSession} from 'next-auth/react'

import {Button} from '../components/Button'

const Home: NextPage = () => (
  <div>
    <div className="container flex flex-col items-center justify-center max-w-full">
      <Button
        className="mx-auto mt-[30vh] btn-sky"
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
