import React from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { getAtrributes, getProductsByFilter } from "@/queries";
import ProductFilter from "@/components/productMenu/productMenu";
import { updateLastCursor } from "@/store/filterSlice";
import { useAppDispatch, useAppSelector, } from "@/store/hooks";
import ProductGrid from "@/components/productGrid/productGrid";

import { cleanAttributes, computeQueryVariables, WatchesProps } from "../../containers/watches/index";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  // ssr query for attributes to be preloaded in page at server side
  const result = await client.query({ query: getAtrributes });

  const attributes: [] = result.data.attributes?.edges;

  return {
    props: {
      attributes,
    },
    revalidate: 60 * 60
  };
};

export default function Products({ attributes }: WatchesProps) {
  const { selectedFilters, sortBy, lastCursor } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const cleanedAttributes = cleanAttributes(attributes);

  const variables = computeQueryVariables(lastCursor, selectedFilters, sortBy);

  const { called, loading, data } = useQuery(getProductsByFilter, {
    variables,
  });

  const loadMore = () => {
    const lastcursor =
      data?.products?.edges[data?.products?.edges.length - 1]?.cursor || "";
    dispatch(updateLastCursor(lastcursor));
  };

  return (
    <div className="flex flex-col justify-center relative">
      <Head>
        <title>Breitling | All Watches</title>
      </Head>
      <ProductFilter
        attributes={cleanedAttributes}
        count={data?.products.totalCount}
      />
      {called && loading && <div className="text-center">Loading...</div>}
      {data?.products.totalCount === 0 && (
        <div className="w-full text-center">No results found</div>
      )}
      {data?.products && <ProductGrid products={data?.products?.edges} />}
      <div className="flex flex-row justify-center mb-6 ">
        {!loading && (
          <button
            className="p-3 mb-2 boder-1 border-gray-400 border-1 bg-white inline w-40 hover:bg-yellow-400 hover:text-white"
            onClick={() => loadMore()}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
