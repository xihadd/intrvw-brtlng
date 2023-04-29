import Head from "next/head";
import Image from "next/image";

import { ApolloClient, InMemoryCache } from "@apollo/client";

import { GetStaticPropsContext } from "next";
import { getProductDetailsBySlug } from "@/queries";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
  });

  const slug: string | string[] | undefined = context.params?.product;

  const result = await client.query({
    query: getProductDetailsBySlug,
    variables: { slug },
  });

  const product = result.data.product || false;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: product,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths = async () => {
  // todo: get all products from saleor and re visit this
  return { paths: [], fallback: "blocking" };
};

type ProductPageProps = {
  data: [];
};

export default function ProductPage({ data }: ProductPageProps) {
  console.log(data);
  return <h1 className="text-3xl font-bold underline">Product Page</h1>;
}
