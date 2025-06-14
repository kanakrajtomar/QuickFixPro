"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MyAccountPage = () => {
  const router = useRouter();

  router.push("/my-account/profile");

  return <div>MyAccountPage</div>;
};

export default MyAccountPage;
