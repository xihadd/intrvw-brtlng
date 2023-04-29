import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import createApolloClient from "../gql/client";
import Layout from "../containers/layout/layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider
      client={createApolloClient(false)}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
