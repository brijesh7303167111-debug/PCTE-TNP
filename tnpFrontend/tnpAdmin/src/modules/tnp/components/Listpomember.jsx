import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

const Listpomember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverURL}/api/gettpomember`);
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setLoading(false);
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deletetpomember/${id}`);
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
       {loading ? ( <div className="flex justify-center mt-40 h-screen">
    <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin"></div>
  </div>):(
    
  
    <div className="max-w-4xl mx-auto mt-15 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#9A1C1C]">TPO Members</h2>

      {members.length === 0 ? (
        <p className="text-gray-600">No members found.</p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="w-full text-left  border-collapse">
            <thead>
              <tr className="bg-[#9A1C1C] text-white">
                <th className="p-2">Index</th>
                 <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Email</th>
                <th className="p-2">Contact</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member,index) => (
                <tr key={member._id} className="border-b  hover:bg-gray-50">
                  <td className="md:p-4 p-2 font-medium">{index + 1}</td> 
                  <td className="md:p-4 p-2">{member.name}</td>
                  <td className="md:p-4 p-2">{member.role}</td>
                  <td className="md:p-4 p-2">{member.email}</td>
                  <td className="md:p-4 p-2">{member.contact}</td>
                  <td className="md:p-4 p-2 text-center">
                    <button
                      onClick={() => deleteMember(member._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
 )}
  </>
  );
};

export default Listpomember;
