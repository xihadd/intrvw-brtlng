import React from "react";
import { GetStaticPropsContext } from "next";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { getAtrributes, getProductsBySearch } from "@/queries";
import ProductFilter from "@/components/productFilter/productFilter";
import { Attribute, updateChoices } from "@/store/filterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ProductGrid from "@/components/productGrid/productGrid";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
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
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );
  const cleanedAttributes = cleanAttributes(attributes);

  const { called, loading, data } = useQuery(getProductsBySearch, {
    variables: {
      filter: {
        attributes: selectedFilters.map((filter) => ({
          slug: filter?.filter || "",
          values: [filter?.slug || ""],
        })),
      },
    },
  });

  console.log(called, data, selectedFilters);

  return (
    <div className="flex flex-col justify-center relative">
      <ProductFilter
        attributes={cleanedAttributes}
        count={data?.products.totalCount}
      />
      {called && loading && <div className="text-center">Loading...</div>}
      {data?.products.totalCount === 0 && (
        <div className="w-full text-center">No results found</div>
      )}
      {data?.products && <ProductGrid products={data?.products?.edges} />}
    </div>
  );
}
