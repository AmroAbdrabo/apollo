/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "lib/modules/firebase/firebaseProvider";
import customTheme from "lib/styles/customTheme";
import "lib/styles/globals.css";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import defaultSEOConfig from "../../next-seo.config";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// custom page type
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// custom app type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyRocketHub = ({ Component, pageProps }: AppPropsWithLayout) => {
  // get page layout
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Provider store={store}>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyRocketHub;
