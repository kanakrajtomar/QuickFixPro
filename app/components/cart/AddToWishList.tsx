import { Button } from "@/components/ui/button";
import { addToWishList, removeFromWishList } from "@/lib/apis";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const AddToWishList = ({ productId, _v }: { productId: string; _v: number }) => {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const handleAddToWishList = () => {
    try {
      if (token == null) {
        router.push("/signin");
        return;
      }
      if (added) {
        removeFromWishList(token, productId, 0);
        setAdded(false);
      } else {
        addToWishList(productId, _v, token);
        setAdded(true);
      }
    } catch (e) {
      console.log("Error adding to wishlist: " + e);
    }
  };

  return (
    <div>
      <Button
        onClick={handleAddToWishList}
        type="button"
        className="bg-white p-2 rounded-sm"
      >
        <span
          className={`text-2xl transition-all duration-300 ease-in-out ${
            added ? "fill-heart text-red-600" : "text-gray-400"
          }`}
        >
          {added ? <FaHeart /> : <FaRegHeart />}
        </span>
      </Button>
    </div>
  );
};

export default AddToWishList;
