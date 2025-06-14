import { CartItem } from "@/app/cart/page";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DisplayCartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
  console.log(cartItems);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex items-center flex-col lg:w-[600px]">
        <Table>
          <TableBody>
            {cartItems.map((item, idx) => (
              <TableRow key={idx} className="border-none">
                <TableCell className="font-medium">
                  <Image
                    src={item.productImageUrl}
                    className="w-[50px] h-[50px] object-contain rounded-md"
                    height={75}
                    width={75}
                    alt={item.productName}
                  />
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="text-right">
                  ₹{item.discountPrice * item.productCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full flex flex-col gap-2">
          <div className="flex text-md w-full justify-between">
            <p>Subtotal:</p>
            <p>
              {cartItems.reduce((acc, item) => {
                return acc + item.discountPrice * item.productCount;
              }, 0)}
            </p>
          </div>
          <hr />
          <div className="flex text-md w-full justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="flex text-md w-full justify-between">
            <p>Total:</p>
            <p>
              {cartItems.reduce((acc, item) => {
                return acc + item.discountPrice * item.productCount;
              }, 0)}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DisplayCartItems;
