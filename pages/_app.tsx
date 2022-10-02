import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { createEmotionCache, MantineProvider } from '@mantine/core';

import { defaultMantineTheme } from '../data/mantineTheme';
import ContextWrapper from '../context/ContextWrapper';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

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
        <ContextWrapper>
          {getLayout(<Component {...pageProps} />)}
        </ContextWrapper>
      </MantineProvider>
    </>
  )
}
