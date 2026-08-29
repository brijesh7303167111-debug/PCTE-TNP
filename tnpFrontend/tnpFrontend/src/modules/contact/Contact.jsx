import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverURL } from "../../constant/constant";

const MemberCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-r-5 lg border-t-1 border-l-1 border-b-5 border-[#990000] animate-pulse flex flex-col justify-between min-h-[200px]">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
    <div className="h-6 bg-gray-300 rounded w-full mt-4"></div>
  </div>
);

const Contact = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/gettpomember`);
      setMembers(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchMembers when component mounts
  useEffect(() => {
    fetchMembers();
  }, []);


  useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to top-left corner
    }, []);
    
  return (
    <>
    <div className="min-h-screen">
     

      <div className="bg-gray-100 py-12 mt-15 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Key Objectives
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              
              {
                icon: "🤝",
                title: "Industry Partnerships",
                description: "Develop strong relationships with corporate recruiters"
              },
              {
                icon: "📈",
                title: "Placement Success",
                description: "Facilitate campus recruitment drives and internships"
              },
              {
                icon: "🎓",
                title: "Career Readiness",
                description: "Prepare students through training programs, workshops, and mock interviews"
              },
              {
                icon: "💼",
                title: "Professional Growth",
                description: "Enhance students' employability through skill development"
              }
            ].map((item, index) => (
               <motion.div
      key={index}
      className={`relative bg-white p-5 sm:p-6 rounded-lg shadow-md overflow-hidden 
                  ${index >= 2 ? "hidden lg:block" : ""}`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ y: -5 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
    >
                <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#9B1C1C]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>



      {/* Team Section */}
       <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#9B1C1C] mb-8 sm:mb-12">
          Our Team
        </h2>

       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {loading
              ? [...Array(6)].map((_, idx) => <MemberCardSkeleton key={idx} />)
              : members.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white text-black p-6 rounded-lg shadow-lg border-r-5 lg border-t-1 border-l-1 border-b-5 border-[#990000] hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                    whileHover={{
                      scale: 1.03,
                      borderColor: "#990000",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#990000] mb-1">{member.name}</h3>
                      <p className="text-gray-800 text-sm sm:text-base font-medium">{member.role}</p>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">Email:</span> {member.email}</p>
                      <p><span className="font-semibold">Phone:</span> {member.contact}</p>
                    </div>
                    <div className="bg-gray-50 px-6 py-2 text-xs text-gray-500 text-center">
                      Placement & Training Office
                    </div>
                  </motion.div>
                ))}
          </div>


       

      </div>
    </div>
    </>
  );
};

export default Contact;