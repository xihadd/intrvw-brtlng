import React from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { getAtrributes, getProductsByFilter } from "@/queries";
import ProductFilter from "@/components/productMenu/productMenu";
import { Attribute, Choice, Sort, updateLastCursor } from "@/store/filterSlice";
import { useAppDispatch, useAppSelector, } from "@/store/hooks";
import ProductGrid from "@/components/productGrid/productGrid";

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

type WatchesProps = {
  attributes: [];
};

type queryVariables = {
  limit: number;
  offset: string | undefined;
  filter: {
    attributes: {
      slug: string;
      values: string[];
    }[];
  };
  sort?: {
    direction: string;
    field: string;
  };
};

/**
 * Given a list of attributes, return a list of attributes that are mapped to a typ Attribute
 * and remove attributes that are not needed for the filter
 * @param attributes
 * @returns 
 */
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

/**
 * Compute the query variables for the getProductsByFilter query adding sort, limit and offset
 * @param lastCursor 
 * @param selectedFilters 
 * @param sortBy 
 * @returns 
 */
const computeQueryVariables = (
  lastCursor: string | undefined,
  selectedFilters: Choice[],
  sortBy: Sort
): queryVariables => {
  const variables: queryVariables = {
    limit: 16,
    offset: lastCursor,
    filter: {
      attributes: selectedFilters.map((filter) => ({
        slug: filter?.filter || "",
        values: [filter?.slug || ""],
      })),
    },
  };

  if (sortBy !== Sort.default) {
    variables.sort = {
      direction: sortBy,
      field: "NAME",
    };
  }
  return variables;
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
