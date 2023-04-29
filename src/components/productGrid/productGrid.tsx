import React from "react";

import ProductCard from "../productCard/productCard";

export default function ProductGrid({products}: any) {
    products.map((edge) => (console.log(edge)))
    
    return (
      <div className="flex flex-row flex-wrap">
       {products.map((edge) => (       
        <ProductCard key={edge.node.id} product={edge} />
      ))}
      </div>
    );
  }