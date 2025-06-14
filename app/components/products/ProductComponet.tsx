import Image from "next/image";

import HeartSVG from "../../../assets/icons/heart.svg";
import ViewSVG from "../../../assets/icons/view.svg";

interface IProductProps {
  name: string;
  price: String;
  discountPrice?: String;
  rating: number;
  image: string;
  disocuntPercentage?: number;
  reviewCount: number;
}

function ProductComponet({
  name,
  price,
  discountPrice,
  rating,
  image,
  disocuntPercentage,
  reviewCount,
}: IProductProps) {
  return (
    <div className="flex flex-col gap-2  lg:gap-4 items-start">
      <div className="w-full  h-[180px] max-w-[270px] bg-gray-400 relative lg:min-h-[250px] lg:w-[270px] lg:h-[250px]">
        <Image
          src={image}
          alt="hero"
          width={270}
          height={250}
          className="object-cover  w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <div className="bg-white rounded-full flex items-center justify-center">
            <Image height={40} width={40} src={HeartSVG} alt="heart" />
          </div>
          <div className="bg-white rounded-full flex items-center justify-center">
            <Image height={40} width={40} src={ViewSVG} alt="wishlist" />
          </div>
        </div>

        {disocuntPercentage && (
          <div className="absolute top-2 left-2 flex px-[12px] py-[4px]  bg-red-500 text-white gap-2">
            <span className="text-[12px] font-poppins">
              {disocuntPercentage}%
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col text-sm lg:text-[1rem]  gap-2 items-start font-poppins font-medium">
        <span>{name}</span>
        <div className="flex gap-2 items-center">
          <span className="text-[#DB4444]">₹{price}</span>
          {discountPrice && (
            <span className="line-through opacity-50">₹{discountPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">{`(${reviewCount})`}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductComponet;
