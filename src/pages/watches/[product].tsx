import Head from "next/head";
import Image from "next/image";

import { ApolloClient, InMemoryCache } from "@apollo/client";

import { GetStaticPropsContext } from "next";
import { getProductDetailsBySlug } from "@/queries";
import Link from "next/link";
import { type } from "os";

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
  console.log;
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
  return (
    <div className="product flex flex-col max-w-6xl mx-auto">
      <div className="breadcrumb text-gray-500 ml-2 mt-2">
        <Link href='/'> Home &nbsp;</Link>
        <span className="text-yellow-400">&#62;</span>
        <Link href='/watches'>&nbsp; Watches &nbsp;</Link>
        <span className="text-yellow-400">&#62;</span>
        <span className="text-gray-800">&nbsp;{name}</span>
      </div>
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
          <div className="text-3xl sm:text-4xl text-center sm:text-left mt-4 mb-2 font-medium">
            {name}
          </div>
          <div className="text-center text-xl sm:text-left mt-4 mb-2">
            {Math.abs(gross.amount)}&nbsp;{gross.currency}
          </div>
          <p className="text-center sm:text-left text-sm my-4">
            Delivery Available
          </p>
          <Link
            href={`#`}
            className="w-80 h-12 bg-yellow-400 flex justify-center mx-auto sm:ml-0 my-6"
          >
            <span className="text-gray-900 uppercase hover:text-white transition-all duration-150 ease-in text-center font-bold text-lg align-center m-auto">
              {isAvailableForPurchase ? "Add to Bag" : "Out of Stock"}
            </span>
          </Link>
          <p className="text-center hover:text-yellow-400 uppercase transition-all duration-150 ease-in sm:text-left cursor-pointer text-sm my-4">
            Book an Appointment
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <h4 className="uppercase text-xl font-medium mb-2">Gallery</h4>
        <div className="flex flex-row flex-wrap">
          {media.map((img) =>
            (img.type === "IMAGE" ? (
              <Image
                key={img.url}
                src={img.url}
                alt="watch"
                width={500}
                height={500}
                className="w-1/2 sm:w-1/4 mx-auto p-1"
              />
            ) : undefined
          ))}
        </div>
      </div>
    </div>
  );
}
