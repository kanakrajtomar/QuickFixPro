import BillingForm from "@/app/components/cart/BillingForm";
import React from "react";

const BillingDetails = () => {
  return (
    <div className="flex flex-col gap-6 m-10 h-full min-w-[90vw] md:w-3 sm:w-[100px] md:m-0 ">
      <h1 className="text-4xl  font-bold mt-28">Billing Details</h1>
      <div>
        <BillingForm />
      </div>
    </div>
  );
};

export default BillingDetails;
