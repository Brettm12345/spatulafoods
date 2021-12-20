import Head from 'next/head'
import {signIn} from 'next-auth/react'
import {Button} from '../components/Button'
import {NextPage} from 'next'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Awesome Links</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Button
      className="btn-blue"
      onClick={() => signIn('auth0', {callbackUrl: window.location.origin})}
    >
      Sign In
    </Button>
  </div>
)

export default Home
