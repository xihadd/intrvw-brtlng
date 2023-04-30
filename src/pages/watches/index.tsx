import React from "react";
import { GetStaticPropsContext } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getAtrributes } from "@/queries";
import ProductFilter from "@/components/productFilter/productFilter";
import { Attribute, updateChoices } from "@/store/filterSlice";
import { useAppDispatch } from "@/store/hooks";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
  });

  const result = await client.query({ query: getAtrributes });

  const attributes: [] = result.data.attributes?.edges;

  return {
    props: {
      attributes
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

type WatchesProps = {
  attributes: [];
};

const cleanAttributes = (attributes: any):Attribute[] => {
  const cleanedAttributes: Attribute[] = attributes
  .filter(((attribute: { node: { withChoices: boolean; inputType: string; slug: string; }; }) => (
    (attribute?.node.withChoices == true && attribute?.node.inputType === "DROPDOWN" 
    && ['country', 'release-type', 'format'].includes(attribute?.node.slug) )
  )))
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
        }
      })
    }
  })
  return cleanedAttributes;
}

export default function Products({ attributes }: WatchesProps) {

  

  const cleanedAttributes = cleanAttributes(attributes)

  return (
    <div className="fixed w-full h-16 shadow-sm bg-white flex flex-col justify-center">
      <ProductFilter attributes={cleanedAttributes} />
    </div>
  )
}
