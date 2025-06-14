"use client";
import {
  ArrowRightSquare,
  HomeIcon,
  LocateFixedIcon,
  LocateIcon,
  MapPin,
  MapPinned,
  PinIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";

const ShopNearMe = () => {
  return (
    <div className="flex text-white mt-28 flex-col px-3 gap-10 pt-20 pb-11 items-center justify-center">
      {/* div 1 */}
      <div className="flex cursor-pointer w-full md:w-[700px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
        <Link
          href="/repair/workOrderRequest"
          className="flex gap-4 md:text-2xl items-center flex-1"
        >
          <MapPin size={40} />
          <h1 className="">
            {`RK Mobile Care 548, Model Town, Jalandhar opposite Burger King`}
          </h1>
        </Link>
        <Link
          href={
            "https://www.google.com/maps/dir//In+Basement,+548,+Market,+near+kapsons,+opp.+Burger+King,+Model+Town,+Jalandhar,+Punjab+144003/@31.3071415,75.4963595,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x391a5bab6c8a9e29:0xcc2879276ac1c94c!2m2!1d75.5787608!2d31.3071678?entry=ttu"
          }
          target="_blank"
        >
          <MapPinned />
        </Link>
      </div>
      {/* Div 2 */}
      <div className="flex cursor-pointer w-full md:w-[700px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
        <Link
          href="/repair/workOrderRequest"
          className="flex gap-4 md:text-2xl items-center flex-1"
        >
          <MapPin size={40} />
          <h1 className="">
            {`SAMPURNAKART 548, Model Town, Jalandhar, opposite Burger King`}
          </h1>
        </Link>
        <Link
          href={
            "https://www.google.com/maps/dir//In+Basement,+548,+Market,+near+kapsons,+opp.+Burger+King,+Model+Town,+Jalandhar,+Punjab+144003/@31.3071415,75.4963595,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x391a5bab6c8a9e29:0xcc2879276ac1c94c!2m2!1d75.5787608!2d31.3071678?entry=ttu"
          }
          target="_blank"
        >
          <MapPinned />
        </Link>
      </div>
      {/* div 3 */}
      <div className="flex cursor-pointer w-full md:w-[700px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
        <Link
          href="/repair/workOrderRequest"
          className="flex gap-4 md:text-2xl items-center flex-1"
        >
          <MapPin size={40} />
          <h1 className="">
            {`RK MOBILES & ELECTRICALS, Shop No 4, Sadhu Sign Colony, Khambra`}
          </h1>
        </Link>
        <Link
          href={
            "https://www.google.com/maps/place/31%C2%B016'56.4%22N+75%C2%B034'10.5%22E/@31.2828288,75.5694893,18.66z/data=!4m4!3m3!8m2!3d31.2823372!4d75.5695877?hl=en&entry=ttu"
          }
          target="_blank"
        >
          <MapPinned />
        </Link>
      </div>
    </div>
  );
};

export default ShopNearMe;
