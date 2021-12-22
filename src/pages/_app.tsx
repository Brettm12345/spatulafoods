import '../styles/tailwind.css'
import type {GetSessionParams} from 'next-auth/react'
import {getSession, SessionProvider} from 'next-auth/react'
import {ThemeProvider} from 'next-themes'
import type {AppType} from 'next/dist/next-server/lib/utils'
import {Toaster} from 'react-hot-toast'

import Layout from '../components/Layout'
import {UrqlProvider} from '../providers/UrqlProvider'

const App: AppType = ({Component, pageProps: {session, ...pageProps}}) => (
  <ThemeProvider attribute="class">
    <SessionProvider session={session}>
      <UrqlProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </UrqlProvider>
    </SessionProvider>
  </ThemeProvider>
)

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {session},
  }
}
export default App
