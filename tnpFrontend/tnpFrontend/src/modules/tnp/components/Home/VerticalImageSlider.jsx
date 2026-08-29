import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../../../../constant/constant";

// Skeleton Image Card
const ImageSkeleton = () => (
  <div className="h-52 w-[85%] bg-gray-300 rounded-lg animate-pulse mx-auto my-4"></div>
);

const VerticalImageSlider = () => {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/allpackages`);
        setImages(res.data.map((pkg) => pkg.imageUrl));
      } catch (error) {
        console.error("Failed to fetch package images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSpeed = 0.6;
    let animationFrame;

    const scroll = () => {
      if (!container) return;

      container.scrollTop += scrollSpeed;

      const scrollHeight = container.scrollHeight;
      const viewHeight = container.clientHeight;

      if (container.scrollTop >= scrollHeight / 2) {
        container.scrollTop = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [images]);

  return (
    <div
      className="h-screen w-[100%] ml-8 mx-auto overflow-y-scroll relative"
      ref={containerRef}
    >
      <div className="flex flex-col items-center">
        {loading ? (
          // Show 6 skeletons while loading
          [...Array(6)].map((_, idx) => <ImageSkeleton key={idx} />)
        ) : (
          // Show actual images
          [...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="h-52 hover:scale-110 hover:shadow-2xl w-[85%] flex justify-center items-center snap-center transition-transform duration-300 my-4"
            >
              <img
                src={img}
                alt={`Slide ${idx}`}
                className="h-40 w-[80%] object-cover rounded-lg transition-all duration-500 ease-in-out"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerticalImageSlider;
