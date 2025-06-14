import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const ProfileOptions = () => {
  const pathName = usePathname();

  const data = [
    {
      title: "My Profile",
      path: "/my-account/profile",
    },
    {
      title: "Order History",
      path: "/my-account/order-history",
    },
    {
      title: "Rewards",
      path: "/my-account/rewards",
    },
    {
      title: "Repair Order History",
      path: "/my-account/repair-order-history",
    },
    {
      title: "My Payment Options",
      path: "/my-account/my-payment-options",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-bold">Manage My Account</h2>
        <div className="pt-2 pl-4">
          {data.map((item) => (
            <Link key={item.title} href={item.path}>
              <p
                className={`cursor-pointer text-sm ${
                  item.path === pathName ? "text-orange-500" : "text-gray-700"
                } `}
              >
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold">My Orders</h2>
        <div className="pt-2 pl-4">
          <p className="cursor-pointer text-sm text-gray-700">My Returns</p>
          <p className="cursor-pointer text-sm text-gray-700">Sample Option</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
