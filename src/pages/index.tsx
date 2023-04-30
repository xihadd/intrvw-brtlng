import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getHomePageProducts } from "@/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import ProductGrid from "@/components/productCarousel/productCarousel";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
  });

  const result = await client.query({ query: getHomePageProducts });

  const products: [] = result.data.products.edges;

  return {
    props: {
      data: products,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

type HomePageProps = {
  data: [];
};

export default function HomePage({ data }: HomePageProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col">
        <div className="w-full relative h-40 sm:h-60 lg:h-80 overflow-hidden flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5x relative z-0 text-yellow-400 mt-8 sm:mt-20 md:mt-24 lg:mt-28 ml-8">
            Top Time
            <span className="sm:ml-2 block sm:inline text-white">Classic Cars</span>
          </h1>
          <Image
            width={1800}
            height={511}
            className="min-h-60 sm:min-h-80 absolute top-0 left-0 z-0 min-w-fit"
            alt="Breitling is great"
            src="https://www.breitling.com/media/image/3/home_slide_desktop_1400/asset-version-923509f6e3/banner-web-7.jpg"
          />
        </div>
        <div className="w-full text-center py-10">
          <h2 className="text-3xl uppercase text-yellow-400 font-bold">
            Trending <span className="text-black">Now</span>
          </h2>
        </div>
        <ProductGrid products={data} />
      </div>
    </React.Fragment>
  );
}

/**
 * import React from "react";
import Head from "next/head";
import { GetStaticPropsContext } from "next";

import {
  Product,
  useProductGetHomePageItemsQuery,
  ProductGetHomePageItemsQuery,
  ProductGetHomePageItemsDocument
} from "@/saleor";
import { ApolloQueryResult } from "@apollo/client";

import createApolloClient from "@/gql/client";

export default function HomePage(props: any) {
  //const result = useProductGetHomePageItemsQuery();
  console.log(props);
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
    </React.Fragment>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const result= await createApolloClient(true).query<ProductGetHomePageItemsQuery>({
      query: ProductGetHomePageItemsDocument,
    });
    
  console.log(result);  

  return {
    props: {
      data: result,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

 */
