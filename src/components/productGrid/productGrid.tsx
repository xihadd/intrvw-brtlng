import React from "react";

import ProductCard from "../productCard/productCard";

export default function ProductGrid({products}: any) {   
    return (
      <div className="max-sm:overflow-y-scroll max-w-6xl max-sm:w-screen mx-auto">
        <div className="flex flex-row sm:flex-wrap justify-evenly max-sm:flex-nowrap">
            {products.map((edge: { node: { id: React.Key | null | undefined; }; }) => (       
                <ProductCard key={edge.node.id} product={edge} />
            ))}
        </div>
      </div>
    );
  }