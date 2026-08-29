import React from 'react';
import logo2 from '../assets/tnp/logo2.jpg';
import { Link } from 'react-router-dom';
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsFillInfoSquareFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black  right-0 absolute w-[100%] text-white px-0 md:px-10 py-8 flex  md:flex-row gap-0 md:gap-90 ">
      
      {/* Left Section */}
      <div className="w-[100%] ml-5 md:w-[40%] flex flex-col items-start gap-5">

        <img
          className="h-8  left-0 object-contain"
          src={logo2}
          alt="logo"
        />

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex gap-3 items-center">
            <MdOutlineLocalPhone className="mt-1" />
            <h6 className="text-xs">0161-7879981</h6>
          </div>

          <div className="flex gap-3 items-center">
            <CiLocationOn />
            <h6 className="text-xs">Campus-1 Baddowal Ferozepur Road Ludhiana-142021 Punjab, India</h6>
          </div>

          <div className="flex gap-3 items-center">
            <CiLocationOn />
            <h6 className="text-xs">Campus-2 Baddowal Cantt Ferozepur Road Ludhiana-142021 Punjab, India</h6>
          </div>

          <div className="flex gap-3 items-center">
            <BsFillInfoSquareFill className="text-xs mt-1" />
            <h6 className="text-xs">Info@pcte.edu.in</h6>
          </div>
        </div>
      </div>

      {/* Right Section */}
      
      <div className="md:w-[60%]  hidden md:flex flex-col  md:flex-row gap-5   ">
        
        {/* For Students */}
        <div className="flex-1 max-w-[300px] border border-gray-600 rounded-2xl p-4">
          <h2 className="font-medium text-red-300 text-lg md:text-xl mb-3">For Students:</h2>
          <div className="flex flex-col gap-2 text-sm text-stone-300">
            <Link to="/allposts" className="hover:underline">Placement drives</Link>
            {/* <Link to="/prep-quiz" className="hover:underline">Prep Quiz</Link> */}
            <Link to="/guestlecture" className="hover:underline">Guest Lecture</Link>
            {/* <Link to="/placement-scheduler" className="hover:underline">Placement Scheduler</Link> */}
            <Link to="https://api.whatsapp.com/send?phone=919872090335" className="hover:underline">Reach a Counsellor</Link>
            
          </div>
        </div>

        {/* For Companies */}
        <div className="flex-1 max-w-[300px] border border-gray-600 rounded-2xl p-4">
          <h2 className="font-medium text-red-300 text-lg md:text-xl mb-3">For Companies</h2>
          <div className="flex flex-col gap-2 text-sm text-stone-300">
              <h1
  className="cursor-pointer"
  onClick={() => window.open('https://pcte.edu.in/about-us/', '_blank')}
>
  About
</h1>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="https://pcte.edu.in/international-collaborations/" className="hover:underline">International Collaborations</Link>
            <Link to="https://pcte.edu.in/e-cell/" className="hover:underline">E-Cell</Link>
            <Link to="https://pcte.edu.in/campus-life/" className="hover:underline">Campus Life</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;