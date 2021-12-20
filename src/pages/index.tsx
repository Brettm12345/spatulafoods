import Head from 'next/head'
import {signIn} from 'next-auth/react'
import {Button} from '../components/Button'
import {NextPage} from 'next'
import {useRouter} from 'next/dist/client/router'
import {useEffect} from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/faq')
  })
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button className="btn-blue" onClick={() => signIn()}>
        Sign In
      </Button>
    </div>
  )
}

export default Home
