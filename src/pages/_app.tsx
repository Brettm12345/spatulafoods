import '../styles/tailwind.css'
import Layout from '../components/Layout'
import {ThemeProvider} from 'next-themes'
import {SessionProvider, signIn} from 'next-auth/react'
import {AppType} from 'next/dist/next-server/lib/utils'
import {UrqlProvider} from '../providers/UrqlProvider'
import {useEffect} from 'react'

const MyApp: AppType = ({Component, pageProps: {session, ...pageProps}}) => {
  useEffect(() => {
    if (!session) {
      signIn('auth0')
    }
  }, [session])
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <UrqlProvider>
          <Layout>
            <Component {...pageProps} />
            <script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
          </Layout>
        </UrqlProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
