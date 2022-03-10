import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';

import '../styles/globals.css';
import 'react-alice-carousel/lib/alice-carousel.css';

import Header from '../components/Header';
import CryptoProvider from '../context/CryptoContext';
import AlertMessage from '../components/Alert';
import Footer from '../components/Footer';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Crypto Tracker</title>
        <meta name='description' content='cryptocurrency prices, history' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/dollar-coin.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <CryptoProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <AlertMessage />
          <Footer />
        </CryptoProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
