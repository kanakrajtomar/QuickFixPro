"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "../types";
import { usePathname } from "next/navigation";
import MobileNavbar from "@/app/components/MobileNavbar";


const Category = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);

  const pathName = usePathname();

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://ad-api.sampurnakart.in/api/repairs/listBrands?id=${pathName.replace(
          "/repair/",
          ""
        )}`
      );
      setBrands(response.data);
    } catch (err) {
      setError("Failed to fetch brands");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [pathName]);

  return (
    <div className="pt-5 pb-11 px-5 mt-28">
      <h1 className="text-center text-3xl font-bold">Choose Brand</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid mt-5 grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {brands.map((brand) => {
          if (brand.brandName) {
            return (
              <Link
                href={`/repair/models/${brand._id}`}
                key={brand._id}
                className="group relative cursor-pointer overflow-hidden bg-white border hover:bg-gray-100 p-6 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-lg"
              >
                <div className="relative z-10 mx-auto">
                  <div className="space-y-6 text-base leading-7 text-gray-600 transition-all duration-300 flex items-center justify-center">
                    <Image
                      src={brand.imageURL}
                      loading="lazy"
                      width={200}
                      height={200}
                      alt={`${brand.brandName} logo`}
                      className="max-h-[150px] object-contain"
                    />
                  </div>
                  <div className="text-base font-semibold leading-7 flex items-center justify-center mt-4">
                    <p className="text-md font-semibold text-center">{brand.brandName}</p>
                  </div>
                </div>
              </Link>
            );
          }
          return null;
        })}
      </div>
      <MobileNavbar/>
    </div>
  );
};

export default Category;
