import '../styles/tailwind.css'
import Layout from '../components/Layout'
import {ThemeProvider} from 'next-themes'
import {SessionProvider} from 'next-auth/react'
import {AppType} from 'next/dist/next-server/lib/utils'
import {UrqlProvider} from '../providers/UrqlProvider'

const MyApp: AppType = ({Component, pageProps: {session, ...pageProps}}) => {
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
