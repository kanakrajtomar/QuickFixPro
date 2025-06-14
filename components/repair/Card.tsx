import { Wrench } from "lucide-react";
import Image from "next/image";

const Card = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
      <span className="absolute top-10 z-0 h-10 w-10 rounded-full bg-yellow-500 transition-all duration-300 group-hover:scale-[30]"></span>
      <div className="relative z-10 mx-auto max-w-md">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#27187E] transition-all duration-300 group-hover:bg-yellow-400">
          <Wrench color="white" />
        </span>
        <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
          <Image src={image} width={200} height={200} alt="category-img" />
        </div>
        <div className="pt-5 text-base font-semibold leading-7 flex items-center justify-center">
          <p className="text-xl font-semibold group-hover:text-white">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
