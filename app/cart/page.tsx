"use client";

import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { fetchCart } from "@/store/slices/cart/cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartTable from "../components/cart/CartTable";

export interface CartItem {
  price: number;
  productId: string;
  productName: string;
  discountPrice: number;
  variantIndex: number;
  productCount: number;
  productImageUrl: string;
  actualPrice: number;
  variantName: string;
  productTitle:string;
  variantId:string
}

const ShoppingCart = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token) as string;
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const cartItems = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchCart(token)).then(() => {
      setLoading(false);
    });
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (token === null) {
    router.push("/signin");
    return;
  }

  const getTotal = (cartItems: CartItem[]) => {
    if (cartItems == null || cartItems.length === 0) {
      return 0;
    }
    let total = 0;
    cartItems.forEach((item) => {
      total += item.discountPrice * item.productCount;
    });
    return total.toString();
  };

  return (
<div className="flex flex-col gap-6 m-10 h-full min-w-[90vw] md:w-3 sm:w-[100px] md:m-0 ">
      <h1 className="text-5xl text-gray-600 mt-36">
        Home /<span className="text-black">Cart</span>
      </h1>

      <CartTable setTotalFun={setTotal} cartItems={cartItems} />

      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Return to Shop</Button>
        </Link>
        <Button variant="outline">Update Cart</Button>
      </div>
      <div className="flex gap-y-10 flex-col justify-between md:flex-row">
        <div className="flex justify-between gap-5">
          <Input
            className=" border-black"
            type="text"
            placeholder="Coupon Code"
          />
          <Button variant="default" className="bg-[#27187E]">
            Apply Coupon
          </Button>
        </div>
        <div className="flex gap-2 flex-col border-2 py-5 px-8 border-black w-[300px] md:w-[400px]">
          <h2 className="font-bold">Cart Total</h2>
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₹{total}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Total:</p>
            <p>₹{total}</p>
          </div>
          {cartItems && cartItems.length > 0 && (
            <Link href="cart/billing-details">
              <Button variant="default" className="bg-[#27187E]">
                Process to Checkout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
