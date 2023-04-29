import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useQuery, gql } from "@apollo/client";

import { Product, useProductGetHomePageItemsQuery } from "@/saleor";

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
