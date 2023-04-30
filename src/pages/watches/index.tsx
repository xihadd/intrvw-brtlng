import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";

import { Product, useProductGetHomePageItemsQuery } from "@/saleor";
import { GetStaticPropsContext } from "next";
import { getProductDetailsBySlug } from "@/queries";


// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const client = new ApolloClient({
//       uri: "https://demo.saleor.io/graphql/",
//       cache: new InMemoryCache(),
//     });
  
//     const result = await client.query({ query: getProductDetailsBySlug, variables: { slug: "breitling-top-time-chrono-42" } });
  
//     const products: [] = result.data.products.edges;
  
//     return {
//       props: {
//         data: products,
//       },
//       revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
//     };
//   };
  
//   type HomePageProps = {
//     data: [];
//   };

export default function Products() {
  const { loading, error, data } = useProductGetHomePageItemsQuery();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);

  return <h1 className="text-3xl font-bold underline">Products</h1>;
}
