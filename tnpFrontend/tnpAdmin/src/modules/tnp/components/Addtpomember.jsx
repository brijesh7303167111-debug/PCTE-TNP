import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

const Addtpomember = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${serverURL}/api/addtpomember`, formData);
      setMessage("TPO Member added successfully!");
      setFormData({ name: "", role: "",department: "", email: "", contact: "" });
    } catch (error) {
      console.error("Error adding member:", error);
      setMessage("Error adding member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm md:max-w-md md:m-auto   p-6 bg-white shadow-md rounded-lg mt-15 border-3 border-[#9A1C1C]">
      <h2 className="text-2xl font-bold mb-4 text-[#9A1C1C]">Add Top Member</h2>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9A1C1C]"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9A1C1C]"
        />
        <input
          type="text"
          name="department"
          placeholder="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9A1C1C]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9A1C1C]"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9A1C1C]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9A1C1C] text-white p-2 rounded hover:bg-[#7f1616] transition"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default Addtpomember;
