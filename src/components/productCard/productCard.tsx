import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addItemToCart, CartItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ProductCard({ product }: { product: any }) {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    thumbnail,
    slug,
    pricing: {
      priceRange: {
        start: { gross },
      },
    },
  } = product.node;

  const [itemInCart, setItemInCart] = useState(false);

  // fallbacks
  const {
    url = "https://www.breitling.com/assets/images/corporate/asset-version-5d9cae3a35/breitling.svg",
    alt = name,
  } = thumbnail || {};

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
    <div
      key={id}
      className="w-44 sm:w-60 mx-2 mb-20 flex flex-col justify-start"
    >
      <Link
        href={`/watches/${slug}`}
        className="relative block w-fill h-44 sm:w-60 sm:h-60"
      >
        <Image fill src={url} alt={alt} />
      </Link>

      <Link href={`/watches/${slug}`} className="flex mb- w-full mt-4 h-6">
        <h3 className="font-medium text-gray-900 text-ellipsis overflow-hidden text-center w-full h-6">
          {name}
        </h3>
      </Link>

      <div className="font-light text-sm text-gray-800 text-center mb-2">
        {gross.amount}&nbsp;{gross.currency}
      </div>

      <div
        className="w-44 h-12 bg-yellow-400 flex justify-center mx-auto my-3 cursor-pointer"
        onClick={() => addItemToCartClick()}
      >
        <span className="text-gray-900 hover:text-white uppercase text-center font-bold text-lg transition-all duration-150 ease-in align-center m-auto">
          {itemInCart ? "Added" : "Add to Bag"}
        </span>
      </div>
    </div>
  );
}
