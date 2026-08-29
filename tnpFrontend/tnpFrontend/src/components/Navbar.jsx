import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/tnp/logo1.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsdropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsdropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[80] p-4 px-6 md:px-20 backdrop-blur-3xl bg-white/60 shadow-xl">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          {" "}
          <div className="flex items-center ">
            <img
              src={logo1}
              alt="logo"
              className="h-14 hidden md:block w-auto rounded"
            />
            <h3 className="text-4xl font-bold text-[#9B1C1C] ">PCTE</h3>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="md:flex  font-semibold  hidden gap-10 text-[#9B1C1C]  text-xl ml-auto">
          <Link to="/allposts" className=" hover:text-red-700 hover:scale-115 transform duration-300">
            Placement Drives
          </Link>

          {/* <Link to="/quiz" className=" hover:text-red-700">Prep Quiz</Link> */}
          <Link to="/guestlecture" className=" hover:scale-115 transform duration-300  text-bold hover:text-red-700">
            Guest Lecture
          </Link>
          {/* <Link to="/placement-scheduler" className="block  hover:text-red-700">Placement Scheduler</Link> */}
          <h1
            className="cursor-pointer hover:scale-115 transform duration-300 "
            onClick={() =>
              window.open("https://pcte.edu.in/about-us/", "_blank")
            }
          >
            About
          </h1>

          <Link className="hover:text-red-700 hover:scale-115 transform duration-300" to="/contact">
            Contact
          </Link>

          <h1
            className="cursor-pointer hover:scale-115 transform duration-300 text-[#9B1C1C] "
            onClick={() => window.open("https://tnp-frontend-d122.vercel.app/")}
          >
            Admin
          </h1>

          
        </div>

        {/* Hamburger Icon */}
        <div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 text-lg  mt-3">
          <h1
            className="cursor-pointer"
            onClick={() =>
              window.open("https://pcte.edu.in/about-us/", "_blank")
            }
          >
            About
          </h1>
          <Link className="hover:text-red-700" to="/contact">
            Contact
          </Link>
          <h1
            className="cursor-pointer"
            onClick={() => window.open("https://tnp-frontend-d122.vercel.app/")}
          >
            Admin
          </h1>

          {/* Dropdown for Mobile */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsdropdown(!isDropdown)}
            >
              <span className="hover:text-red-700">Other Services</span>
              <RiArrowDropDownLine size={22} />
            </div>

            {isDropdown && (
             <div className="mt-2 ml-4 text-start flex flex-col gap-2" ref={dropdownRef}>
  <Link
    to="/allposts"
    className="hover:text-red-700 hover:scale-105 transform duration-300"
  >
    Placement Drives
  </Link>

  <Link
    to="/guestlecture"
    className="hover:text-red-700 hover:scale-105 transform duration-300 "
  >
    Guest Lecture
  </Link>
</div>

            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
