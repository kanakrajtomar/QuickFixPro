import DeliveryIcon from "@/assets/icons/delivery-truck-svgrepo-com.svg";
import ReturnIcon from "@/assets/icons/return-svgrepo-com.svg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "../StarRatings";
import { Product } from "@/app/products/[id]/page";
import { addProductToCart } from "@/store/slices/products/products";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AddToWishList from "./AddToWishList";

const formSchema = z.object({
  productId: z.any(),
  variantId: z.any(),  // Ensure variantId is typed as a string
  productCount: z.number().int().positive(),
});


const ProductDescription = ({ product }: { product: Product }) => {
  const router = useRouter();

  const [variantIdx, setVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token) as string;
  const { toast } = useToast();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variantId: product.inventory.variantList[0]?._id || '', // Default to first variant's ID
      productCount: 1,
      productId: product._id,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      addProductToCart(token, values.productId, values.variantId, values.productCount)
    );
    router.push("/cart");
  }
  
  function onSubmitCart() {
    dispatch(addProductToCart(token, product._id, product.inventory.variantList[variantIdx]._id, quantity));
    toast({
      title: "Product Added to Cart",
      description: "Product added to cart successfully",
    });
  }
  

  if (!product || !product.inventory || !product.inventory.variantList) {
    return <p>Loading...</p>;
  }

  const variant = product.inventory.variantList[variantIdx];

  return (
    <div className="flex pt-10 gap-7 flex-col w-full text-center md:text-start md:w-[400px]">
      <div className="flex gap-3 items-center justify-center md:justify-start">
        <StarRatings />
        <p className="text-gray-600 text-sm">(150 reviews)</p>
        <p className="text-gray-600">|</p>
        {variant.inventoryStock > 0 ? (
          <p className="text-green-600">In Stock</p>
        ) : (
          <p className="text-red-600">Out of Stock</p>
        )}
      </div>
      <p className="text-2xl font-bold">
        {variant?.finalPrice ? (
          <>
            <span className="line-through text-gray-500">₹{variant.price}</span>{" "}
            ₹{variant.finalPrice}{" "}
            <span className="text-red-500">
              ({Math.round(((variant.price - variant.finalPrice) / variant.price) * 100)}% OFF)
            </span>
          </>
        ) : (
          "N/A"
        )}
      </p>

      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: product.specification }}
      />
      <hr />
      <div className="flex gap-4 items-center flex-wrap">
        <p className="font-semibold">Colours:</p>
        {product.inventory.variantList.map((variant, index) => {
          const colorValue = Array.isArray(variant.attributes[0]?.values)
            ? variant.attributes[0].values[0]
            : { name: 'N/A', hex: '#ccc' }; // Default values if not an array or empty

          return (
            <Button
              key={index}
              onClick={() => {
                setVariantIdx(index);
                form.setValue("variantId", variant._id);
              }}
              className={`rounded-full border-2`}
              style={{
                backgroundColor: colorValue?.hex || '#ccc', // Default color if hex is not available
                borderColor: colorValue?.hex || '#ccc',
              }}
            >
              {colorValue?.name || 'N/A'}
            </Button>
          );
        })}
      </div>

      {/* Attribute Box */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-100">
        <h3 className="font-semibold mb-2">Product Features</h3>
        <ul className="list-disc pl-5">
          {variant.attributes.map((attr, index) => (
            <li key={index}>
              {attr.name}: {attr.values[0]?.name || 'N/A'}
            </li>
          ))}
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4 flex-col sm:flex-row w-full">
            <div className="flex gap-4 items-center">
              <Button
                type="button"
                className="bg-white text-black hover:text-white"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    form.setValue("productCount", quantity - 1);
                  }
                }}
              >
                -
              </Button>
              <FormField
                control={form.control}
                name="productCount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="text-center" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variantId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="bg-[#27187E]"
                onClick={() => {
                  if (quantity < variant.inventoryStock) {
                    setQuantity(quantity + 1);
                    form.setValue("productCount", quantity + 1);
                  }
                }}
              >
                +
              </Button>
            </div>
            <Button
              type="button"
              onClick={onSubmitCart}
              variant="outline"
              className="bg-[#27187E] text-white"
            >
              <FaShoppingCart />
            </Button>
            <Button type="submit" className="bg-[#27187E] min-w-[100px]">
              Buy Now
            </Button>
            <AddToWishList productId={product._id} _v={variantIdx} />
          </div>
        </form>
      </Form>

      <div>
        <div className="flex gap-4 rounded-lg border-2 py-5 px-8 border-black border-b-0 w-auto sm:min-w-[450px]">
          <div className="flex items-center">
            <Image src={DeliveryIcon} height={50} width={50} alt="Delivery" />
          </div>
          <div>
            <h2 className="font-bold">Free Delivery</h2>
            <p className="underline text-sm">
              <Link href="#">
                Enter your Postal code for Delivery availability.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg border-2 py-5 px-8 border-black  w-auto sm:min-w-[450px]">
          <div className="flex items-center">
            <Image src={ReturnIcon} height={50} width={50} alt="Return" />
          </div>
          <div>
            <h2 className="font-bold">Return Delivery</h2>
            <p className="text-sm">
              Free 30 Days Delivery Returns.
              <Link className="underline" href="#">
                Details.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
