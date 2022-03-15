import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from 'src/pages/layout';
import 'src/styles/globals.css';
import theme from 'src/styles/theme';

// TODO: ヘッダーにページの名前を代入したい

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
