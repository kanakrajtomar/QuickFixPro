"use client";

import { fetchWishlist } from "@/store/slices/wishlist/wishlist";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "../components/wishlist/WishlistCard";

const Wishlist = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const productArr = useSelector((state: RootState) => state.wishlist.products ?? []);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) dispatch(fetchWishlist(token)).then(() => setLoading(false));
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    router.push("/signin");
    return;
  }

  if (productArr.length === 0) {
    return <div>No products in wishlist.</div>;
  }

  return (
    <div className="w-[90vw] flex flex-col gap-5">
      <div>
        <p className="p-3 text-3xl text-start font-bold">
          WishList({productArr.length})
        </p>
      </div>
      <div className="flex gap-8 flex-wrap items-center w-full md:items-start">
        {productArr.map((product, index) => (
          <WishlistCard key={index} product={product} idx={index} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
