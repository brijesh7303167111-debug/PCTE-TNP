import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../../constant/constant";
const HorizontalImageSlider = () => {
  const containerRef = useRef(null);


   const [images, setImages] = useState([]);
  
      useEffect(() => {
      // Fetch images from backend
      const fetchImages = async () => {
        try {
          const res = await axios.get(`${serverURL}/api/allpackages`); // adjust URL as needed
          
          setImages(res.data.map(pkg => pkg.imageUrl));
        } catch (error) {
          console.error("Failed to fetch package images", error);
        }
      };
  
      fetchImages();
    }, []);
  




  useEffect(() => {
    const container = containerRef.current;
    const scrollSpeed = 0.6; // pixels per frame
    let animationFrame;

    const scroll = () => {
      if (!container) return;

      container.scrollLeft += scrollSpeed;

      const scrollWidth = container.scrollWidth;
      const viewWidth = container.clientWidth;

      // Reset to start when half scrolled (since we duplicated images)
      if (container.scrollLeft >= scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className="w-[390px] h-[220px] overflow-x-hidden mt-5   mx-auto relative"
      ref={containerRef}
    >
      <div className="flex flex-row w-max  ">
           {[...images, ...images].map((img, idx) => (
          <div
            key={idx}
            className="min-w-[250px]   h-full flex justify-center items-center mx-4 transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-[250px] object-cover hover:scale-120 rounded-lg transition-all duration-500 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalImageSlider;
