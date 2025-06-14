"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { orderProduct } from "@/lib/apis";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DisplayCartItems from "./DisplayCartItems";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export interface Address {
  buildingNo: string;
  streetName: string;
  city: string;
  area: string;
  state: string;
  pinCode: string;
  phone: string;
  name: string;
}

const billingFormSchema = z.object({
  buildingNo: z.string(),
  streetName: z.string(),
  city: z.string().max(50),
  area: z.string(),
  state: z.string(),
  pinCode: z.string(),
  phone: z.string().min(10).max(10),
  name: z.string().min(3),
  paymentMethod: z.enum(["COD", "Online"]),
  couponCode: z.string().optional(),
});

const BillingForm = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed" | null>(null);

  const form = useForm<z.infer<typeof billingFormSchema>>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: {
      name: "",
      buildingNo: "",
      streetName: "",
      city: "",
      area: "",
      state: "",
      pinCode: "",
      phone: "",
      couponCode: "",
    },
  });

  const checkPromoCode = async () => {
    const code = form.getValues("couponCode");
    if (!code) return;

    try {
      const response = await axios.get(`https://ad-api.sampurnakart.in/api/promo/check/${code}?section=all`);
      if (response.status === 200) {
        const { value, discountAmount } = response.data;
        setDiscountType(value.type);
        setDiscount(Number(discountAmount));
      }
    } catch (error) {
      setDiscount(null);
      setDiscountType(null);
    }
  };

  const calculateDiscountedPrice = (totalPrice: number) => {
    if (discountType === "percentage") {
      return totalPrice - (totalPrice * discount!) / 100;
    } else if (discountType === "fixed") {
      return totalPrice - discount!;
    }
    return totalPrice;
  };

  async function onSubmit(values: z.infer<typeof billingFormSchema>) {
    setLoading(true);

    const address: Address = {
      buildingNo: values.buildingNo,
      streetName: values.streetName,
      city: values.city,
      area: values.area,
      state: values.state,
      pinCode: values.pinCode,
      phone: values.phone,
      name: values.name,
    };

    const items = cartItems.map((item) => ({
      productId: item.productId,
      variantIndex: item.variantIndex,
      quantity: item.productCount,
    }));

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.productCount, 0);
    const discountedPrice = calculateDiscountedPrice(totalPrice);

    const order = await orderProduct(
      token!,
      address,
      items,
      values.paymentMethod,
      discountedPrice
    );

    setLoading(false);
    router.push("/");
  }

  if (!token) {
    router.push("/signin");
    return null;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.productCount, 0);
  const discountedPrice = calculateDiscountedPrice(totalPrice);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5 justify-around">
          <div className="w-[300px] space-y-5 sm:w-[500px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment, floor, etc. (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex flex-col">
              <DisplayCartItems cartItems={cartItems} />
              <div className="w-[400px] flex flex-col gap-5 mt-5 lg:w-[600px]">
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Online" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Online
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="COD" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Cash On Delivery
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-3 gap-5 w-[600px]">
                    <Input
                      placeholder="Coupon Code"
                      className="col-span-2"
                      {...form.register("couponCode")}
                    />
                    <Button
                      disabled={loading}
                      type="button"
                      className="col-span-1 bg-orange-600"
                      onClick={checkPromoCode}
                    >
                      Apply Coupon
                    </Button>
                  </div>
                  {discount && (
                    <div className="text-green-600 mx-10">
                      {discountType === "percentage" ? (
                        <>Discount Applied: {discount}%</>
                      ) : (
                        <>Discount Applied: ₹{discount}</>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
              <div className="w-full flex justify-center m-4">
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-orange-600"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BillingForm;
