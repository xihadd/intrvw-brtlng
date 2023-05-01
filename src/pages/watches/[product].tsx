import React, {useState} from "react";
import Head from "next/head";
import Image from "next/image";

import { ApolloClient, InMemoryCache } from "@apollo/client";

import { GetStaticPropsContext } from "next";
import { getProductDetailsBySlug, getProductsByLastPublished } from "@/queries";
import Link from "next/link";
import ProductGallery from "@/components/productDetails/productGallery";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { addItemToCart, CartItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
    ssrMode: true,
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
  const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const result = await client.query({
    query: getProductsByLastPublished,
    variables: { sort: {
    	direction: "ASC",
    	field: "PUBLISHED"
  } },
  });

  const slugs = result.data.products.edges || [];

  const paths = slugs.map((item:any) => ({
    params: { product: item.node.slug },
  }))

  return { paths, fallback: "blocking" };
};

type ProductPageProps = {
  data: {
    name: string;
    id: string;
    thumbnail: {
      url: string;
    };
    media: [
      {
        url: string;
        type: string;
      }
    ];
    pricing: {
      priceRange: {
        start: {
          gross: {
            amount: number;
            currency: string;
          };
        };
      };
    };
    isAvailableForPurchase: boolean;
  };
};

export default function ProductPage({ data }: ProductPageProps) {
  const dispatch = useAppDispatch();
  const [itemInCart, setItemInCart] = useState(false);

  const {
    name,
    id,
    thumbnail: { url },
    isAvailableForPurchase,
    media,
    pricing: {
      priceRange: {
        start: { gross },
      },
    },
  } = data;

  const addItemToCartClick = () => {
    if (itemInCart) return;
    const cartItem: CartItem = {
      id,
      name,
      price: gross.amount,
      quantity: 1,
    };
    setItemInCart(true);
    dispatch(addItemToCart(cartItem));
  };

  return (
    <div className="product flex flex-col max-w-6xl mx-auto">
      <Head>
        <title>Breitling | {name}</title>
      </Head>
     <Breadcrumbs />
      <div className="mt-3 flex flex-col sm:flex-row">
        <div className="sm:w-1/2">
          <Image
            src={url}
            alt="watch"
            width={500}
            height={500}
            className="mx-auto"
          />
        </div>
        <div className="mt-3 sm:w-1/2 sm:ml-4">
          <div className="text-xs text-center sm:text-left mt-4 mb-2">{id}</div>
          <div className="text-4xl sm:text-5xl text-center sm:text-left mt-4 mb-2 font-medium">
            {name}
          </div>
          <div className="text-center text-xl sm:text-left mt-4 mb-2">
            {Math.abs(gross.amount)}&nbsp;{gross.currency} <span className="text-sm text-gray-500">VAT Incl.</span>
          </div>
          <p className="text-center sm:text-left text-sm my-4">
            Delivery Available
          </p>
          <div
            className="w-80 h-12 bg-yellow-400 flex justify-center cursor-pointer mx-auto sm:ml-0 my-6"
            onClick={() => addItemToCartClick()}
          >
            <span className="text-gray-900 uppercase hover:text-white transition-all duration-150 ease-in text-center font-bold text-lg align-center m-auto">
              {isAvailableForPurchase ? (itemInCart ? "Added" : "Add to Bag") : "Out of Stock"}
            </span>
          </div>
          <p className="text-center hover:text-yellow-400 uppercase transition-all duration-150 ease-in sm:text-left cursor-pointer text-sm my-4">
            Book an Appointment
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <ProductGallery media={media} />
      </div>
    </div>
  );
}
