import React from "react";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const { id, name, thumbnail } = product.node;

  return (
    <div key={id} className="w-60 h-100 mx-4 mb-6 flex flex-col justify-start">
      <a href="#" className="relative block w-60 h-60">
        <Image fill src={thumbnail.url} alt={thumbnail.alt} />
      </a>

      <a
        href="#"
        className="flex  w-full mt-4"
      >
        <h3 className="font-medium text-gray-900 text-ellipsis overflow-hidden text-center">{name}</h3>
      </a>

      <a
        href="#"
        className="w-44 h-10 bg-yellow-400 flex justify-center mx-auto my-3"
      >
        <span className="text-gray-900 uppercase text-center font-bold text-lg align-center m-auto">
          Add to Bag
        </span>
      </a>
    </div>
  );
}
