import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

const Company = () => {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setStatus("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    try {
      setStatus("Uploading...");
      const res = await axios.post(`${serverURL}/api/company`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        setStatus("Package image uploaded successfully!");
        setImage(null);
      }
    } catch (err) {
      setStatus("Upload failed. Try again.");
    }
  };

  return (
    
     <div className="max-w-md mx-auto my-8 p-6 border-3 rounded-md border-[#9A1C1C] bg-white text-black">
      <h2 className="text-center text-2xl font-semibold mb-6 text-[black] select-none">
        Upload <span className="text-[#9A1C1C]">Company</span> Logo
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-[#9A1C1C] rounded-md p-2 cursor-pointer text-black"
        />
        <button
          type="submit"
          className="bg-[#9A1C1C] text-white font-semibold py-3 rounded-md hover:bg-[#7f1616] transition-colors duration-300 cursor-pointer"
        >
          Upload
        </button>










      </form>
      <p className="mt-4 text-center text-blue-300 font-semibold min-h-[1.5rem] select-none">
        {status}
      </p>
    </div>
 
  );
};

export default Company;