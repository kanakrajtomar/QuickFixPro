import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SpecificSubCategory = async ({ params }: { params: { id: string } }) => {
  const sub_category = await axios
    .get(
      `https://ad-api.sampurnakart.in/api/products/categories/sub?id=${params.id}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error in fetching sub categories: ", error);
      notFound();
    });

  if (!sub_category || sub_category.length === 0) {
    notFound();
  }

  return (
    <section className="mt-28 px-4">
      
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[1.5rem] md:text-[1.8rem] lg:text-[2.0rem] font-semibold">
          Brands
        </h2>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="flex flex-wrap">
          {sub_category.map((category: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/6 p-3"
            >
              <Link href={`/sub-category/${category._id}`}>
                <Card className="h-[164px] lg:max-w-[226px] lg:max-h-[231px] rounded-md flex-shrink-0 flex items-center justify-center mx-auto">
                  <CardHeader className="flex flex-col items-center">
                    <CardContent className="p-2">
                    <Image
                        alt={category.name}
                        className="aspect-4/3 rounded-lg object-cover"
                        src={category.imageURL}
                        height={150}
                        width={150}
                      />
                    </CardContent>
                  </CardHeader>
                </Card>
                <h3 className="text-center font-bold mt-2 text-sm lg:text-base">
                  {category.name}
                </h3>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[1.5rem] md:text-[1.8rem] lg:text-[2.0rem] font-semibold">
          Top Selling Models
        </h2>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="flex flex-wrap">
          {sub_category.map((category: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/6 p-3"
            >
              <Link href={`/sub-category/${category._id}`}>
                <Card className="h-[164px] lg:max-w-[226px] lg:max-h-[231px] rounded-md flex-shrink-0 flex items-center justify-center mx-auto">
                  <CardHeader className="flex flex-col items-center">
                    <CardContent className="p-2">
                    <Image
                        alt={category.name}
                        className="aspect-4/3 rounded-lg object-cover"
                        src={category.imageURL}
                        height={150}
                        width={150}
                      />
                    </CardContent>
                  </CardHeader>
                </Card>
                <h3 className="text-center font-bold mt-2 text-sm lg:text-base">
                  {category.name}
                </h3>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
    
  );
};

export default SpecificSubCategory;
