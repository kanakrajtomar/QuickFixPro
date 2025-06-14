"use client";
import DisplayImageVideo from "@/app/components/cart/DisplayImageVideo";
import ProductDescription from "@/app/components/cart/ProductDescription";
import ProductDetail from "@/app/components/cart/ProductDetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export interface Product {
  _id: string;
  name: string;
  parentCatId: string;
  rootCatId: string;
  description: string;
  imageArr: string[];
  videoArr: string[];
  inventory: {
    _id: string;
    variantExists: boolean;
    variantList: {
      _id: any;
      price: number;
      finalPrice: number;
      gstPercent: number;
      lowStockAlert: number;
      inventoryStock: number;
      minPurchaseQty: number;
      attributes: {
        name: string;
        values: {
          name?: any;
          hex?: any;
        }[];
      }[];
    }[];
  };
  specification: string;
  isVisible: boolean;
  seoName: string;
  model: string;
  productBrand: string;
  hsn: string;
  srNo: string;
  countryOfOrigin: string;
  parentCatName: string;
  rootCatName: string;
  subCatId: string;
  subCatName: string;
  subCatSeoName: string;
  highlights: string;
  warrantyPeriod: string;
  warrantyType: string;
  manufacturer: string;
  packer: string;
  importer: string;
  shippingMode: {
    mode: string;
    charge: number;
  };
  dimensions: {
    height: string;
    width: string;
    depth: string;
    weight: string;
  };
  paymentType: "COD";
  returnPolicy: {
    returnAvailable: boolean;
    daysAfterDelivered: number;
  };
  rewardPercent: number;
  __v: number;
}


const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://ad-api.sampurnakart.in/api/products/getProduct?id=${params.id}`
        );
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
        setLoading(false);

        // Redirect to home page if the product is not visible
        if (!fetchedProduct.isVisible) {
          router.push('/'); // Redirect to the home page
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]); // Include router in dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>; // Optional fallback for when the product data itself is not found
  }

  return (
    <div className="lg:mt-28 mt-14 mx-10">
      <div className="flex gap-3 justify-around w-[80vw] flex-col md:flex-row">
        <div>
          <DisplayImageVideo
            imageArr={product.imageArr}
            videoArr={product.videoArr}
          />
        </div>
        <div>
          <h1 className="text-3xl lg:mx-0 mx-5 font-bold mt-10">
            {product.name}
          </h1>
          <ProductDescription product={product} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
