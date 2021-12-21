import '../styles/tailwind.css'
import Layout from '../components/Layout'
import {ThemeProvider} from 'next-themes'
import {getSession, GetSessionParams, SessionProvider} from 'next-auth/react'
import {AppType} from 'next/dist/next-server/lib/utils'
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
