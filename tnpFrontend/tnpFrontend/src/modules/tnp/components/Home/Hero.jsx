import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; // Assuming you have a CSS file for styles
import HorizontalImageSlider from './HorizontalImageSlider';
import StatsSection from './StatsSection';
const Hero = () => {
  return (
    <>mb
    <div className="min-h-screen pt-23 md:pt-35  flex   md:items-start justify-center   bg-white">
      <div className="max-w-4xl  animate-fade-in-up">

        {/* Highlight Tag */}
        <div className="inline-block ml-5 md:ml-0 text-center md:text-start px-4 py-2 border border-red-800 text-sm font-semibold text-red-800 rounded-lg animate-slide-in">
          🎉 Join 48,000+ Success Stories from Our Campus
        </div>

        {/* Heading */}
        <h1 className="text-3xl ml-2 md:ml-0 text-center md:text-center  mt-9 md:mt-8 md:text-5xl font-bold text-gray-900 leading-tight md:leading-[56px] font-poppins  animate-slide-in delay-100">
          T&P Cell – From <span className="text-[#9B1C1C]">C</span>ampus to <span className="text-[#9B1C1C]">C</span>orporate
        </h1>





        {/* Description */}
        <p className="text-base ml-5 md:hidden bloack pl-5 mt-8 text-left md:mb-12 md:text-lg text-gray-700 leading-relaxed mb-8 animate-slide-in delay-200">
          <span className='text-[#9B1C1C] font-bold'>TPO at PCTE</span> links students with industry via placements, internships, and training, building skills for top company recruitment.

</p>
          <p className="text-base  md:block hidden pl-5 mt-8 md:text-left md:mb-12 md:text-lg text-gray-700 leading-relaxed mb-8 animate-slide-in delay-200">
          The <span className='text-[#9B1C1C] font-bold'>TPO department at PCTE </span>connects students with industry through placement drives, internships, and training programs, focusing on skill development and ensuring strong placement support in top companies.
         </p>

       
          <StatsSection />
          

        {/* Button */}
        <section className="flex justify-center md:mt-15 mt-12 animate-slide-in delay-300">
        <div className='p-[0.01px]  inline-flex justify-center bg-[#9B1C1C]  rounded-2xl   '>
   <Link to="/allposts" >
   <div className="flex justify-center w-full ">
     <a
      
      className="bg-[#9B1C1C] m-[3px] text-white font-bold text-sm md:text-base px-6 py-3 rounded-2xl transition duration-300 shadow-lg 
                 hover:bg-white hover:text-[#9B1C1C] border-2 border-white"
    >
      <span>View Placement Drives</span>
    </a>
  </div>
  </Link>
</div>
</section>


        <div className="block mt-20 mb-10 md:hidden ">
          <h1 className='text-3xl text-center mt-8 md:mt-8 md:text-5xl font-bold text-[#9B1C1C] leading-tight md:leading-[56px] font-poppins' >Our Best Placements</h1>
            <HorizontalImageSlider />
          </div>
        
      </div>
    
    </div>
      
          </>
  );
};

export default Hero;
