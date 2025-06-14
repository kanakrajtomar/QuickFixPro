"use client";

import { Product } from "@/app/products/[id]/page";
import { useState } from "react";

const ProductDetail = ({ product }: { product: Product }) => {
  const data = {
    Description: product.description,
    Specification: product.specification,
    Reviews: "No Reviews",
  };
  
  const [tab, setTab] = useState("Description");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex text-md text-gray-600 w-screen -mx-10 font-bold gap-10 justify-center">
        <div
          className={`cursor-pointer ${
            tab === "Description" && "text-black border-orange-500 border-b-2"
          }`}
          onClick={() => setTab("Description")}
        >
          Description
        </div>
        <div
          className={`cursor-pointer ${
            tab === "Specification" && "text-black border-orange-500 border-b-2"
          }`}
          onClick={() => setTab("Specification")}
        >
          Specification
        </div>
        <div
          className={`cursor-pointer ${
            tab === "Reviews" && "text-black border-orange-500 border-b-2"
          }`}
          onClick={() => setTab("Reviews")}
        >
          Reviews
        </div>
      </div>
      <hr />
      <div className="flex text-md text-left">
        {tab === "Specification" || tab === "Description" ? (
          <div
            dangerouslySetInnerHTML={{ __html: data[tab as keyof typeof data] }}
          />
        ) : (
          data[tab as keyof typeof data]
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
