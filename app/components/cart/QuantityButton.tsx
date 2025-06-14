import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import React, { useState } from "react";

const QuantityButton = ({
  quant,
  discountPrice,
  onQuantityChange,
}: {
  quant: number;
  discountPrice: number;
  onQuantityChange: (newQuantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(quant);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <>
      <TableCell>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              if (quantity > 1) {
                // setQuantity(quantity - 1);
                handleQuantityChange(quantity - 1);
              }
            }}
            variant={"outline"}
            type="button"
          >
            -
          </Button>
          <Input
            min={1}
            className="w-[80px] text-center border-black w-[50px]"
            type="number"
            value={quantity}
            defaultValue={quant}
          />
          <Button
            onClick={() => {
              handleQuantityChange(quantity + 1);
            }}
            variant={"outline"}
            type="button"
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right">₹{discountPrice * quantity}</TableCell>
    </>
  );
};

export default QuantityButton;
