import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addProductToCart } from "@/store/slices/products/products";
import {
  fetchWishlist,
  WishListProduct,
} from "@/store/slices/wishlist/wishlist";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCartPlus, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "../StarRatings";
import { removeFromWishList } from "@/lib/apis";
import { FaHeart } from "react-icons/fa";

const WishlistCard = ({
  product,
  idx,
}: {
  product: WishListProduct;
  idx: number;
}) => {
  const { toast } = useToast();
  const token = useSelector((state: RootState) => state.auth.token) as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const AddToCart = () => {
    dispatch(
      addProductToCart(token, product.productId, product.variantIndex, 1)
    );
    toast({
      title: "Product Added to Cart",
      description: "Product added to cart successfully",
    });
  };
  const removeFromWishlist = async () => {
    await removeFromWishList(token, product.productId, product.variantIndex);
    toast({
      title: "Product Removed from Wishlist",
      description: "Product removed from wishlist successfully",
    });
    dispatch(fetchWishlist(token));
  };

  if (token == null) router.push("/signin");

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col relative">
          <div
            onClick={removeFromWishlist}
            className="absolute right-3 top-3 bg-white rounded-full p-1 hover:cursor-pointer shadow-md"
          >
            <FaHeart fill="red" />
          </div>
          <Image
            className="rounded-t-md h-[200px] w-[300px] object-contain"
            src={product.productImageUrl}
            alt={product.productName}
            width={275}
            height={275}
          />
          <Button
            onClick={AddToCart}
            className="w-full bg-[#27187E] text-white rounded-none rounded-b-md"
          >
            <FaCartPlus />
          </Button>
        </div>
        <div className="text-base font-semibold flex flex-col gap-1">
          <p>{product.productName}</p>
          <div className="flex gap-3">
            <p className="text-red-600">₹{product.discountPrice}.00</p>
            <p>
              <s>₹{product.actualPrice}.00</s>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <StarRatings />
            <p className="text-sm text-gray-500">(150)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
