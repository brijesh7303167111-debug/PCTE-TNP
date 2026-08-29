import React, { useEffect } from 'react';
import Hero from '../components/Home/Hero';
import VerticalImageSlider from '../components/Home/VerticalImageSlider';
import HorizontalImageSlider from '../components/Home/HorizontalImageSlider';
import StatsSection from '../components/Home/StatsSection';
import CompanySlider from '../components/Home/CompanySlider';
import PostSlider from '../components/Posts/PostSlider';
import Addpost from '../components/Posts/Addpost';

const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative scroll-smooth">

      {/* Vertical Slider on Desktop */}
      <div className="hidden md:block fixed top-0 right-0 h-screen w-[30%] z-[-1]">
        <VerticalImageSlider />
      </div>



      {/* Main Content */}
      <section className='md:w-[70%] w-full mt-0   ' >

        <Hero />
</section>

       
  <section className='md:w-[75%] w-[100%]  ' >
        <h2 className="text-center animate-slide-in md:mt-15 delay-300 transform scroll-smooth  md:text-5xl text-4xl font-bold mt-15 mb-2 text-black ">Latest <span className='text-[#9B1C1C]' >Job</span> Posts</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto  mb-4">
  Fresh openings from top recruiters — don’t miss your chance.
</p>

        <div className=' w-[100%] '>
          <PostSlider />
          
        </div>
      
      
        
      </section>

    
       <section className='md:w-[70%] w-[100%]  ' >

          <div className='md:mt-30 mt-22 md:mb-22 mb-15' >
          <h2 className="text-center  text-4xl  font-bold  text-[#9B1C1C]">Top Recruiters</h2>
          <CompanySlider />
          {/* <Addpost/> */}
        </div>
        </section>




    </div>
  );
};

export default HomePage;
