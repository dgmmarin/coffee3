import Layout from '@/components/layout';
import { UserProvider } from '@/hooks/userContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
export default MyApp;