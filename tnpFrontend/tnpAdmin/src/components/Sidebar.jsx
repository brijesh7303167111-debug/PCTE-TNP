import { Link, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaBox,
  FaUsers,
  FaClipboard,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaChalkboardTeacher,
  FaList,
} from "react-icons/fa";
import { useState } from "react";
import { getUserFromToken } from "./gettoken";


export default function Sidebar({ isOpen, onClose }) {
  const user = getUserFromToken();
  const navigate = useNavigate();

  const [isGuestLectureOpen, setIsGuestLectureOpen] = useState(false); 
  const [isTpoOpen, setIsTpoOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isSuperAdmin");
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-62 bg-[#9B1C1C] text-white transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 md:translate-x-0`}
      style={{ zIndex: 40 }}
    >
      <h2 className="text-2xl font-bold mb-8 border-b border-white pb-4 px-4 mt-4">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 px-4">
        {/* Other TPO Options */}
            {user?.superadmin && (
              <Link
                to="/addadmin"
                onClick={onClose}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
              >
                <FaUserTie /> Add Admin
              </Link>
            )}
            
        {/* TPO Dropdown */}
        <button
          onClick={() => setIsTpoOpen(!isTpoOpen)}
          className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C] transition"
        >
          <span className="flex items-center gap-2">
            <FaUsers /> TPO
          </span>
          {isTpoOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {isTpoOpen && (
          <div className="ml-6 flex flex-col gap-2">

            
                <Link
                  to="/addpost"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
                >
                  ➕ Add Post
                </Link>
                <Link
                  to="/listposts"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
                >
                  📑 List Posts
                </Link>
              

            
            <Link
              to="/addpackage"
              onClick={onClose}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
            >
              <FaBox /> Add Package & Company
            </Link>
            {user?.superadmin && (
              <Link
                to="/tpohome"
                onClick={onClose}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
              >
                <FaUsers /> TPO Members
              </Link>
            )}
          </div>
        )}


 

       <button
        onClick={() => setIsGuestLectureOpen(!isGuestLectureOpen)}
        className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C] transition w-full"
      >
        <span className="flex items-center gap-2">
          <FaUserTie /> Guest Lecture
        </span>
        {isGuestLectureOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isGuestLectureOpen && (
        <div className="ml-6 flex flex-col gap-2">
          <Link
            to="/guestaddlecture"
            onClick={onClose}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
          >
            <FaChalkboardTeacher /> Add Lecture
          </Link>

          <Link
            to="/guestlistlecture"
            onClick={onClose}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-[#9B1C1C]"
          >
            <FaList /> List Lectures
          </Link>
        </div>
      )}

        {/* Logout Button */}
        <div className="p-1 bg-#9B1C1C border-2 border-white  rounded-lg mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 w-full rounded-lg bg-white text-[#9B1C1C] font-semibold hover:bg-#9B1C1C  hover:border-white transition"
        >
          <FaSignOutAlt /> Logout
        </button>
        </div>
      </nav>


    </div>
  );
}
