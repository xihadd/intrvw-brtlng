import React from "react";
import Head from "next/head";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getHomePageProducts, } from "@/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import ProductGrid from "@/components/productGrid/productGrid";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
  });

  const result = await client.query({ query: getHomePageProducts });

  const products: [] = result.data.products.edges

  return {
    props: {
      data: products
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

type HomePageProps = {
  data: []
}

export default function HomePage({data}: HomePageProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-100 text-center py-8">
            <h2 className="text-3xl uppercase text-yellow-400 font-bold">Trending <span className="text-black">Now</span></h2>
       </div>
      <ProductGrid products={data} />
    </React.Fragment>
  );
}