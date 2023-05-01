import React from "react";
import ProductFilter from "@/components/productMenu/filter";
import ProductSort from "@/components/productMenu/sort";

export default function ProductMenu({ attributes = [], count = "..." }: any) {
  return (
    <div className="w-full h-16 shadow-sm bg-white flex flex-col justify-center mb-14">
      <div className="flex flex-row justify-between flex-nowrap">
          <ProductFilter attributes={attributes} />
        <div className="mr-2 max-md:hidden text-sm flex flex-row ">
          <div className="flex flex-row border-r-1 mr-2 pr-2">
            <ProductSort />
          </div>
          <span className="pt-0">{count} products</span>
        </div>
      </div>
    </div>
  );
}
