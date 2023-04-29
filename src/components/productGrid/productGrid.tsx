import React from "react";

import ProductCard from "../productCard/productCard";

export default function ProductGrid({products}: any) {   
    return (
      <div className="flex flex-row flex-wrap">
       {products.map((edge: { node: { id: React.Key | null | undefined; }; }) => (       
        <ProductCard key={edge.node.id} product={edge} />
      ))}
      </div>
    );
  }