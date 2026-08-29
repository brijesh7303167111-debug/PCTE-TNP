import React from "react";
import { getUserFromToken } from "../../../components/gettoken";

const Postcard = ({ post, onDelete, index }) => {
  const user = getUserFromToken();

  return (
    <div className="w-full flex items-center justify-between bg-white border border-[#9B1C1C] rounded-lg shadow-md hover:shadow-lg transition p-4">
      
      {/* Table columns */}
      <div className="flex flex-1 items-center gap-6">
        {/* Index */}
        <span className="font-bold text-[#9B1C1C] w-12 text-center">{index + 1}</span>

        {/* Company Name */}
        <span className="text-black w-48">{post.companyName}</span>

        {/* Job Role */}
        <span className="text-black w-48 font-medium">{post.role}</span>

        {/* Location */}
        <span className="text-black w-48">{post.location}</span>
      </div>

      {/* Delete button visible only for superadmin */}
      {user?.superadmin && (
        <button
          onClick={() => onDelete(post._id)}
          className="bg-[#9B1C1C] hover:bg-black text-white px-4 py-1 rounded transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Postcard;
