import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../constant/constant";

export default function AdminLectureTable() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/guestLecture`);
        setLectures(res.data);
      } catch (err) {
        console.error("Error fetching lectures:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  // Toggle done
  const toggleDone = async (id) => {
    try {
      await axios.patch(`${serverURL}/api/guestLecture/${id}/toggle`);
      setLectures((prev) =>
        prev.map((lec) =>
          lec._id === id ? { ...lec, done: !lec.done } : lec
        )
      );
    } catch (err) {
      console.error("Error toggling lecture:", err);
    }
  };

  // Delete lecture
  const deleteLecture = async (id) => {
    try {
      await axios.delete(`${serverURL}/api/guestLecture/${id}`);
      setLectures((prev) => prev.filter((lec) => lec._id !== id));
    } catch (err) {
      console.error("Error deleting lecture:", err);
    }
  };

  if (loading) {
    return   <div className="flex justify-center mt-40 h-screen">
    <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin"></div>
  </div>
  }

  // Filter lectures by teacher/company name
  const filteredLectures = lectures.filter((lec) =>
    lec.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8">


      {/* 🔍 Search Bar */}
      

      <div className="flex mt-20 justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by topic name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl border-2 border-[#9B1C1C] rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-[#9B1C1C] transition shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-[#9B1C1C] text-sm md:text-base">
          <thead className="bg-[#9B1C1C] text-white">
            <tr>
              <th className="p-2">Topic</th>
              <th className="p-2">Teacher / Company</th>
              <th className="p-2">Date</th>
              <th className="p-2">Done</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLectures.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No matching guest lectures found.
                </td>
              </tr>
            ) : (
              filteredLectures.map((lec) => (
                <tr
                  key={lec._id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-2 text-center">{lec.topic}</td>
                  <td className="p-2 text-center">{lec.teacher}</td>
                  <td className="p-2 text-center">
                    {new Date(lec.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => toggleDone(lec._id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition ${
                        lec.done
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {lec.done ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => deleteLecture(lec._id)}
                      className="bg-black text-white px-3 py-1 rounded-lg hover:bg-[#9B1C1C] transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
