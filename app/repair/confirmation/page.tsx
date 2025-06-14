"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
    const navigate = useRouter();
  return (
    <div className="flex items-center justify-center mt-28 flex-col gap-2">
      <Image
        src="https://png.pngtree.com/png-clipart/20230824/original/pngtree-order-placed-abstract-concept-vector-illustration-picture-image_8425868.png"
        alt=""
        height={400}
        width={400}
      />
      <div className="flex items-center justify-center gap-3 flex-col font-bold">
        <h1 className="text-3xl text-orange-500">Order Booked!</h1>
        <div className="text-center">
          <p className="text-md">Your order has been placed successfully.</p>
        </div>
        <button
          className="flex items-center justify-center p-4 text-xl bg-[#27187E] rounded-md text-white shadow-md"
          onClick={() => {
            navigate.push("/");
          }}
        >
          Return to HomePage
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
