"use client";
import {
  ArrowRightSquare,
  HomeIcon,
  LocateIcon,
  PinIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";

const RepairMode = () => {
  return (
    <div className="flex flex-col gap-10 text-white pt-20 px-3 pb-11 items-center justify-center mt-28">
      {/* div 1 */}
      <Link href={"/repair/workOrderRequest"}>
        <div className="flex cursor-pointer w-full md:w-[500px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
          <div className="flex gap-4 text-2xl items-center">
            <SendIcon />
            <h1 className="font-semibold">Pick and Drop</h1>
          </div>
          <p>
            <ArrowRightSquare />
          </p>
        </div>
      </Link>
      {/* Div 2 */}
      <Link href={"/repair/workOrderRequest"}>
        <div className="flex cursor-pointer w-full md:w-[500px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
          <div className="flex gap-4 text-2xl items-center">
            <HomeIcon />
            <h1 className="font-semibold">Door Step Service</h1>
          </div>
          <p>
            <ArrowRightSquare />
          </p>
        </div>
      </Link>
      {/* div 3 */}
      <Link href={"/repair/shops-near-me"}>
        <div className="flex cursor-pointer w-full md:w-[500px] bg-[#27187E] p-6 items-center justify-between rounded-md gap-4 hover:shadow-md">
          <div className="flex gap-4 text-2xl items-center">
            <LocateIcon />
            <h1 className="font-semibold">Repair at Shop</h1>
          </div>
          <p>
            <ArrowRightSquare />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RepairMode;
