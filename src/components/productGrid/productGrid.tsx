import React from "react";

import ProductCard from "../productCard/productCard";

export default function ProductGrid({ products }: any) {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <div className="flex flex-row flex-wrap mx-auto">
        {products.map((edge: { node: { id: React.Key | null | undefined } }) => (
          <ProductCard key={edge.node.id} product={edge} />
        ))}
      </div>
    </div>
  );
}
