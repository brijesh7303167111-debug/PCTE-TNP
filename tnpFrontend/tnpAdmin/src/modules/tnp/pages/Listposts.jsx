import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromToken } from "../../../components/gettoken";
import { serverURL } from "../../../constant/constant";

const Listposts = () => {
  const user = getUserFromToken();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverURL}/api/allposts`);
      setPosts(res.data);
      setFilteredPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
    setLoading(false);
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deletepost/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      setFilteredPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredPosts(
      posts.filter((p) =>
        p.companyName.toLowerCase().includes(lower)
      )
    );
  }, [search, posts]);

  return (
    <div className="min-h-screen mt-10 md:mb-10 bg-white py-10 px-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl border-2 border-[#9B1C1C] rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-[#9B1C1C] transition shadow-sm"
        />
      </div>

      {loading ? ( <div className="flex justify-center mt-40 h-screen">
    <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin"></div>
  </div>):
      (<div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#9B1C1C]">Job Posts</h2>

        {filteredPosts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#9B1C1C] text-white">
                <th className="p-2">#</th>
                <th className="p-2">Company Name</th>
                <th className="p-2">Job Role</th>
                {/* <th className="p-2">Location</th> */}
                {user?.superadmin && <th className="p-2 text-center">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post, index) => (
                <tr key={post._id} className="border-b hover:bg-gray-50">
                  <td className="md:p-4 p-2 font-medium">{index + 1}</td>
                  <td className="md:p-4 p-2">{post.companyName}</td>
                  <td className="md:p-4 p-2">{post.role}</td>
                  {/* <td className="md:p-4 p-2">{post.venue}</td> */}
                  {user?.superadmin && (
                    <td className="md:p-4 p-2 text-center">
                      <button
                        onClick={() => deletePost(post._id)}
                        className="bg-[#9B1C1C] hover:bg-black text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>)}
    </div>
  );
};

export default Listposts;
