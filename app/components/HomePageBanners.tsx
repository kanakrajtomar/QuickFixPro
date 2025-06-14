import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
interface CarouselItem {
  id: string;
  imageURL: string;
}

const CustomCarousel: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    }

    fetchData();
  }, [apiUrl]);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToSlide = useCallback(
    (index: number) => {
      setPrevIndex(currentIndex);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="lg:mt-28 mt-20 relative w-full h-72 max-sm:h-52 max-md:h-60 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-gray-400">
      {items.length > 0 ? (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full hover:bg-gray-600 transition"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full hover:bg-gray-600 transition"
          >
            &#10095;
          </button>
          <div className="w-full h-full flex items-center justify-center relative">
            <div
              className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                prevIndex !== null ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                // src={items[currentIndex].imageURL}
                // alt={`Slide ${currentIndex + 1}`}
                // className="w-full h-full object-cover"
                src={items[currentIndex].imageURL}
                alt={`Slide ${currentIndex + 1}`}
                // className="object-cover"
                className="w-full h-full object-cover"
                layout="fill"
                objectFit="fill"
                loading="lazy"
              />
            </div>
            {prevIndex !== null && (
              <div
                className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                  prevIndex !== currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={items[prevIndex].imageURL}
                  alt={`Previous Slide`}
                  className="w-full h-full object-cover"
                  layout="fill"
                  objectFit="fill"
                  loading="lazy"
                />
              </div>
            )}
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  const apiUrl = "https://ad-api.sampurnakart.in/api/offers/home/"; // Replace with your API URL

  return (
    <div className="p-4">
      <CustomCarousel apiUrl={apiUrl} />
    </div>
  );
};

export default HomePage;
