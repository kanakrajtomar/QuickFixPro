import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCart } from "@/store/slices/cart/cart";
import { AppDispatch, RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "./QuantityButton";
import ProductDisplay from "./ProductDisplay";

export interface CartItem {
  productId: string;
  productTitle: string;
  variantId: string;
  discountPrice: number;
  productCount: number;
  productImageUrl: string;
  productName: string; // Add this property
  variantIndex: number; // Add this property if required
  actualPrice: number;
  variantName:string;
  price:number // Add this property if required
}


const CartTable = ({
  cartItems = [], // Default value to ensure cartItems is an array
  setTotalFun,
}: {
  cartItems: CartItem[];
  setTotalFun: (value: number) => void;
}) => {
  const token = useSelector((state: RootState) => state.auth.token) as string;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState(0);

  const handleDelete = async (productId: string, variantId: string) => {
    setLoading(true);
    const header = {
      "X-Auth-Token": token,
    };
    await axios.post(
      "https://app-api.sampurnakart.in/products/removeFromCart",
      {
        productId,
        variantId,
      },
      {
        headers: header,
      }
    );
    setLoading(false);
    dispatch(fetchCart(token));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, productCount: newQuantity };
      }
      return item;
    });

    const newTotal = updatedCartItems.reduce(
      (acc, item) => acc + item.discountPrice * item.productCount,
      0
    );
    setTotal(newTotal);
    setTotalFun(newTotal);
  };

  useEffect(() => {
    setTotalFun(
      cartItems.reduce(
        (acc, item) => acc + item.discountPrice * item.productCount,
        0
      )
    );
  }, [cartItems, setTotalFun]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <ProductDisplay item={item} />
              </TableCell>
              <TableCell>₹{item.discountPrice}</TableCell>
              <TableCell className="text-center">
                <QuantityButton
                  discountPrice={item.discountPrice}
                  quant={item.productCount}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(index, newQuantity)
                  }
                />
              </TableCell>
              <TableCell className="text-right">
                ₹{item.discountPrice * item.productCount}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  disabled={loading}
                  onClick={() => handleDelete(item.productId, item.variantId)}
                  size="icon"
                  variant="destructive"
                >
                  <MdDeleteOutline />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No items in the cart.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CartTable;
