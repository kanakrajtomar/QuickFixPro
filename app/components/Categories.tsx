"use client";

import { fetchCategories } from "@/store/slices/category/categories";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Carousel className="w-full p-4">
      <div className="flex justify-between items-end lg:mb-[5px] mb-8">
        {/* Additional header content can go here */}
      </div>

      <CarouselContent>
        {categories?.map((category, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/6"
          >
            <div className="p-1">
                <Image
                  alt={category.name}
                  className="aspect-4/3 rounded-lg object-cover"
                  src={category.imageURL}
                  height={250}
                  width={192}
                />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

  
    </Carousel>
  );
}
