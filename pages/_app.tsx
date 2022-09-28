import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { createEmotionCache, MantineProvider } from '@mantine/core';

import { defaultMantineTheme } from '../data/mantineTheme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const emotionCache = createEmotionCache({
    key: 'mantine',
    prepend: false,
  })

  return (
    <>
      <Head>
        <title>Daila</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Toaster />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          ...defaultMantineTheme,
          colorScheme: 'light',
        }}
        emotionCache={emotionCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}
