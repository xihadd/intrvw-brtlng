import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { getAtrributes, getProductsByFilter } from "@/queries";
import ProductFilter from "@/components/productFilter/productFilter";
import { Attribute, Sort } from "@/store/filterSlice";
import { useAppSelector } from "@/store/hooks";
import ProductGrid from "@/components/productGrid/productGrid";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const result = await client.query({ query: getAtrributes });

  const attributes: [] = result.data.attributes?.edges;

  return {
    props: {
      attributes,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

type WatchesProps = {
  attributes: [];
};

type queryVariables = {
  limit: number,
  offset: string,
  filter: {
    attributes: {
      slug: string;
      values: string[];
    }[],
  },
  sort?: {
    direction: string,
    field: string
  }
}

const cleanAttributes = (attributes: any): Attribute[] => {
  const cleanedAttributes: Attribute[] = attributes
    .filter(
      (attribute: {
        node: { withChoices: boolean; inputType: string; slug: string };
      }) =>
        attribute?.node.withChoices == true &&
        (attribute?.node.inputType === "DROPDOWN" ||
          attribute?.node.inputType === "MULTISELECT") &&
        [
          "country",
          "release-type",
          "format",
          "artist",
          "genre",
          "medium",
        ].includes(attribute?.node.slug)
    )
    .map((attribute: any) => {
      return {
        id: attribute.node.id,
        name: attribute.node.name,
        slug: attribute.node.slug,
        inputType: attribute.node.inputType,
        withChoices: attribute.node.withChoices,
        choices: attribute.node.choices.edges.map((choice: any) => {
          return {
            id: choice.node.id,
            name: choice.node.name,
            slug: choice.node.slug,
            filter: attribute.node.slug,
          };
        }),
      };
    });
  return cleanedAttributes;
};

export default function Products({ attributes }: WatchesProps) {
  const [lastCursor, setLastCursor] = useState<string>("");

  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );

  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const cleanedAttributes = cleanAttributes(attributes);
  
  const variables:queryVariables = {
    limit: 16,
    offset: lastCursor,
    filter: {
      attributes: selectedFilters.map((filter) => ({
        slug: filter?.filter || "",
        values: [filter?.slug || ""],
      }))
    },
  };

  if (sortBy !== Sort.default) {
    variables.sort = {
      direction: sortBy,
    	field: "NAME"
    };
  }

  const { called, loading, data } = useQuery(getProductsByFilter, {
    variables,
  });
  const loadMore = () => {
    const lastcursor =
      data?.products?.edges[data?.products?.edges.length - 1]?.cursor || "";
    setLastCursor(lastcursor);
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
            className="p-3 boder-1 border-gray-400 bg-white inline w-40 hover:bg-yellow-400 hover:text-white"
            onClick={() => loadMore()}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
