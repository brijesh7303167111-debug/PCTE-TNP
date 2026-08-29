// src/components/Addadmin.jsx
import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

const Addadmin = () => {

  console.log("aadadmin khula h");
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    email: "",
    password: "",
    isSuperAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${serverURL}/api/addadmin`, formData);
      setMessage("Admin added successfully!");
      setFormData({
        name: "",
        field: "",
        email: "",
        password: "",
        isSuperAdmin: false,
      });
    } catch (error) {
      console.error("Error adding admin:", error);
      setMessage(error.response?.data?.message || "Error adding admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" border-3 border-[#9B1C1C] max-w-lg  m-5 md:m-auto mt-10 md:mt-18 p-6  bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="field"
          placeholder="Field"
          value={formData.field}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isSuperAdmin"
            checked={formData.isSuperAdmin}
            onChange={handleChange}
          />
          <span>Is Super Admin?</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9A1C1C] text-white p-2 rounded hover:bg-[#7f1616] transition"
        >
          {loading ? "Adding..." : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default Addadmin;
