"use client";

import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authentication/authentication";
import ProfileOptions from "../components/ProfileOptions";
import MobileNavbar from "../components/MobileNavbar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="mt-32 lg:mx-10">
      <div className="flex  justify-center flex-col  gap-6 m-10 h-full min-w-[90vw] md:w-3 sm:w-[100px] md:m-0">
        <h1 className="text-5xl text-gray-600">
          Home /<span className="text-black">My Account</span>
        </h1>
        <div className="flex flex-col gap-10 sm:flex-row">
          <div>
            <ProfileOptions />
          </div>
          {children}
        </div>
      </div>
      <Button className="bg-[#27187E] lg:mx-0 mx-14" onClick={handleLogout}>Logout</Button>
      <MobileNavbar/>
    </main>
  );
}
