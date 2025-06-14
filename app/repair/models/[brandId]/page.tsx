"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Model } from "../../types";
import MobileNavbar from "@/app/components/MobileNavbar";

const BrandId = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const pathName = usePathname();

  const fetchModels = async () => {
    try {
      const response = await axios.get(
        `https://ad-api.sampurnakart.in/api/repairs/listModels?id=${pathName.replace(
          "/repair/models/",
          ""
        )}`
      );
      setModels(response.data);
      setFilteredModels(response.data);
    } catch (err) {
      setError("Failed to fetch models");
    }
  };

  useEffect(() => {
    fetchModels();
  }, [pathName]);

  useEffect(() => {
    const results = models.filter((model) =>
      model.modelName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModels(results);
  }, [searchQuery, models]);

  return (
    <div className="pt-5 pb-11 px-5 mt-28">
      <h1 className="text-3xl text-center font-bold">Choose Model</h1>
      <div className="mt-6 mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl border-gray-400 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-10 lg:mx-28">
        {filteredModels.map((model) => {
          if (model.modelName) {
            return (
              <Link
                href={`/repair/issues/${model._id}`}
                key={model._id}
                className="group relative cursor-pointer overflow-hidden bg-white border hover:bg-gray-100 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-lg flex flex-col items-center p-4"
              >
                <Image
                  loading="lazy"
                  src={model.imageURL}
                  width={150}
                  height={150}
                  alt="model-img"
                  className="w-full h-auto object-contain"
                />
                <p className="text-sm font-semibold mt-2 text-center max-w-full">
                  {model.modelName}
                </p>
              </Link>
            );
          }
        })}
      </div>
      <MobileNavbar />
    </div>
  );
};

export default BrandId;
