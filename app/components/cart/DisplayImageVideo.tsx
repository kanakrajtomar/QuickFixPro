"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface DisplayImageVideoProps {
  imageArr: string[];
  videoArr: string[];
}

const extractVideoId = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const DisplayImageVideo: React.FC<DisplayImageVideoProps> = ({
  imageArr,
  videoArr,
}) => {
  const [imageIdx, setImageIdx] = useState<number>(0);
  const [videoIdx, setVideoIdx] = useState<number | null>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    const img = imgRef.current;
    const result = resultRef.current;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches; // Adjust the breakpoint as needed

    if (lens && img && result && isDesktop) {
      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;

      const moveLens = (e: MouseEvent) => {
        lens.style.visibility = "visible";
        result.style.visibility = "visible";
        const pos = getCursorPos(e);
        let x = pos.x - lens.offsetWidth / 2;
        let y = pos.y - lens.offsetHeight / 2;

        if (x > img.offsetWidth - lens.offsetWidth) {
          x = img.offsetWidth - lens.offsetWidth;
        }
        if (x < 0) {
          x = 0;
        }
        if (y > img.offsetHeight - lens.offsetHeight) {
          y = img.offsetHeight - lens.offsetHeight;
        }
        if (y < 0) {
          y = 0;
        }

        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;
        result.style.backgroundImage = `url(${img.src})`;
        result.style.backgroundSize = `${img.offsetWidth * cx}px ${
          img.offsetHeight * cy
        }px`;
        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
      };

      const getCursorPos = (e: MouseEvent) => {
        const a = img.getBoundingClientRect();
        return {
          x: e.pageX - a.left - window.pageXOffset,
          y: e.pageY - a.top - window.pageYOffset,
        };
      };

      img.addEventListener("mousemove", moveLens);
      img.addEventListener("mouseleave", () => {
        lens.style.visibility = "hidden";
        result.style.visibility = "hidden";
      });

      return () => {
        img.removeEventListener("mousemove", moveLens);
      };
    } else if (!isDesktop) {
      // Hide lens and result if not on desktop
      if (lens && result) {
        lens.style.visibility = "hidden";
        result.style.visibility = "hidden";
      }
    }
  }, [imageIdx]);

  const handleImageClick = (index: number) => {
    setImageIdx(index);
    setVideoIdx(null); // Hide video when an image is clicked
  };

  const handleVideoClick = (index: number) => {
    setVideoIdx(index);
    setImageIdx(-1); // Hide image when a video is clicked
  };

  return (
    <div className="flex flex-col-reverse gap-5 pt-10 lg:flex-row">
      <div className="flex gap-5 lg:flex-col justify-center">
        {imageArr &&
          imageArr.map((image, index) => (
            <Image
              key={index}
              onClick={() => handleImageClick(index)}
              className="rounded-lg p-4 shadow-lg border border-[#F28627] cursor-pointer mb-5 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
              width={100}
              height={100}
              objectFit="contain"
              alt="No Image Found"
              src={image}
            />
          ))}
        {videoArr &&
          videoArr.map((video, index) => {
            const videoId = extractVideoId(video);
            return (
              <div
                key={index}
                onClick={() => handleVideoClick(index)}
                className="rounded-lg shadow-md cursor-pointer mb-5 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
              >
                {videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={`Thumbnail ${index}`}
                    width="100"
                    height="100"
                    className="rounded-lg"
                  />
                ) : (
                  <p>Invalid video URL</p>
                )}
              </div>
            );
          })}
      </div>
      <div className="relative items-center hidden lg:block">
        {videoIdx !== null && videoArr[videoIdx] ? (
          <iframe
            className="shadow-md rounded-lg"
            width={500}
            height={700}
            src={videoArr[videoIdx]}
            title={`YouTube video ${videoIdx}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : imageArr && imageArr.length > 0 && imageIdx >= 0 ? (
          <div className="relative">
            <Image
              ref={imgRef}
              className="shadow-md rounded-lg"
              src={imageArr[imageIdx]}
              alt="No Image Found"
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
            />
            <div
              id="zoom-lens"
              ref={lensRef}
              className="absolute border border-gray-300 rounded"
              style={{
                width: "150px",
                height: "150px",
                visibility: "hidden",
                backgroundColor: "rgba(0,0,0,0.5)",
                pointerEvents: "none", // Prevent the lens from capturing pointer events
              }}
            ></div>
            <div
              id="zoom-result"
              ref={resultRef}
              className="absolute border -mx-52 border-gray-300"
              style={{
                width: "500px",
                height: "700px",
                visibility: "hidden",
                top: "0",
                right: "calc(-320px - 20px)",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#FFF",
                zIndex: 1000,
                backgroundSize: "contain",
                pointerEvents: "none", // Prevent the result from capturing pointer events
              }}
            ></div>
          </div>
        ) : (
          <p>No Content Found</p>
        )}
      </div>
    </div>
  );
};

export default DisplayImageVideo;
