import React, { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../../../../constant/constant';

const Addpost = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    dateOfDrive: '',
    time: '',
    venue: '',
    description: '',
    jdLink: '',
    applyLink: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/api/addpost`, formData); // Replace with your backend route
      alert('Post created successfully!');
      setFormData({
        companyName: '',
        dateOfDrive: '',
        time: '',
        venue: '',
        description: '',
        jdLink: '',
        applyLink: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>

      <label>Company Name:</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full border mb-3 p-2" />

      <label>Date of Drive:</label>
      <input type="date" name="dateOfDrive" value={formData.dateOfDrive} onChange={handleChange} required className="w-full border mb-3 p-2" />

      <label>Time:</label>
      <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border mb-3 p-2" />

      <label>Venue:</label>
      <input type="text" name="venue" value={formData.venue} onChange={handleChange} required className="w-full border mb-3 p-2" />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border mb-3 p-2" />

      <label>Job Description Link (JD):</label>
      {/* <input type="url" name="jdLink" value={formData.jdLink} onChange={handleChange}  className="w-full border mb-3 p-2" /> */}

      <label>Apply Link:</label>
      {/* <input type="url" name="applyLink" value={formData.applyLink} onChange={handleChange}  className="w-full border mb-3 p-2" /> */}

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default Addpost;