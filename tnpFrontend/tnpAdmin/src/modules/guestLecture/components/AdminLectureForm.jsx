import { useState } from "react";
import axios from "axios";
// import { serverURL } from "../../../../../tnpFrontend/src/constant/constant";
import { serverURL } from "../../../constant/constant";

export default function AdminLectureForm() {
  const [form, setForm] = useState({
    teacher: "",
    venue: "",
    class: "",
    time: "",
    topic: "",
    date: "",
  });
  const [images, setImages] = useState(null);
  const [banner, setBanner] = useState(null);
const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e, setter) => setter(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //     if (!file) {
    //   setMessage("Please select a file first!");
    //   return;
    // }
    setLoading(true);
    setMessage("");

   try{
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (images) formData.append("images", images);
    if (banner) formData.append("banner", banner);

    await axios.post(`${serverURL}/api/guestLecture`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // alert("Lecture added!");
    setForm({
      teacher: "",
      venue: "",
      class: "",
      time: "",
      topic: "",
      date: "",
    });
    setImages(null);
    setBanner(null);
setMessage("✅ Post uploaded successfully!");
      setFile(null);


  }catch (error) {
      console.error(error);
      setMessage("❌ Failed to upload post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-[#9B1C1C] mt-8"
    >
      <h2 className="text-3xl font-bold text-[#9B1C1C] mb-6 text-center">
        Add Guest Lecture
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["teacher", "venue", "class", "time", "topic", "date"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-semibold text-[#9B1C1C] mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "date" ? "date" : "text"}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9B1C1C] transition"
            />
          </div>
        ))}

        {/* File Upload - Images */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#9B1C1C] mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setImages)}
            className="w-full border rounded-lg p-2 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9B1C1C] file:text-white hover:file:bg-black cursor-pointer"
          />
        </div>

        {/* File Upload - Banner */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#9B1C1C] mb-1">
            Upload Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setBanner)}
            className="w-full border rounded-lg p-2 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9B1C1C] file:text-white hover:file:bg-black cursor-pointer"
          />
        </div>
      </div>
      




      {/* <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-[#9B1C1C] text-white py-3 rounded-lg text-lg font-semibold hover:bg-black transition"
      >
        Submit Lecture
      </button> */}

      <button
  type="submit"
  disabled={loading}
  className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition 
    ${loading 
      ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
      : "bg-[#9B1C1C] text-white hover:bg-black"
    }`}
>
  {loading ? "Submitting..." : "Submit Lecture"}
</button>


      {/* Status Message */}
      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
