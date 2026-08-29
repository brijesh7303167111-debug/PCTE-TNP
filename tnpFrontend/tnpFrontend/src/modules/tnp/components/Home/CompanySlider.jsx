import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../../constant/constant";

const CompanyImageSkeleton = () => (
  <div className="max-w-[12rem] h-[10rem] bg-gray-300 rounded-md animate-pulse" />
);

const CompanySlider = () => {
  const sliderRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    "/fallback1.png",
    "/fallback2.png",
    "/fallback3.png",
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/company`);
        setImages(res.data.map((pkg) => pkg.imageUrl));
      } catch (error) {
        console.error("Failed to fetch package images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current?.scrollBy({ left: 200, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[90%] md:w-full mx-auto my-6 md:my-8 px-4 overflow-hidden">
      
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
        onClick={scrollLeft}
      >
        &#8249;
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth space-x-5 px-6 scrollbar-none"
      >
        {loading
          ? [...Array(6)].map((_, idx) => (
              <CompanyImageSkeleton key={idx} />
            ))
          : [...images, ...images].map((img, idx) => (
              <div
                key={idx}
                className="max-w-[12rem] flex-shrink-0 transition-transform duration-300 hover:scale-115"
              >
                <img
                  src={img}
                  alt={`Company Logo ${idx}`}
                  className="w-full h-[10rem] object-contain rounded-md"
                />
              </div>
            ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
        onClick={scrollRight}
      >
        &#8250;
      </button>
    </div>
  );
};

export default CompanySlider;
