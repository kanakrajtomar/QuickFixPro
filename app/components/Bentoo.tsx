"use client";

import { useEffect, useState } from "react";
import { fetchHeroCarouselElements } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";


interface Carousel {
  id: string;
  offerName: string;
  imageURL: string;
}

export default function Bentoo() {
  const [carouselElements, setCarouselElements] = useState<Carousel[]>([]);

  useEffect(() => {
    async function getCarouselElements() {
      const elements = await fetchHeroCarouselElements();
      setCarouselElements(elements);
    }

    getCarouselElements();
  }, []);

  return (
    <div className="lg:mx-5">
      {/* Small Images Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded overflow-hidden">
          <Image
            height={350}
            width={720}
            src="https://res.cloudinary.com/dzwyf9kn9/image/upload/v1718434373/1_j7fdla.png"
            className="w-full h-full object-cover rounded-lg"
            alt="Small Image 1"
          />
        </div>
        <div className="rounded overflow-hidden">
          <Image
            height={350}
            width={720}
            src="https://res.cloudinary.com/dzwyf9kn9/image/upload/v1718435498/2_o5iqf2.png"
            className="w-full h-full object-cover rounded-lg"
            alt="Small Image 2"
          />
        </div>
        <div className="rounded overflow-hidden">
          <Link href="/repair">
          <Image
            height={350}
            width={720}
            
            src="https://res.cloudinary.com/dzwyf9kn9/image/upload/v1718547810/watches_gmtpvc.png"
            className="w-full h-full object-cover rounded-lg"
            alt="Small Image 3"
          />
          </Link>
        </div>
        <div className="rounded overflow-hidden">
          <Image
            height={350}
            width={720}
            src="https://res.cloudinary.com/dzwyf9kn9/image/upload/v1718435498/2_o5iqf2.png"
            className="w-full h-full object-cover rounded-lg"
            alt="Small Image 4"
          />
        </div>
      </div>
    </div>
  );
}
