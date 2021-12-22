import '../styles/tailwind.css'
import {getSession, GetSessionParams, SessionProvider} from 'next-auth/react'
import {ThemeProvider} from 'next-themes'
import {AppType} from 'next/dist/next-server/lib/utils'

import Layout from '../components/Layout'
import {UrqlProvider} from '../providers/UrqlProvider'

const App: AppType = ({Component, pageProps: {session, ...pageProps}}) => (
  <ThemeProvider attribute="class">
    <SessionProvider session={session}>
      <UrqlProvider>
        <Layout>
          <Component {...pageProps} />
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
