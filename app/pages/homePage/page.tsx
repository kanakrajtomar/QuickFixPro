"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MobileNavbar from "@/app/components/MobileNavbar";
import NavigationBlock from "@/app/components/NavigationBlock";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

interface Carousel {
  _id: string;
  name: string;
  imageURL: string;
  ahref: string;
  target: string;
}

interface Category {
  _id: string;
  name: string;
  seoName: string;
  isVisible: boolean;
  description: string;
  imageURL: string;
  contains: Array<{ _id: string; seoName: string; type: string }>;
}

const HomePage = () => {
  const [headSection, setHeadSection] = useState<Carousel[]>([]);
  const [offerSection, setOfferSection] = useState<Carousel[]>([]);
  const [favourites, setFavourites] = useState<Carousel[]>([]);
  const [repairSection, setRepairSection] = useState<Carousel[]>([]);
  const [repairOffers, setRepairOffers] = useState<Carousel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  const filterBannersByTarget = (banners: Carousel[]) => {
    const target = isMobileView ? "app" : "website";
    return banners.filter((banner) => banner.target === target);
  };

  useEffect(() => {
    const updateViewType = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    const fetchAllSections = async () => {
      try {
        updateViewType();
        window.addEventListener("resize", updateViewType);

        const { data } = await axios.get(
          "https://ad-api.sampurnakart.in/api/offers/home/"
        );

        setHeadSection(data.headSection || []);
        setOfferSection(data.offerSection || []);
        setFavourites(data.favourites || []);
        setRepairSection(data.repairSection || []);
        setRepairOffers(data.repairOffers || []);
      } catch (error) {
        console.error("Error fetching sections", error);
        toast({
          title: "Error fetching the sections",
        });
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://stage-ad-api.sampurnakart.in/api/products/c/categories/root"
        );
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
        toast({
          title: "Error fetching categories",
        });
      }
    };

    fetchAllSections();
    fetchCategories();

    return () => {
      window.removeEventListener("resize", updateViewType);
    };
  }, []);

  const renderBanner = (banner: Carousel) => (
    <a
      key={banner._id}
      href={banner.ahref}
      rel="noopener noreferrer"
    >
      <div className="w-full h-64 max-md:h-60 bg-[#ffffff] flex relative overflow-hidden mb-5 banner hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-full">
          <Image
            alt={banner.name}
            src={banner.imageURL}
            className="object-cover"
            layout="fill"
            objectFit="fill"
            loading="lazy"
          />
        </div>
      </div>
    </a>
  );

  const sliderSettings = (slidesToShow: number) => ({
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: slidesToShow === 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  return (
    <div className="h-screen w-full pt-24 max-md:pt-20 relative p-10 max-sm:p-5">
      <div className="w-full my-10">
        <Slider {...sliderSettings(1)}>
          {filterBannersByTarget(headSection).map(renderBanner)}
        </Slider>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-poppins text-center mb-8 text-gray-800 mt-10">
        Explore Categories
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-8 gap-6 justify-items-center">
        {categories.map((category) => (
          <Link
            href={`sub-category/${category._id}`}
            key={category._id}
            className="group relative   cursor-pointer hover:scale-105 transition-all rounded-lg "
          >
            <div className="relative z-10 text-center">
              <Image
                src={category.imageURL}
                width={250}
                height={250}
                alt={category.name}
                className="mx-auto mb-3 rounded-sm"
                loading="lazy"
              />
           
         
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full my-16">
        <p className="font-bold text-4xl mb-5">Repair Coming Soon</p>
        <Slider {...sliderSettings(1)}>
          {filterBannersByTarget(favourites).map(renderBanner)}
        </Slider>
      </div>

      <div className="w-full my-16">
        <p className="font-bold text-4xl mb-5">Special Offers</p>
        <Slider {...sliderSettings(2)}>
          {filterBannersByTarget(offerSection).map((banner) => (
            <div className="px-4" key={banner._id}>
              {renderBanner(banner)}
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full my-16">
        <p className="font-bold text-4xl mb-5">Best At Repairing</p>
        <Slider {...sliderSettings(1)}>
          {filterBannersByTarget(repairSection).map(renderBanner)}
        </Slider>
      </div>

      <div className="w-full my-16">
        <p className="font-bold text-4xl mb-5">Repair Offers</p>
        <Slider {...sliderSettings(2)}>
          {filterBannersByTarget(repairOffers).map((banner) => (
            <div className="px-4" key={banner._id}>
              {renderBanner(banner)}
            </div>
          ))}
        </Slider>
      </div>

      <NavigationBlock />
      <MobileNavbar />
    </div>
  );
};

export default HomePage;
